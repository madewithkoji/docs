import { Component, OnInit } from '@angular/core';
import { FeedSdk, InstantRemixing } from '@withkoji/vcc';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

    instantRemixing = null;
    isRemixing = false;
    feed = null;
    logo = '';
    titleOptions: {
        title: '',
        fontSize: 20,
    };
    isPlaying = false;
    imagesLoaded = false;

    ngOnInit() {
        this.instantRemixing = new InstantRemixing();

        // Set the default values
        this.logo = this.instantRemixing.get(['settings', 'logo']);
        this.isRemixing = this.instantRemixing.isRemixing;
        this.titleOptions = this.instantRemixing.get(['settings', 'titleOptions']);

        // Set up a listener to update our values
        this.instantRemixing.onValueChanged((path, newValue) => {
            if (path[0] && path[1] && path[0] === 'settings' && path[1] === 'titleOptions') {
                this.titleOptions = newValue;
            }

            if (path[0] && path[1] && path[0] === 'settings' && path[1] === 'logo') {
                this.logo = newValue;
            }
        });

        // Toggle the isRemixing state based on our listener
        this.instantRemixing.onSetRemixing((isRemixing) => {
            this.isRemixing = isRemixing;
        });

        // Alert the Koji app that we are ready to use instantRemixing
        this.instantRemixing.ready();

        this.feed = new FeedSdk();
        this.feed.load();
        // Toggle the isPlaying state based on the listener
        this.feed.onPlaybackStateChanged((isPlaying) => {
            this.isPlaying = isPlaying;
        });

        // Preload images
        const preloadImages = async () => {
            const promises = [];

            const images = [this.instantRemixing.get(['settings', 'logo'])].map((src) => this.optimizeURL(src));

            images.forEach((src) => {
                promises.push(async () => new Promise((res, rej) => {
                    const img = new window.Image();
                    img.onload = () => res();
                    img.src = src;
                }));
            });

            await Promise.all(promises.map(async p => p()));

            this.imagesLoaded = true;
        };

        preloadImages();
    }

    handleTitleClick = () => {
        if (this.isRemixing) {
            this.instantRemixing.onPresentControl(['settings', 'titleOptions']);
        }
    };

    handleLogoClick = () => {
        if (this.isRemixing) {
            this.instantRemixing.onPresentControl(['settings', 'logo']);
        }
    };

    optimizeURL = url => `${url}?fit=bounds&width=${window.innerWidth / 2}&height=${window.innerHeight / 2}&optimize=medium`;
}
