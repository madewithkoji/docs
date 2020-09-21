class App extends React.Component {
    state = {
        isRemixing: false,
        title: '',
    };

    componentDidMount() {
        this.instantRemixing = new InstantRemixing();
        console.log('instantRemixing', this.instantRemixing); // Confirm w/log

        // Set the default value
        this.setState({
            isRemixing: this.instantRemixing.isRemixing,
            title: this.instantRemixing.get(['settings', 'title'])
        });

        // Set up a listener to update title value
        this.instantRemixing.onValueChanged((path, newValue) => {
            if (path[0] && path[1] && path[0] === 'settings' && path[1] === 'title') {
                this.setState({ title: newValue });
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
    }

    handleClick = () => {
        // Conditionally handle the click, only if the template is being remixed
        if (this.state.isRemixing) {
            this.instantRemixing.onPresentControl(['settings', 'title']);
        }
    };

    render() {
        return (
            <Container>
                <h1
                    className={this.state.isRemixing ? 'active' : ''}
                    onClick={this.handleClick}
                >
                    {this.state.title}
                </h1>
                <Image src={'https://images.koji-cdn.com/d9c6b38e-08c4-4faf-ae8e-01082c41a0fb/3f83q-9634d620e97345a6b250ca2feb7e5a2e.png'} />
            </Container>
        );
    }
}
