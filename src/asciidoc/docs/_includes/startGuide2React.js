import React from 'react';
import styled from 'styled-components';
import { FeedSdk, InstantRemixing } from '@withkoji/vcc';
import { LoadingIndicator } from 'skytree-koji-react';
import Fade from 'react-reveal/Fade';

const Container = styled.div`
    background-color: #395b88;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    text-align: center;
    color: #fcfcfc;
`;

const Image = styled.img`
    max-width: 50vmin;
    max-height: 50vmin;
`;

const H1 = styled.h1`
 font-size: ${({ fontSize }) => `${fontSize}px`};
`;

class App extends React.Component {

    state = {
        isPlaying: false,
        isRemixing: false,
        logo: '',
        titleOptions: {
            title: '',
            fontSize: 10,
        },
        imagesLoaded: false,
    };

    componentDidMount() {
        this.instantRemixing = new InstantRemixing();

        // Set the default values
        this.setState({
            isRemixing: this.instantRemixing.isRemixing,
            titleOptions: this.instantRemixing.get(['settings', 'titleOptions']),
            logo: this.instantRemixing.get(['settings', 'logo'])
        });

        // Set up a listener to update values
        this.instantRemixing.onValueChanged((path, newValue) => {
            if (path[0] && path[1] && path[0] === 'settings' && path[1] === 'titleOptions') {
                this.setState({ titleOptions: newValue });
            }

            if (path[0] && path[1] && path[0] === 'settings' && path[1] === 'logo') {
                this.setState({ logo: newValue });
            }
        });

        // Toggle the isRemixing state based on the listener
        this.instantRemixing.onSetRemixing((isRemixing) => {
            this.setState({ isRemixing });
        });

        // Alert Koji we are ready to use instantRemixing
        this.instantRemixing.ready();

        this.feed = new FeedSdk();
        this.feed.load();
        // Toggle the isPlaying state based on the listener
        this.feed.onPlaybackStateChanged((isPlaying) => {
            this.setState({ isPlaying });
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

            this.setState({ imagesLoaded: true });
        };

        preloadImages();
    }

    handleTitleClick = () => {
        if (this.state.isRemixing) {
            this.instantRemixing.onPresentControl(['settings', 'titleOptions']);
        }
    };

    handleLogoClick = () => {
        // Conditionally handle the click, only if the template is being remixed
        if (this.state.isRemixing) {
            this.instantRemixing.onPresentControl(['settings', 'logo']);
        }
    };

    optimizeURL = url => `${url}?fit=bounds&width=${window.innerWidth / 2}&
    height=${window.innerHeight / 2}&optimize=medium`;

    render() {
        if (this.state.imagesLoaded) {
            return (
                <Container className={this.state.isPlaying ? 'animate-example' : ''}>
                    <Fade top cascade>
                        <H1
                            className={this.state.isRemixing ? 'active' : ''}
                            fontSize={this.state.titleOptions.fontSize}
                            onClick={this.handleTitleClick} >{this.state.titleOptions.title}</H1>
                        <Image
                            className={this.state.isRemixing ? 'active' : ''}
                            onClick={this.handleLogoClick}
                            src={this.optimizeURL(this.state.logo)} />
                    </Fade>
                </Container>
            );
        }
        return (
            <Container>
                <LoadingIndicator />
            </Container>
        )
    }
}

export default App;
