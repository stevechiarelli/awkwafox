import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";
import homeInfo from "../assets/images/home-info.jpg";
import videographyInfo from "../assets/images/videography-info.jpg";
import livestreamInfo from "../assets/images/livestream-info.jpg";
import webdesign1Info from "../assets/images/webdesign1-info.jpg";
import webdesign2Info from "../assets/images/webdesign2-info.jpg";

const Info = (props) => {
    let backgroundImage;
    let mobileImage;

    if (props.data.background === "videography") {
        backgroundImage = videographyInfo;
        mobileImage = <StaticImage src="../assets/images/videography-info-mobile.jpg" className="image" alt="videography" />
    }
    else if (props.data.background === "livestream") {
        backgroundImage = livestreamInfo;
        mobileImage = <StaticImage src="../assets/images/livestream-info-mobile.jpg" className="image" alt="live stream" />
    }
    else if (props.data.background === "webdesign1") {
        backgroundImage = webdesign1Info;
        mobileImage = <StaticImage src="../assets/images/webdesign1-info-mobile.jpg" className="image" alt="web design" />
    }
    else if (props.data.background === "webdesign2") {
        backgroundImage = webdesign2Info;
        mobileImage = <StaticImage src="../assets/images/webdesign2-info-mobile.jpg" className="image" alt="web design" />
    }
    else {
        backgroundImage = homeInfo;
        mobileImage = <StaticImage src="../assets/images/home-info.jpg" className="image" alt="home" />
    }

    return (
        <Wrapper image={backgroundImage} category={props.data.background}>
            <div className="content">
                <div className={props.data.heading === "" ? "container hidden" : "container"}>
                    <p>{props.data.subheading}</p>
                    <ul>
                        {props.data.List.map(list => {
                            return <li key={list.id}>{list.item}</li>
                        })}
                    </ul>
                    <p>{props.data.content}</p>
                </div>
                {mobileImage}
            </div>
        </Wrapper>
    );

}

const Wrapper = styled.section`
    .content {
        position: relative;
        background: var(--background3);
        z-index: -1;

        h3 {
            color: var(--text-light);
            padding-top: 50px;
        }
        
        p {
            color: var(--text-light);
        }
        
        ul {
            list-style-type: initial;
            margin: 1em 0 1em 1em;
            z-index: 1;
        }
        
        ul li {
            color: var(--primary-light);
            margin: .2em 0;
            padding-bottom: 0.5em;
        }

        p:first-child {
            padding-top: 5em;
        }

        p:last-child {
            padding-bottom: 2.0em;
        }

        &::after {
            content: 'awkwafox';
            position: absolute;
            top: 0.2em;
            right: -0.5em;
            font-size: 8em;
            font-weight: 600;
            line-height: 1;
            color: #302b2b;
            opacity: 0.5;
            z-index: -1;
            width: 750px;
        }
    }

    .container {
        display: ${props => props.category === "home" ? "none" : "block"}
    }

    @media only screen and (min-width: 768px) { 
        .content {
            padding-top: 1em;

            p:last-child {
                padding-bottom: 3em;
            }
        }
    }

    @media only screen and (min-width: 992px) {
        .content {
            background: url(${props => props.image});
            background-size: cover;
            background-position: center;
            height: 600px;
            width: 100%;
            padding-top: 0.3em;

            h3 {
                font-size: 1.7em;
            }

            ul li {
                font-size: 1.1em;
                margin: 0;
            }

            p {
                margin-top: 1em;
            }

            h3, p, ul {
                text-align: ${props => (props.category === "webdesign1" || props.category === "livestream")  ? "right" : "left"};
                width: 40%;
                line-height: 25px;
            }

            ul{
                list-style-type: ${props => (props.category === "webdesign1" || props.category === "livestream") ? "none" : "initial"};
            }

            p:first-child {
                padding-top: 3em;
            }

            &::after {
                content: '';
                position: absolute;
            }
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: ${props => (props.category === "webdesign1" || props.category === "livestream") ? "flex-end" : "flex-start"};
        }

        img, .image {
            display: none;
        }
    }

    @media only screen and (min-width: 992px) {
        .content {
           padding-top: 2em;
        }
    }

    @media only screen and (min-width: 1600px) {
        h3 {
            font-size: 2em;
        }

        p {
            font-size: 1.1em
        }

        ul li {
            font-size: 1.3em;
        }
    }
`

export default Info;