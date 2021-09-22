import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";
import homeInfo from "../assets/images/home-info.jpg";
import videographyInfo from "../assets/images/videography-info.jpg";
import livestreamInfo from "../assets/images/livestream-info.jpg";
import webdesignInfo from "../assets/images/webdesign-info.jpg";

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
    else if (props.data.background === "webdesign") {
        backgroundImage = webdesignInfo;
        mobileImage = <StaticImage src="../assets/images/webdesign-info-mobile.jpg" className="image" alt="web design" />
    }
    else {
        backgroundImage = homeInfo;
        mobileImage = <StaticImage src="../assets/images/home-info.jpg" className="image" alt="home" />
    }

    return (
        <Wrapper image={backgroundImage} category={props.data.background}>
            <div className="content">
                <div className={props.data.heading === "" ? "container hidden" : "container"}>
                    <h3>{props.data.heading}</h3>
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
        background: var(--background3);

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
        }
        
        ul li {
            color: var(--primary-light);
            margin: .2em 0;
        }

        p:last-child {
            padding-bottom: 2.0em;
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
            padding-top: 3%;

            h3 {
                font-size: 1.7em;
            }

            ul li {
                font-size: 1em;
                margin: .5em 0;
            }

            h3, p, ul {
                text-align: ${props => props.category === "livestream" ? "right" : "left"};
                list-style-position: ${props => props.category === "livestream" ? "inside" : "initial"};
                width: 40%;
                line-height: 25px;
            }
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: ${props => props.category === "livestream" ? "flex-end" : "flex-start"};
        }

        img, .image {
            display: none;
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