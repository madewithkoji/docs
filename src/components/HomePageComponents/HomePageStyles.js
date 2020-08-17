import styled, {css} from 'styled-components';


const size = {
  mobileS: `320px`,
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2160px'
};

const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`, 
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};


//Component used most page sections as a main wrapper
const PageSection = styled.div`
  display: flex;
  opacity: ${props => props.opacity || 1};
  flex-direction: ${props => props.orientation || "row"};
  background-color: ${props => props.backColor || "#e8eae6"};
  justify-content: center;
  align-items: ${props => props.align || "center"};
  padding-bottom: ${props => props.padding || "0"};
  padding: 2.5%;
  margin: 0;
  ${props => props.footer && css`
    @media only screen and (max-width: 520px){
      flex-direction: column;
    };
  `};
`;

//Component meant to be under the PageSection component as a divider if needed
const SectionComponent = styled.div`
  color: ${props => props.textColor || "black"};
  display: flex;
  flex-direction: ${props => props.orientation || "row"};
  justify-content: space-between;
  align-items: ${props => props.alignItems || "center"};
  align-content: ${props => props.alignContent || "center"};
  max-width: ${props => props.maxWidth || "80%"};
  display: ${props => props.display || ""};
  font-size: 24px;

  ${props => props.row && css`
  @media ${device.mobileS}{
    flex-direction: column;
    font-size: 16px;
  };
  @media ${device.mobileM}{
    flex-direction: column;
    font-size: 18px;
  };
  @media ${device.mobileL}{
    flex-direction: column;
    font-size: 20px;
  };
  @media ${device.tablet}{
    flex-direction: column;
    font-size: 24px;
  };
  @media ${device.laptop}{
    flex-direction: column;
    font-size: 24px;
  };
  @media ${device.laptopL}{
    flex-direction: row;
    font-size: 24px;
  };
  @media ${device.desktop}{
    flex-direction: row;
    font-size: 24px;
  };
  @media ${device.desktopL}{
    flex-direction: row;
    font-size: 24px;
  };
 `};
 ${props => props.column && css`
  @media ${device.mobileS}{
    flex-direction: column;
    font-size: 18px;
  };
  @media ${device.mobileM}{
    flex-direction: column;
    font-size: 20px;
  };
  @media ${device.mobileL}{
    flex-direction: column;
    font-size: 20px;
  };
  @media ${device.tablet}{
    flex-direction: column;
    font-size: 28px;
  };
  @media ${device.laptop}{
    flex-direction: column;
    font-size: 28px;
  };
  @media ${device.laptopL}{
    flex-direction: column;
    font-size: 28px;
  };
  @media ${device.desktop}{
    flex-direction: column;
    font-size: 28px;
  };
  @media ${device.desktopL}{
    flex-direction: column;
    font-size: 28px;
  };
 `}
`;

//Graphic component used inside the banner iframe (made to be responsive)
const Graphic = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  @media ${device.mobileS}{
    margin-left: 0px;
    padding-top: 200%;
  }
  @media ${device.mobileM}{
    margin-left: 0px;
    padding-top: 200%;
  }
  @media ${device.mobileL}{
    margin-left: 0px;
    padding-top: 150%;
  }
  @media ${device.tablet}{
    margin-left: 0px;
    padding-top: 100%;
  }
  @media ${device.laptop}{
    padding-top: 100%;
    margin-left: 64px;
    width: 70%;
  }
  @media ${device.laptopL}{
    padding-top: 48%;
    margin-left: 64px;
    width: 100%;
  }
  @media ${device.desktop}{
    margin-left: 0px;
    padding-top: 40%;
    margin-left: 64px;
    width: 100%;
  }
  @media ${device.desktopL}{
    padding-top: 40%;
    margin-left: 64px;
    width: 100%;
  }
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
`;

const Button = styled.button`
display: flex;
    width: ${props => props.width || "300px"};
    flex-wrap: wrap;
    white-space:nowrap;
    padding: ${props => props.padding || "20px"};
    background-color: ${props => props.backColor || "#e8eae6"};
    border: 2px solid black;
    color: ${props => props.color || "black"};
    text-decoration: none;
    font-size: ${props => props.fontSize || "24px"};
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: 0.6s;
    border-radius: 5px;
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
`;
//Custom component used in two different page sections (MultiContent and Resources)
const Image = styled.img`
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "auto"};;
  margin-bottom: 25px;
  margin-top: ${props => props.marginTop || "0px"};
`;

export {PageSection, SectionComponent, Graphic, StyledFrame, Button, Image, device}