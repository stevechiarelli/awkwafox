import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components";
import dots from "../assets/images/dots.svg";
import dots_sm from "../assets/images/dots-sm.svg";

const About = (props) => {
    const image = getImage(props.data[0].image.localFile);

    return (
        <Wrapper category={props.data[0].heading}>
            <div className="container" id="about">
                <div className="container-left">
                    {props.data.map(item => {
                        return (
                            <React.Fragment key={item.id}>
                                <h2>{item.heading}</h2>
                                <p>{item.content}</p>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
            <GatsbyImage image={image} alt={props.data[0].alt} className="image" imgStyle={{objectFit: `cover`}} />
        </Wrapper>
    );
}

const Wrapper = styled.section`
    position: relative;
    margin: 6em 0 0 0;

    h2 {
        color: ${props => props.category === "live stream" ? "#D3C09A" : "#5c6b8c"};
        font-size: ${props => props.category === "design" ? "1.2em" : "1.5em"};
    }
    
    p {
        margin: 1.5em 0 5em 0;
        line-height: 1.7;
        width: 90%;
        font-size: ${props => props.category === "design" ? "0.9em" : "1em"};
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
        content: 'awkwa fox';
        position: absolute;
        top: -110px;
        left: -30px;
        font-size: 8em;
        font-weight: 600;
        color: var(--primary-watermark);
        z-index: -1000;
        width: 1000px;
    }

    @media only screen and (min-width: 768px) { 
        margin: 8em 0 0 0;
    }

    @media only screen and (min-width: 992px) {
        display: grid;
        grid-template-columns: 48% 48%;
        grid-column-gap: 4%;
        grid-template-areas: ${props => props.category === "live stream" ? "'image content'" : "'content image'"};
        max-width: 1200px;
        margin:  0 auto 3em auto;

        p {
            width: 100%;
            margin: ${props => props.category === "design" ? "0.5em 0" : "2em 0 5em 0"};
        }
    
        h2 {
            margin-top: ${props => props.category === "design" ? "3em" : "7em"};
        }
    
        .image {
            margin-top: 100px;
            grid-area: image;
        }

        .container {
            grid-area: content;
        }
    
        &::after {
            top: 50px;
            left: -30px;
        }
    }

    @media only screen and (min-width: 1200px) {
            &::before {
            content: '';
            background: url(${dots});
            background-repeat: no-repeat;
            position: absolute;
            right: -180px;
            top: 0px;
            width: 110px;
            height: 800px;
            z-index: -1;
        }
    }
`

export default About;