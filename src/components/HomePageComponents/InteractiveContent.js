import {PageSection, SectionComponent} from './HomePageStyles'
import React, {useState, useRef} from "react"
import { Link } from 'gatsby';
import styled, {css} from "styled-components"
import AliceCarousel from 'react-alice-carousel'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F9F9F9;
  color: black;
  padding: 5px;
  padding-bottom: 15px;
  margin: 1%;
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
`;

const StyledButton = styled.button`
    display: flex;
    width: 300px;
    flex-wrap: wrap;
    white-space:nowrap;
    padding: 5px;
    background-color: #F9F9F9;
    border: 2px solid black;
    margin: 10px;
    color: black;
    font-size: 1.25rem;
    text-decoration: none;
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
      @media only screen and (max-width: 480px){
        font-size: 1rem;
      };

`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  text-align: center;
`;

const StyledImg = styled.img`
    height: auto;
    width: 25%;
    border-radius: 12px;
    @media only screen and (max-width: 480px){
      width: 80%;
    };
    @media only screen and (min-width: 480px) and (max-width: 768px){
      width: 60%;
    };
    @media only screen and (min-width: 768px){
      width: 35%;
    };
    @media only screen and (min-width: 1380px){
      width: 25%;
    };
`;

const StyledVideo = styled.video`
      width: 25%;
      height: auto;
      border-radius: 4px;
      @media only screen and (max-width: 480px){
        width: 80%;
      };
      @media only screen and (min-width: 480px) and (max-width: 768px){
        width: 60%;
      };
      @media only screen and (min-width: 768px){
        width: 35%;
      };
      @media only screen and (min-width: 1380px){
        width: 25%;
      };
`;

const ArrowLeft = styled(NavigateBeforeIcon)`
    @media only screen and (min-width: 520px){
      transition: 0.4s;
      :hover{
        transform: translate(-10px, 0);
      }
    };
`;  

const ArrowRigth = styled(NavigateNextIcon)`
    @media only screen and (min-width: 520px){
      transition: 0.4s;
      :hover{
        transform: translate(10px, 0);
      }
    };
`;

const ScaffoldSectionItems = [
  "/images/React.png",
  "/images/Vue.png",
  "/images/Svelte.png",
  "/images/VanillaJS.png"
]

const ScaffoldsSection = () => {
  const CarouselRef = useRef();

  const items = ScaffoldSectionItems.map((item) => {
    return(
      <Slide><StyledImg src={item} onClick={() => CarouselRef.current.slideNext()}/></Slide>
    )
  })

  return(
      <AliceCarousel
        fadeOutAnimation={true}
        autoPlay={true}
        mouseTrackingEnabled={false}
        autoPlayInterval={2000}
        buttonsDisabled={true}
        ref={CarouselRef}
        items={items}
        stopAutoPlayOnHover={false}/>
  )
}

//Created these as seperate elements so that they can be more easly converted if they need to be
const CustomElementsSection = () => {
  return(
    <StyledVideo controls loop muted autoPlay src="/videos/DefineCustomEl.mp4"/>
  )
}

const SetCustomValSection = () => {
  return(
    <StyledVideo controls loop muted autoPlay src="/videos/SetCustomVal.mp4"/>
  )
}

const Publish = () => {
  return(
    <StyledImg src="/images/ShareKoji2.png" />
  )
}

const InteractiveContent = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    
    const [isActive, setIsActive] = useState([true,false,false,false])

    const [currentItem, setCurrentItem] = useState(<ScaffoldsSection/>)

    const slides = [
      <ScaffoldsSection/>, 
      <CustomElementsSection/>,
      <SetCustomValSection/>,
      <Publish/>
    ]

    function handleClick(number){
        setCurrentIndex(number)
        const array = generateArray(number)
        setIsActive(array)
        setCurrentItem(slides[number])
    }

    function generateArray(number) {
      const arr = [false,false,false,false];
      arr[number] = true;
      return arr
    }

    return(
    <PageSection padding="5%" orientation="column">
      <SectionComponent>
        <h1 style={{textAlign: "center"}}>How to build remixable templates</h1>
      </SectionComponent>
      <ButtonSection>
          <StyledButton onClick={() => handleClick(0) } active={`${isActive[0]}`}>Start from a scaffold</StyledButton>
          <StyledButton onClick={() => handleClick(1) } active={`${isActive[1]}`}>Define customizable elements</StyledButton>
          <StyledButton onClick={() => handleClick(2) } active={`${isActive[2]}`}>Dynamically set custom values</StyledButton>
          <StyledButton onClick={() => handleClick(3) } active={`${isActive[3]}`}>Publish to the Koji network</StyledButton>
      </ButtonSection>
      
          {currentItem}
    </PageSection>
    )

}

export default InteractiveContent
