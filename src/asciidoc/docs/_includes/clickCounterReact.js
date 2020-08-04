import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
// tag::importPackages[]
import { FeedSdk, InstantRemixing } from '@withkoji/vcc';
import DataHandler from '../utils/DataHandler';
// end::importPackages[]

// tag::styles[]
const Container = styled.div`
    background-color: ${({ style: { backgroundColor }}) => backgroundColor};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: ${({ style: { textColor }}) => textColor};
    text-align: center;
`;

const edit = 'border: 3px dashed lightgrey; cursor: pointer;';
const normal = 'border: 3px solid transparent';

const Title = styled.h1`
    ${props=>props.remixing ? edit : normal};
`;
// end::styles[]

const AppLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
// tag::styles[]

const Icon = styled.div`
//end::styles[]
// tag::stylesOnly[]
    ... <1>
// end::stylesOnly[]
    animation: ${AppLogoSpin} infinite 20s linear;
    height: 50vmin;
    width: 50vmin;
    background-image: url(${({ style: { icon }}) => icon});
    background-size: contain;
    background-repeat: no-repeat;
    margin-bottom: 16px;
// tag::styles[]
    ${props=>props.remixing ? edit : normal};
    cursor: pointer;
`;
// end::styles[]

const instantRemixing = new InstantRemixing();
// tag::feedSdk[]
const feed = new FeedSdk();
// end::feedSdk[]
// tag::initDataHandler[]
const dataHandler = new DataHandler(instantRemixing);
dataHandler.initialize();
// end::initDataHandler[]

const App = () => {
    const [title, setTitle] = useState(instantRemixing.get(['strings', 'title']));
    const [icon, setIcon] = useState(instantRemixing.get(['images', 'icon']));
    const [backgroundColor, setBackgroundColor] = useState(instantRemixing.get(['colors', 'background']));
    const [textColor, setTextColor] = useState(instantRemixing.get(['colors', 'text']));
// tag::trackState[]
    const [remix, setRemix] = useState(false);
    const [votes, setVotes] = useState(-1);
// end::trackState[]

// tag::callDataHandler[]
    useEffect(() => {
        dataHandler.setVotesCallback(setVotes);
        instantRemixing.ready();
        feed.load();
// end::callDataHandler[]

        instantRemixing.onValueChanged(([scope = '', key = ''], value) => {
            if (scope === 'strings' && key === 'title') setTitle(value);
            if (scope === 'images' && key === 'icon') setIcon(value);
            if (scope === 'colors' && key === 'background') setBackgroundColor(value);
            if (scope === 'colors' && key === 'text') setTextColor(value);
        });
        instantRemixing.onSetRemixing((isRemixing) => {
            setRemix(isRemixing)
        });
    });


    return (
        <Container style={{ backgroundColor, textColor }}>
// tag::renderTemplate[]
            <Title onClick={()=>{
                if (remix)instantRemixing.onPresentControl(['strings', 'title']);
            }} remixing={remix?1:0}>{title}</Title>
            <Icon onClick={()=>{
                if (remix) {
                    instantRemixing.onPresentControl(['images', 'icon']);
                } else {
                    dataHandler.addVote();
                }
            }}remixing={remix?1:0} style={{ icon }} />
            {votes === -1 &&
                <p>Fetching...</p>
            }
            {votes !== -1 &&
                <p>This icon has been clicked {votes} times</p>
            }
// end::renderTemplate[]
        </Container>
    );
};

export default App;
