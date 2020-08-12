import './styles.css';
import { LoadingIndicator } from 'skytree-koji';
// tag::importPackages[]
import { FeedSdk, InstantRemixing } from '@withkoji/vcc';
import DataHandler from './utils/DataHandler';
// end::importPackages[]

// initialize the loading indicator
const loadHandle = LoadingIndicator.ofDocument().init();

const optimizeURL = url => `${url}?fit=bounds&width=${window.innerWidth/2}&height=${window.innerHeight/2}&optimize=medium`;

var instantRemixing = new InstantRemixing();

// Alert Koji we are ready to use instantRemixing
// tag::callDataHandler[]
instantRemixing.ready();
// end::callDataHandler[]

var title = instantRemixing.get(['settings', 'titleOptions', 'title']);
var titleSize = instantRemixing.get(['settings', 'titleOptions', 'fontSize']);
var logo = instantRemixing.get(['settings', 'logo']);

var remixState = 'text';
// tag::trackState[]
var remixing = false;
var votes = -1;
// end::trackState[]

// Preload images before calling render
var imagesLoaded;
const preload = () => {
    let images = [logo];
    imagesLoaded = 0;
    for (let i = 0; i < images.length; i++) {
        let imagePreload = new Image();
        imagePreload.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === images.length) {
                loadHandle.release();
                render();
                if (remixing) {
                    startRemix();
                }
            }
        };
        imagePreload.src = optimizeURL(logo);
    }
};

// tag::renderTemplate[]
// Render application
const render = () => {
    document.body.innerHTML = `
        <h1 style="font-size:${titleSize}px" id="title">${title}</h1>
        <img id="logo" src="${optimizeURL(logo)}"/>
        <p>This icon has been clicked <span id="voteCount">${votes}</span> times</p>
    `;
};
// end::renderTemplate[]

// Inform Koji Feed that the app is ready to be displayed
const feed = new FeedSdk();
// tag::callDataHandler[]
feed.load();
// end::callDataHandler[]

// Initialize the data handler
const dataHandler = new DataHandler(instantRemixing);
dataHandler.initialize();

// Add a listener to the on change event of instant remixing to update the title
instantRemixing.onValueChanged((path, newValue) => {
    if (path[0] && path[0] === 'settings' && path[1] && path[1] === 'titleOptions') {
        let titleElement = document.getElementById('title');
        titleElement.textContent = newValue.title;
        titleElement.style.fontSize = newValue.fontSize+"px";
    }
    if (path[0] && path[0] === 'settings' && path[1] && path[1] === 'logo') {
        let logoImage = document.getElementById('logo');
        logoImage.src = optimizeURL(newValue);
    }
});
// tag::trackState[]

// Add a listener to handle state changes between remixing and not
instantRemixing.onSetRemixing((isRemixing) => {
    remixing = isRemixing;
    if (isRemixing) {
        startRemix();
    } else {
        stopRemix();
    }
});

// Callback to set the vote count value for display
const setVotes = (voteCount) => {
    votes = voteCount;
    let voteDisplay = document.getElementById('voteCount');
    voteDisplay.textContent = votes;
};
// end::trackState[]

// tag::callDataHandler[]
dataHandler.setVotesCallback(setVotes);
// end::callDataHandler[]

// Modify elements to display state for remixing
const startRemix = () => {
    if (remixState === 'text') {
      let titleElement = document.getElementById('title');
      titleElement.classList.add('edit');
    } else if (remixState === 'logo') {
      let logoImage = document.getElementById('logo');
      logoImage.classList.add('edit');
    }

};

// Modify elements to display state for previewing
const stopRemix = () => {
    let titleElement = document.getElementById('title');
    let logoImage = document.getElementById('logo');
    titleElement.classList.remove('edit');
    logoImage.classList.remove('edit');
};
// tag::renderTemplate[]

// Add click event listener to expose title VCC
document.addEventListener('click', function (event) {
    if (!event.target.matches('#title')) return;
    if (remixState !== 'text') return;
    event.preventDefault();

    instantRemixing.onPresentControl(['settings', 'titleOptions']);
});

// Add click event listener to expose logo VCC
document.addEventListener('click', function (event) {
    if (!event.target.matches('#logo')) return;
    if (remixState === 'logo') {
        event.preventDefault();
        instantRemixing.onPresentControl(['settings', 'logo']);
    } else {
        dataHandler.addVote();
    }
});
// end::renderTemplate[]

// Set current remixing state
instantRemixing.onSetCurrentState((templateState) => {
  remixState = templateState;
  if (remixing) {
    stopRemix();
    startRemix();
  }
});

// Add feed event listener to modify title class
feed.onPlaybackStateChanged((isPlaying) => {
  let titleElement = document.getElementById('title');
  if (isPlaying) {
    titleElement.classList.add('animate');
  } else {
    titleElement.classList.remove('animate');
  }
});
