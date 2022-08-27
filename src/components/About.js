import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components";
import dots from "../assets/images/dots.svg";
import dots_sm from "../assets/images/dots-sm.svg";

const About = (props) => {
    const about = [];

    for (let i=0; i < props.data.length; i++) {
        if (i === 0) {
            about.push(
                <React.Fragment key={i}>
                    <div className="about">
                        <p>{props.data[i].content}</p>
                    </div>
                    <GatsbyImage image={getImage(props.data[i].image.localFile)} alt={props.data[i].alt} className="image" imgStyle={{objectFit: `cover`}} />
                </React.Fragment>
            )
        }
        else {
            about.push(
                <React.Fragment key={i}>
                    <GatsbyImage image={getImage(props.data[i].image.localFile)} alt={props.data[i].alt} className="image" imgStyle={{objectFit: `cover`}} />
                    <div className="about">
                        <p>{props.data[i].content}</p>
                    </div>
                </React.Fragment>
            )
        }
    }

    return (
        <Wrapper category={props.data[0].heading}>
            <div className="grid-container" id="about">
                {about}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    position: relative;
    margin: 0;
    width: 100%;

    .about {
        padding: 0 1.5em;

        h2 {
            margin-top: 3em;
            color: ${props => props.category === "live stream" ? "#D3C09A" : "#5c6b8c"};
            font-size: ${props => props.category === "design" ? "1.2em" : "1.5em"};
        }
        
        p {
            margin: 5em 0; 
            line-height: 1.7;
            font-size: 0.8em;
            width: 90%;
            font-size: ${props => props.category === "design" ? "0.9em" : "1em"};
        }
    }

    &::before {
        content: '';
        background: url(${dots_sm});
        background-repeat: no-repeat;
        position: absolute;
        right: -20px;
        top: 0px;
        width: 50px;
        height: 700px;
        z-index: -1;
    }
    
    &::after {
        content: 'awkwafox';
        position: absolute;
        top: 60px;
        left: -30px;
        font-size: 8em;
        font-weight: 600;
        color: var(--primary-watermark);
        z-index: -1000;
        width: 1000px;
    }

    @media only screen and (min-width: 768px) {
        padding: 2em; 

        .grid-container {
            display: grid;
            grid-template-columns: 50% 50%;
        }

        .about {
            padding: 4em 0.5em;

            h2 {
                margin: 1em auto 0 auto;
                text-align: center;
                font-size: 1em;
            }

            p {
                margin: 2em auto;
                font-size: 0.8em;
            }
        }
    }

    @media only screen and (min-width: 1200px) {
        .about {
            padding: 3em;

            h2 {
                margin: 4em auto 0 auto;
                font-size: 1.4em;
            }

            p {
                margin: 5em auto;
                font-size: 1em;
            }
        }

        &::before {
            content: '';
            background: url(${dots});
            background-repeat: no-repeat;
            position: absolute;
            right: -30px;
            top: 50px;
            width: 110px;
            height: 800px;
            z-index: -1;
        }
    }

    @media only screen and (min-width: 1600px) {
        margin: 3em auto 6em auto;

        &::before {
            right: -32%;
            top: 0;
        }
    }
`

export default About;