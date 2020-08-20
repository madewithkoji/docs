import {PageSection, SectionComponent} from './HomePageStyles'
import React, {useState, useEffect, useRef} from "react"
import styled from 'styled-components';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import {articles} from "./NewsArticles"

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 350px;
  width: auto;
  text-align: center;
  background-color: #111111;
  position: relative;
  @media only screen and (min-width: 320px){
    min-height: 220px;
  };
  @media only screen and (min-width: 400px){
    min-height: 250px;
  };
  @media only screen and (min-width: 560px){
    min-height: 300px;
  };
  @media only screen and (min-width: 769px){
    min-height: 230px;
  };
  @media only screen and (min-width: 960px){
    min-height: 250px;
  };
  @media only screen and (min-width: 1200px){
    min-height: 260px;
  };
  @media only screen and (min-width: 1600px){
    min-height: 300px;
  };
`;

const SlideImage = styled.img`
    width: 79%;
    height: auto;
    position: absolute;
`;

const SlideText = styled.div`
  width: 80%;
  padding: 8px;
  padding-bottom: 20px;
  position: absolute;
  height: 120px;
  font-size: 1rem;
  text-align: left;
  font-weight: bold;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  color: black;
  bottom: 0;
  @media only screen and (min-width: 320px) and (max-width: 620px){
    font-size: 0.85rem;
  };
  @media only screen and (min-width: 620px) and (max-width: 769px){
    font-size: 1rem;
  };
  @media only screen and (min-width: 769px) and (max-width: 1000px){
    font-size: 0.85rem;
  };
`;
const SlideLink = styled.a`
  width: 80%;
  text-align: center;
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

const News = () => {

  const [interval, setInterval] = useState(3000);

  const responsive = {
    480: { items: 1 },
    768: { items: 2 },
    1400: { items: 3 }
  }

    const slides = articles.map((article) => {

      useEffect(() => {
        setTimeout(() => {setInterval(prevInterval => prevInterval-1)}, 1000)
      }, [])

      return(
          <Slide>
            <SlideImage src={article.image}/>
            
              <SlideText>
                <p style={{marginTop: "0", fontWeight: "normal"}}>{article.date}, {article.source}</p>
                  {article.title}
              </SlideText>
          </Slide>
      )
    })

    const CarouselRef = useRef();

  return(
    <PageSection backColor="#111111">
      <ArrowLeft style={{fontSize: "400%", color: "white"}} onClick={() => CarouselRef.current.slidePrev()}>Prev button</ArrowLeft>
      <SectionComponent>
      <h1 style={{color: "white"}}>News</h1>

        <AliceCarousel
        items={slides}
        responsive={responsive}
        fadeOutAnimation={true}
        autoPlayInterval={interval}
        autoPlay={true}
        mouseTrackingEnabled={false}
        buttonsDisabled={true}
        ref={CarouselRef}
        />
        
        
      </SectionComponent>
      <ArrowRigth style={{fontSize: "400%", color: "white"}} onClick={() => CarouselRef.current.slideNext()}>Next button</ArrowRigth>
     </PageSection>
  )
}

export default News