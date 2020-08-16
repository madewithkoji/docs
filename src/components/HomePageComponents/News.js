import {PageSection, SectionComponent, device} from './HomePageStyles'
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
  justify-content: center;
  align-items: center;
  max-width: 100%;
  text-align: center;
  background-color: black;
`;

const SlideImage = styled.img`
    width: 398px;
    height: 250px;
  @media ${device.mobileS}{
    width: 200px;
    height: 125px;
  };
  @media ${device.mobileM}{
    width: 250px;
    height: 160px;
  };
  @media ${device.mobileL}{
    width: 350px;
    height: 200px;
  };
  @media ${device.tablet}{
    width: 268px;
    height: 160px;
  };
  @media ${device.laptop}{
    width: 358px;
    height: 200px;
  };
  @media ${device.laptopL}{
    width: 358px;
    height: 220px;
  };
  @media ${device.desktop}{
    width: 398px;
    height: 250px;
  };
  @media ${device.desktopL}{
    width: 398px;
    height: 250px;
  };
`;

const SlideText = styled.div`
  width: 400px;
  padding: 8px;
  padding-bottom: 20px;
  height: 100px;
  font-size: 20px;
  text-align: left;
  font-weight: bold;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  color: black;
  @media ${device.mobileS}{
    width: 202px;
    height: 110px;
    font-size: 12px;
  };
  @media ${device.mobileM}{
    width: 252px;
    height: 110px;
    font-size: 12px;
  };
  @media ${device.mobileL}{
    width: 352px;
    height: 100px;
    font-size: 14px;
  };
  @media ${device.tablet}{
    width: 270px;
    height: 100px;
    font-size: 14px;
  };
  @media ${device.laptop}{
    width: 360px;
    height: 100px;
    font-size: 16px;
  };
  @media ${device.laptopL}{
    width: 360px;
    height: 135px;
    font-size: 18px;
  };
  @media ${device.desktop}{
    width: 400px;
    height: 150px;
    font-size: 18px;
  };
  @media ${device.desktopL}{
    width: 400px;
    height: 150px;
    font-size: 18px;
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

const News = () => {

  const [interval, setInterval] = useState(3000);

  const responsive = {
    320: { items: 1 },
    375: { items: 1 },
    425: { items: 1 },
    768: { items: 2 },
    1024: { items: 2 },
    1100: { items: 2 },
    1300: { items: 2 },
    1500: { items: 2 },
    1800: { items: 3 },
    2160: { items: 3 }
  }

    const slides = articles.map((article) => {

      useEffect(() => {
        setTimeout(() => {setInterval(prevInterval => prevInterval-1)}, 1000)
      }, [])

      return(
        <Slide key={article.id}>
          <SlideImage src={article.image}/>
          <a href={article.link} target="_blank">
            <SlideText>
              <p style={{marginTop: "0", fontWeight: "normal"}}>{article.date}, {article.source}</p>
                {article.title}
            </SlideText>
          </a>
        </Slide>
      )
    })

    const CarouselRef = useRef();

  return(
    <PageSection backColor="black">
      <ArrowLeft style={{fontSize: "400%", color: "white"}} onClick={() => CarouselRef.current.slidePrev()}>Prev button</ArrowLeft>
      <SectionComponent column>
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