import './styles.css';
import { FeedSdk, InstantRemixing } from '@withkoji/vcc';
import { LoadingIndicator } from 'skytree-koji';

// initialize the loading indicator
const loadHandle = LoadingIndicator.ofDocument().init();

var instantRemixing = new InstantRemixing();

var title = instantRemixing.get(['settings', 'titleOptions', 'title']);
var titleSize = instantRemixing.get(['settings', 'titleOptions', 'fontSize']);
var logo = instantRemixing.get(['settings', 'logo']);

var remixing = false;

const optimizeURL = url => `${url}?fit=bounds&width=${window.innerWidth}&height=${window.innerHeight}&optimize=medium`;

// render app
const render = () => {
  document.body.innerHTML = `
        <h1 style="font-size:${titleSize}px" id="title">${title}</h1>
        <img id="logo" src="${optimizeURL(logo)}"/>
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

var imagesLoaded;
const preload = () => {
  let images = [logo];
  imagesLoaded = 0;
  for (let i = 0; i < images.length; i++) {
    let imagePreload = new Image();
    imagePreload.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === images.length) {
        loadHandle.release(); // dismiss the loading indicator
        render();
        if (remixing) {
          startRemix();
        }
      }
    };
    imagePreload.src = optimizeURL(logo);
  }
};

var feed = new FeedSdk();
feed.load();

// Add feed event listener to modify title class
feed.onPlaybackStateChanged((isPlaying) => {
  let titleElement = document.getElementById('title');
  if (isPlaying) {
    titleElement.classList.add('animate');
  } else {
    titleElement.classList.remove('animate');
  }
});

// Add a listener to the on change event of instant remixing to update the title
instantRemixing.onValueChanged((path, newValue) => {
  if (path[0] && path[0] === 'settings' && path[1] && path[1] === 'titleOptions') {
    let titleElement = document.getElementById('title');
    titleElement.textContent = newValue.title;
    titleElement.style.fontSize = newValue.fontSize + 'px';
  }
  if (path[0] && path[0] === 'settings' && path[1] && path[1] === 'logo') {
    let logoImage = document.getElementById('logo');
    logoImage.src = newValue;
  }
});

// Add a listener to handle state changes between remixing and not
instantRemixing.onSetRemixing((isRemixing) => {
  remixing = isRemixing;
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

  instantRemixing.onPresentControl(['settings', 'titleOptions']);
});

// Add click event listener to expose logo VCC
document.addEventListener('click', function (event) {
  if (!event.target.matches('#logo')) return;
  event.preventDefault();

  instantRemixing.onPresentControl(['settings', 'logo']);
});

// Alert Koji we are ready to use instantRemixing
instantRemixing.ready();

preload();
