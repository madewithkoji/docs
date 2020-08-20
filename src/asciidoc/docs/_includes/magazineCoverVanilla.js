import { FeedSdk, InstantRemixing } from "@withkoji/vcc";
import './styles.css';

const instantRemixing = new InstantRemixing();
const feed = new FeedSdk();

//tag::monitorRemix[]
var isRemixing = instantRemixing.isRemixing;
instantRemixing.onSetRemixing(isNowRemixing => {
    isRemixing = isNowRemixing;
    render();
});
//end::monitorRemix[]

//tag::updateValues[]
var magazineOptions = instantRemixing.get(['settings', 'magazineOptions']);
var textOptions = instantRemixing.get(['settings', 'textOptions']);

// Set values on remix
instantRemixing.onValueChanged(([scope = "", key = ""], value) => {
    if (scope === 'settings' && key === 'magazineOptions') magazineOptions = value;
    if (scope === "settings" && key === "textOptions") textOptions = value;
    render();
});
//end::updateValues[]

// Optimize image urls using fastly params
const optimizeURL = url =>
  `${url}?fit=bounds&width=${window.innerWidth - 15}&height=${window.innerHeight - 15}&optimize=medium`;

const handleClick = e => {
    if (e.target.closest(".text")) {
        instantRemixing.onPresentControl(["settings", "textOptions"]);
    } else {
        instantRemixing.onPresentControl(['settings', 'magazineOptions']);
    }
};

//tag::dynamicSizing[]
// Handle dynamic resizing
var size = {};
const setSize = () => {
    let magazine = document.getElementById('magazine');
    if (magazine) {
        let oldSize = size;
        size = {
            height: magazine.height,
            width: magazine.width,
            top: magazine.offsetTop,
            left: magazine.offsetLeft
        };
        if (oldSize.height !== size.height || oldSize.width !== size.width || oldSize.top !== size.top || oldSize.left !== size.left) {
            render();
        }
    }
}
window.addEventListener("resize", setSize);
//end::dynamicSizing[]

//tag::templateReady[]
instantRemixing.ready();
feed.load();
//end::templateReady[]

//tag::renderTemplate[]
// render app
const render = () => {
    let coverStyles = `
        width: ${size.width}px;
        height: ${size.height}px;
        top: ${size.top}px;
        left: ${size.left}px;
        background-image: url(${optimizeURL(magazineOptions.coverImage)});
    `;
    let titleStyles = `
        font-size: ${size.height ? (textOptions.fontSize / 200) * size.height : 20}px;
        color: ${textOptions.color};
        top: ${textOptions.position.y}%;
        left: ${textOptions.position.x}%;
    `;
    document.body.innerHTML = `
        <div id="wrapper">
            <img id="magazine" src="${magazineOptions.magazineName}"/>
            <div id="magazineCover" style="${coverStyles}">
                <div id="title" class="${isRemixing ? 'editable ': ''}text" style="${titleStyles}">
                    ${textOptions.title}
                </div>
            </div>
        </div>
    `;
    document.getElementById('wrapper').addEventListener('click', handleClick);
    document.getElementById('magazine').onload = setSize;
};

// render
render();
//end::renderTemplate[]