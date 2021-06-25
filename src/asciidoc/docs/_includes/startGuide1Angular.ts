import { Component, OnInit } from '@angular/core';
import { FeedSdk, InstantRemixing } from '@withkoji/vcc';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    instantRemixing = null;
    title = '';
    isRemixing = false;
    feed = null;

    ngOnInit() {
        this.instantRemixing = new InstantRemixing();
        console.log('instantRemixing', this.instantRemixing); // Confirm w/log

        // Set the default value for title and isRemixing state
        this.isRemixing = this.instantRemixing.isRemixing;
        this.title = this.instantRemixing.get(['settings', 'title']);


        // Set up a listener to update title value
        this.instantRemixing.onValueChanged((path, newValue) => {
            if (path[0] && path[1] && path[0] === 'settings' && path[1] === 'title') {
                this.title = newValue;
            }
        });

        // Toggle the isRemixing state based on the listener
        this.instantRemixing.onSetRemixing((isRemixing) => {
            this.isRemixing = isRemixing;
        });

        // Alert the Koji app that we are ready to use instantRemixing
        this.instantRemixing.ready();

        this.feed = new FeedSdk();
        this.feed.load();
    }

    handleClick = () => {
        // Conditionally handle the click, only if the app is being customized
        if (this.isRemixing) {
            this.instantRemixing.onPresentControl(['settings', 'title']);
        }
    };
}
