import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
//tag::importPackages[]
import { FeedSdk, InstantRemixing } from "@withkoji/vcc";
//end::importPackages[]

//tag::styles[]
const Wrapper = styled.div`
  background-color: ${({ style: { bgColor } }) => bgColor};
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MagazineCover = styled.div`
  width: ${({ style: { width } }) => width}px;
  height: ${({ style: { height } }) => height}px;
  top: ${({ style: { top } }) => top}px;
  left: ${({ style: { left } }) => left}px;
  background: url("${({ style: { backgroundImage } }) =>
    backgroundImage}") no-repeat center center / cover;
  position: absolute;
  z-index: 0;
`;

const Magazine = styled.img`
  max-height: 100%;
  max-width: 100%;
  z-index: 1;
  pointer-events: none;
`;

const H1 = styled.div`
  position: absolute;
  top: ${({ y }) => `${y}%`};
  left: ${({ x }) => `${x}%`};
  font-family: "Roboto", sans-serif;
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => `${fontSize}px`};
  max-width: 35%;
  cursor: default;
`;
//end::styles[]

//tag::optimizeImage[]
const optimizeURL = url =>
  `${url}?fit=bounds&width=${window.innerWidth - 15}&height=${window.innerHeight - 15}&optimize=medium`;
//end::optimizeImage[]

//tag::instantRemixing[]
const instantRemixing = new InstantRemixing();
//end::instantRemixing[]
//tag::feedSdk[]
const feed = new FeedSdk();
//end::feedSdk[]

const App = () => {
  // Handle remixing state
  //tag::monitorRemix[]
  const [isRemixing, setIsRemixing] = useState(instantRemixing.isRemixing);
  useEffect(() => {
    instantRemixing.onSetRemixing(isNowRemixing => {
      setIsRemixing(isNowRemixing);
    });
  }, []);
  //end::monitorRemix[]

  //Handle value updates
  //tag::updateValues[]
  const [magazineOptions, setMagazineOptions] = useState(instantRemixing.get(['settings', 'magazineOptions']));
  const [textOptions, setTextOptions] = useState(instantRemixing.get(['settings', 'textOptions']));

  useEffect(() => {
    instantRemixing.onValueChanged(([scope = "", key = ""], value) => {
      if (scope === 'settings' && key === 'magazineOptions') setMagazineOptions(value);
      if (scope === "settings" && key === "textOptions") setTextOptions(value);
    });
  }, []);
  //end::updateValues[]

  //Click handlers for remixing
  //tag::clickHandlers[]
  const handleClick = e => {
    if (e.target.closest(".text")) {
      instantRemixing.onPresentControl(["settings", "textOptions"]);
    } else {
      instantRemixing.onPresentControl(['settings', 'magazineOptions']);
    }
  };
  //end::clickHandlers[]

  //tag::dynamicSizing[]
  // Handle dynamic resizing
  const [size, setSize] = useState({});

  // Set a reference for the magazine div (import useRef from React to follow this pattern)
  const magazineRef = useRef(null);

  // Set dynamic size properties for the cover image
  const runSetSize = () => {
    setSize({
      height: magazineRef.current.height,
      width: magazineRef.current.width,
      top: magazineRef.current.offsetTop,
      left: magazineRef.current.offsetLeft
    });
  };

  // Re-run the set sizing function when the window is resized
  useEffect(() => {
    window.addEventListener("resize", runSetSize);
    return () => window.removeEventListener("resize", runSetSize);
  }, []);
  //end::dynamicSizing[]

  //tag::templateReady[]
  useEffect(() => {
    // Wrap in the final useEffect so it's sure to run after anything else
    instantRemixing.ready();
    feed.load();
  }, []);
  //end::templateReady[]

  return (
    //tag::renderTemplate[]
    <Wrapper
        onClick={handleClick}
        style={{
            bgColor : magazineOptions.bgColor,
        }}
    >
        <Magazine
            onLoad={runSetSize}
            ref={magazineRef}
            src={magazineOptions.magazineName}
        />
        {
            size.height &&
            <MagazineCover
                style={{
                    ...size,
                    backgroundImage: optimizeURL(magazineOptions.coverImage)
                }}
            >
                <H1
                    className={isRemixing ? 'editable text' : 'text'}
                    fontSize={size.height ? (textOptions.fontSize / 200) * size.height : 20}
                    color={textOptions.color}
                    x={textOptions.position.x}
                    y={textOptions.position.y}
                >
                    {textOptions.title}
                </H1>
            </MagazineCover>
        }
    </Wrapper>
    //end::renderTemplate[]
  );
};

export default App;
