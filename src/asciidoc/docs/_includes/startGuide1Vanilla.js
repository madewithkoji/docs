import './styles.css';
import { FeedSdk, InstantRemixing } from '@withkoji/vcc';

var instantRemixing = new InstantRemixing();

var title = instantRemixing.get(['settings', 'title']);

// Alert Koji we are ready to use instantRemixing
instantRemixing.ready();

// render app
const render = () => {
    document.body.innerHTML = `
        <h1 id="title">${title}</h1>
        <img id="logo" src="https://images.koji-cdn.com/e62ec06b-01be-4183-a7c0-ee6e8950f398/t5ues-600pxJavaScriptlogo.png"/>
    `;
};

// Modify elements to display state for remixing
const startRemix = () => {
    let titleElement = document.getElementById('title');
    titleElement.classList.add('edit');
};

// Modify elements to display state for previewing
const stopRemix = () => {
    let titleElement = document.getElementById('title');
    titleElement.classList.remove('edit');
};

var feed = new FeedSdk();
feed.load();


// Add a listener to the on change event of instant remixing to update the title
instantRemixing.onValueChanged((path, newValue) => {
    if (path[0] && path[0] === 'settings' && path[1] && path[1] === 'title') {
        let titleElement = document.getElementById('title');
        titleElement.textContent = newValue;
    }
});

// Add a listener to handle state changes between remixing and not
instantRemixing.onSetRemixing((isRemixing) => {
    if (isRemixing) {
        startRemix();
    } else {
        stopRemix();
    }
});

// Add click event listener to expose title VCC
document.addEventListener('click', function (event) {
    if (!event.target.matches('#title')) return;
    event.preventDefault();

    instantRemixing.onPresentControl(['settings', 'title']);
});

// render
render();
