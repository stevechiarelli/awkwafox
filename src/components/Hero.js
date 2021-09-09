import React from "react";
import styled from "styled-components";
import ScrollTo from "./ScrollTo";
import homeHero from "../assets/images/home-hero.jpg";
import videographyHero from "../assets/images/videography-hero.jpg";
import livestreamHero from "../assets/images/livestream-hero.jpg";
import webdesignHero from "../assets/images/webdesign-hero.jpg";
import homeMobile from "../assets/images/home-hero-mobile.jpg";
import videographyMobile from "../assets/images/videography-hero-mobile.jpg";
import livestreamMobile from "../assets/images/livestream-hero-mobile.jpg";
import webdesignMobile from "../assets/images/webdesign-hero-mobile.jpg";

const Hero = (props) => {
    let backgroundImage;
    let mobileImage;

    if (props.data.background === "videography") {
        backgroundImage = videographyHero;
        mobileImage = videographyMobile;
    }
    else if (props.data.background === "livestream") {
        backgroundImage = livestreamHero;
        mobileImage = livestreamMobile;
    }
    else if (props.data.background === "webdesign") {
        backgroundImage = webdesignHero;
        mobileImage = webdesignMobile;
    }
    else {
        backgroundImage = homeHero;
        mobileImage = homeMobile;
    }

    const handleClick = (event) => {
        let section = document.querySelector(event.target.name);
        ScrollTo(section, 1250, 65);
    };

    return (
        <Wrapper backgroundImage={backgroundImage} mobileImage={mobileImage} category={props.data.background} >
            <div className="hero-container container">
                <h1>{props.data.heading}</h1>
                <p>{props.data.subheading}</p>
                <button className="btn-primary" name={props.data.buttonURL} onClick={handleClick}>{props.data.buttonText}</button>
            </div>
            <div className="triangle-down"></div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    background: url(${props => props.mobileImage});
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100vh;

    .hero-container {
        padding-top: 11em;
        opacity: 0;
        width: 100%;
        animation-name: headline;
        animation-duration: 1s;
        animation-delay: 1s;
        animation-fill-mode: forwards;
        display: flex;
        flex-direction: column;
        align-items: ${props => props.category === "webdesign" ? "flex-end" : "flex-start"};

        h1, p {
            line-height: 1.2;
            text-align: ${props => props.category === "webdesign" ? "right" : "left"};
        }

        h1 {
            font-size: 2em;
            width: 90%;
        }
        
        p {
            margin-top: 0.7em;
            font-size: 0.9em;
            font-weight: 600;
            color: var(--text-light);
            width: 80%;
        }
        
        .btn-primary {
            color: var(--text-light);
            border: 3px solid var(--text-light);
            margin-top: 1.7em;
        }

        .btn-primary:hover {
            background: #222;
        }
    }

    .triangle-down {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #fff;
        position: absolute;
        bottom: 3%;
        left: 48%;
        opacity: 0;
        animation-name: arrow;
        animation-duration: 1.5s;
        animation-delay: 2s;
        animation-fill-mode: forwards;
    }

    @keyframes headline {
        from {
            opacity: 0;
            padding-top: 9em;
        }
        to {
            opacity: 1;
            padding-top: 11em;
        }
    }

    @keyframes arrow {
        from {
            opacity: 0;
            bottom: 0;
        }
        to {
            opacity: 1;
            bottom: 3%;
        }
    }

    @media only screen and (min-width: 768px) {
        .hero-container {
            padding-top: 16em;

            h1 {
                font-size: 2.5em;
                width: 85%;
            }
        
            p {
                font-size: 0.9em;
                width: 65%;
            }
        }

        .triangle-down {
            bottom: 8%;
        }

        @keyframes headline {
            from {
                opacity: 0;
                padding-top: 14em;
            }
            to {
                opacity: 1;
                padding-top: 16em;
            }
        }

        @keyframes arrow {
            from {
                opacity: 0;
                bottom: 0;
            }
            to {
                opacity: 1;
                bottom: 8%;
            }
        }
    }

    @media only screen and (min-width: 992px) {
        background: url(${props => props.backgroundImage});
        background-size: cover;
        background-position: left;

        .hero-container {
            padding-top: 12em;

            h1, p {
                width: 40%;
            }
        }

        @keyframes headline {
            from {
                opacity: 0;
                padding-top: 10em;
            }
            to {
                opacity: 1;
                padding-top: 12em;
            }
        }
    }

    @media only screen and (min-width: 1600px) {
        .hero-container {
            padding-top: 18em;

            h1 {
                font-size: 3em;
            }

            p {
                font-size: 1.1em;
            }

            h1, p {
                width: 50%;
            }
        }

        @keyframes headline {
            from {
                opacity: 0;
                padding-top: 18em;
            }
            to {
                opacity: 1;
                padding-top: 20em;
            }
        }
    }

    @media (orientation: landscape) and (max-width: 1112px) {
        .hero-container {
            h1, p {
                width: 75%
            }
        }
    }

    @media (orientation: landscape) and (max-height: 415px) {
        .hero-container {
            padding-top: 7em;
        }

        @keyframes headline {
            from {
                opacity: 0;
                padding-top: 5em;
            }
            to {
                opacity: 1;
                padding-top: 7em;
            }
        }
    }

    @media (min-height: 1366px) {
        background: url(${props => props.mobileImage});
        background-size: cover;
        background-position: center;

        .hero-container {
            padding-top: 18em;
            
                h1, p {
                width: 60%;
            }
        }
        
        @keyframes headline {
            from {
                opacity: 0;
                padding-top: 16em;
            }
            to {
                opacity: 1;
                padding-top: 18em;
            }
        }
    }
`

export default Hero;