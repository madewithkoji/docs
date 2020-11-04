import './styles.css';
import Koji from '@withkoji/vcc';
import CustomVCC from '@withkoji/custom-vcc-sdk';
// tag::initTheme[]
import { defaultTheme } from './default-theme';

// tag::initTheme[]
var activeTheme = defaultTheme;
var isLoaded = false;
var items = [];
var value = '';

const customVCC = new CustomVCC();
customVCC.onTheme((theme) => {
  // theme is a Koji editor theme of the shape: { colors: {}, mixins: {} }
  // update the theme value and re-render the application
  activeTheme = theme;
  render();
});
// end::initTheme[]

// tag::registerVCC[]
customVCC.register();
customVCC.onUpdate((props) => {
  // update Select value
  value = props.value;
  render();
});
// end::registerVCC[]

loadAPIValues();

// tag::selectValue[]
const selectValue = (e) => {
  let val = JSON.parse(e.currentTarget.value);
  customVCC.change(val);
  customVCC.save();
};
// end::selectValue[]

// tag::render[]
// render app
const render = () => {
  let colors = activeTheme.colors;
  let mixins = activeTheme.mixins;

  let containerStyle = `
        color: ${colors['foreground.default']};
        background-color: ${colors['background.default']};
        ${mixins['font.defaultFamily']};
    `;
  let selectStyle = `
        color: ${colors['input.foreground']};
        background-color: ${colors['input.background']};
        border-color: ${colors['border.default']};
    `;

  document.body.innerHTML = `
        <div id="container" style="${containerStyle}">
            <select id="input" style="${selectStyle}">
                <option>${isLoaded ? 'Select an option...' : 'Loading options...'}</option>
                ${items.map((item, item_index) => {
    let val = JSON.stringify(item).replace(/"/g, '&quot;');
    let checked = false;
    if (Koji.config.settings.item_name_key) {
      checked = item[Koji.config.settings.item_name_key] === value[Koji.config.settings.item_name_key];
    } else {
      checked = item === value;
    }
    return (
      `<option value="${val}" ${checked ? 'selected' : ''}>
                            ${Koji.config.settings.item_name_key ? item[Koji.config.settings.item_name_key] : item}
                        </option>`
    );
  })}
            </select>
        </div>
    `;
  let input = document.getElementById('input');
  input.addEventListener('change', selectValue);
};

// call initial render
render();
// end::render[]

// tag::loadAPI[]
function loadAPIValues() {
  let url = Koji.config.settings.api_url;
  fetch(url)
    .then(res => res.json())
    .then((result) => {
      // Once loaded, set the items then re-render the application
      isLoaded = true;
      items = Koji.config.settings.items_key ? result[Koji.config.settings.items_key] : result;
      render();
    });
}
// end::loadAPI[]
