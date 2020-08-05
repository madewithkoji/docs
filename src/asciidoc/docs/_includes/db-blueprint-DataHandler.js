import { v4 as uuidv4 } from 'uuid'
import Dispatch from '@withkoji/dispatch'

class DataHandler {
    constructor(instantRemixing) {
        this.totalVotes = 0;
        this.votesToSend = 0;
        this.instantRemixing = instantRemixing; //Reference to an already existing instantRemixing
        this.backendPath = this.instantRemixing.get(['serviceMap', 'backend']);

        //Custom user id helps prevent syncing problems
        this.userId = uuidv4();
        localStorage.setItem('userId', this.userId);

        this.submissionTimeout = null;
        this.isVerifyingResults = false;
        this.isSubmitting = false;

        //Fetch votes from the backend periodically just in case of any desyncs
        setInterval(() => this.fetchVotes(), 5000);
    }

    //Call this from the parent component on mount
    initialize() {
        this.initializeDispatch();
        this.fetchVotes();
        this.scheduleSubmission();
    }

    setVotesCallback(setVotes) {
        this.setVotes = setVotes; //Callback to set the vote amount on the component
    }

    //Use dispatch to monitor tap events for all connected users
// tag::dispatchEvents[]
    initializeDispatch() {
        this.dispatch = new Dispatch({
            projectId: this.instantRemixing.get(['metadata', 'projectId']),
        });
        this.dispatch.connect();
        this.dispatch.on('new_tap', () => { this.addTapFromDispatch() });
    }

    addTapFromDispatch() {
        this.totalVotes++;
        this.setVotes(this.totalVotes)
    }
// end::dispatchEvents[]

    //Queue up frontend votesToSend locally in the background
// tag::addVotes[]
    addVote() {
        this.votesToSend++;
        this.dispatch.emitEvent('new_tap');
    }
// end::addVotes[]

// tag::submitVotes[]
    //Using this to schedule submission to make sure we only have one check in the queue at any time
    scheduleSubmission(timeout = 1000) {
        if (this.isSubmitting) return;

        this.isSubmitting = true;

        clearTimeout(this.submissionTimeout);
        this.submissionTimeout = setTimeout(() => {
            this.submitVotes();
        }, timeout);
    }

// end::submitVotes[]
    // Submit votes from frontend to backend
// tag::submitVotes[]
    submitVotes = () => {
      const body = JSON.stringify({
          userId: this.userId,
          votes: this.votesToSend
      });

      //Reset vote pool so we start piling up a new batch of votes
      this.votesToSend = 0;
      if (this.backendPath)
      fetch(`${this.backendPath}/votes/add`, {
          method: "put",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: body,
      })
          .then((response) => response.json())
          .then((responseJson) => {
              this.isSubmitting = false;
              this.scheduleSubmission();
          })
          .catch(err => {
              console.log(err);
              this.isSubmitting = false;
              this.scheduleSubmission();
          });
    }
// end::submitVotes[]

    // Fetch counts from backend database
// tag::fetchVotes[]
    fetchVotes() {
      if (this.backendPath)
      fetch(`${this.backendPath}/votes`, {
          method: "get",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          }
      })
          .then((response) => response.json())
          .then((responseJson) => {
              //Only update votes if the fetched votes are higher than local
              if (responseJson.votes > this.totalVotes) this.totalVotes = responseJson.votes;
              this.setVotes(this.totalVotes);
          })
          .catch(err => {
              console.log(err);
          })
    }
// end::fetchVotes[]
}

export default DataHandler;
