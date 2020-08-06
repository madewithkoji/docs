import React from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';
import CustomVCC from '@withkoji/custom-vcc-sdk';

// tag::styles[]
const Container = styled.div`
  font-size: 24px;
  color: ${props => props.color};
  background-color: ${(props) => props.background};
  ${(props) => props.fontMixin};
  padding: 12px;
`;

const StyledSelect = styled.select`
  -webkit-appearance: none;
  background-color: ${props => props.background};
  color: ${props => props.color};
  border: 1px solid ${props=> props.border};
  font-size: 16px;
  padding: 12px 8px;
  border-radius: 0;
  width: 100%;
  max-width: 100%;
  background-image: url(data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23157afb%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E);
  background-size: 0.65em, 100%;
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0px 0px;
  margin-bottom: 20px;
  &:focus {
    outline: none;
    border-color: ${props => props.borderFocus}
  }
  &:hover {
    border-color: ${props => props.borderFocus}
  }
`;
// end::styles[]

class App extends React.Component {
  // tag::constructor[]
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        theme: {},
        isLoaded: false
    };
    this.customVCC = new CustomVCC();
    this.customVCC.onTheme((theme) => {
    // theme is a Koji editor theme of the shape: { colors: {}, mixins: {} }
    // save this value in order to style your VCC to match the user's current theme
      this.setState({theme});
    });
  }
  // end::constructor[]
  // tag::mount[]
  componentDidMount() {
    this.customVCC.register();
    this.customVCC.onUpdate((props) => {
        this.setState({value: props.value});
    });
    this.loadAPIValues();
  }
  // end::mount[]
  // tag::loadAPI[]
  loadAPIValues() {
    let url = Koji.config.settings.api_url;
    fetch(url)
      .then(res => res.json())
      .then((result) => {
          this.setState({
            isLoaded: true,
            items: Koji.config.settings.items_key ? result[Koji.config.settings.items_key] : result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  // end::loadAPI[]

  // tag::selectValue[]
  selectValue = (e) => {
    let val = JSON.parse(e.currentTarget.value);
    this.customVCC.change(val);
    this.customVCC.save();
  }
  // end::selectValue[]

  // tag::render[]
  render() {
    let colors = this.state.theme.colors ? this.state.theme.colors : {};
    let mixins = this.state.theme.mixins ? this.state.theme.mixins : {};
    let items = this.state.items ? this.state.items : [];
    return (
        <Container
        color={colors['foreground.default'] ? colors['foreground.default'] : ""}
        background={colors['background.default'] ? colors['background.default'] : ""}
        fontMixin={mixins['font.defaultFamily'] ? mixins['font.defaultFamily'] : ""}>
            <StyledSelect
                background={colors['input.background'] ? colors['input.background'] : ""}
                color={colors['input.foreground'] ? colors['input.foreground'] : ""}
                border={colors['border.default'] ? colors['border.default'] : ""}
                borderFocus={colors['foreground.primary'] ? colors['foreground.primary'] : ""}
                value={JSON.stringify(this.state.value)}
                onChange={this.selectValue}>
                <option>{this.state.isLoaded ? 'Select an option...' : 'Loading options...'}</option>
                {items.map(
                (item, item_index) => {
                    return(
                    <option key={item_index} value={JSON.stringify(item)}>
                        {Koji.config.settings.item_name_key ? item[Koji.config.settings.item_name_key]: item}
                    </option>
                    )
                }
                )}
            </StyledSelect>
        </Container>
    );
  }
  // end::render[]
}

export default App;
