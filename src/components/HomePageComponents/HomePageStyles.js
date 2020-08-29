import styled, {css} from 'styled-components';

//Component used most page sections as a main wrapper
const PageSection = styled.div`
  display: flex;
  opacity: ${props => props.opacity || 1};
  flex-direction: ${props => props.orientation || "row"};
  background-color: ${props => props.backColor || "#F9F9F9"};
  justify-content: center;
  align-items: ${props => props.align || "center"};
  padding-bottom: ${props => props.padding || "0"};
  padding: 2.5%;
  margin: 0;
  ${props => props.footer && css`
    @media only screen and (max-width: 620px){
      flex-direction: column;
    };
  `};
`;

//Component meant to be under the PageSection component as a divider if needed
const SectionComponent = styled.div`
  color: ${props => props.textColor || "black"};
  display: flex;
  flex-direction: ${props => props.orientation || "column"};
  justify-content: center;
  align-items: ${props => props.alignItems || "center"};
  align-content: ${props => props.alignContent || "center"};
  max-width: ${props => props.maxWidth || "80%"};
  display: ${props => props.display || ""};

  ${props => props.row && css`
  @media only screen and (max-width: 480px){
    flex-direction: column;
  };
  @media only screen and (min-width: 480px) and (max-width: 768px){
    flex-direction: column;
  };
  @media only screen and (min-width: 768px){
    flex-direction: column;
  };
  @media only screen and (min-width: 1380px){
    flex-direction: row;
  };
 `};
  @media only screen and (max-width: 480px){
    font-size: 1rem;
  };
  @media only screen and (min-width: 480px) and (max-width: 768px){
    font-size: 1.25rem;
  };
  @media only screen and (min-width: 768px){
    font-size: 1.25rem;
  };
  @media only screen and (min-width: 1380px){
    font-size: 1.5rem;
  };
`;


//StyledFrame component for the banner (made to be responsive)
const StyledFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
  volume: silent;
`;

const Button = styled.button`
display: flex;
    width: ${props => props.width || "300px"};
    flex-wrap: wrap;
    white-space:nowrap;
    padding: ${props => props.padding || "20px"};
    background-color: ${props => props.backColor || "#F9F9F9"};
    border: 2px solid black;
    color: ${props => props.color || "black"};
    text-decoration: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: 0.6s;
    border-radius: 5px;
    margin: 0;
    font-size: 1.5rem;
    :hover{
        color: white;
        background-color: black;
        border-color: black;
      }
    ${props => props.active==="true" && css`
      color: white;
      background-color: black;
      border-color: black;
      `};
      @media only screen and (max-width: 480px){
        font-size: 1rem;
        width: 200px;
      };
`;
//Custom component used in two different page sections (MultiContent and Resources)
const Image = styled.img`
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "auto"};;
  margin-bottom: 25px;
  margin-top: ${props => props.marginTop || "0px"};
`;

export {PageSection, SectionComponent, StyledFrame, Button, Image}