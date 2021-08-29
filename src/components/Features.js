import React from "react";
import styled from "styled-components";
import dots from "../assets/images/dots.svg";
import dots_sm from "../assets/images/dots-sm.svg";
import icon from "../assets/images/icon.svg";

const Features = (props) => {
    return (
        <Wrapper>
            <div className="container">
                <ul>
                    {props.data.map(item => {
                        return (
                            <li key={item.id}>
                                <img src={icon} alt="Awkwa Fox icon" />
                                <h3>{item.heading}</h3>
                                <p>{item.content}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    position: relative;
    overflow: hidden;
    width: 100%;

    ul {
        padding: 5em 0;

        li {
            display: grid;
        }

        li h3 {
            margin-top: 0.5em;
            text-align: center;
            color: var(--secondary);
            font-weight: 400;
        }
        
        li p {
            color: var(--text-dark);
            text-align: center;
        }
        
        li img {
            width: 65px;
            margin: 1em auto 0 auto;
        }
    }
    
    &::before {
        content: '';
        background: url(${dots_sm});
        background-repeat: no-repeat;
        position: absolute;
        right: -20px;
        top: 0;
        width: 50px;
        height: 700px;
        z-index: -1;
    }

    @media only screen and (min-width: 768px) { 
        ul {
            padding: 6em 0;

            li {
                margin-top: 1.5em;
            }
        }
    }

    @media only screen and (min-width: 992px) {
        ul {
            display: grid;
            grid-template-columns: 30% 30% 30%;
            grid-column-gap: 5%;

            li h3, li p {
                text-align: left;
                margin-top: 0.5em;
            }
        
            li p {
                font-size: 0.8em;
                line-height: 1.7;
                margin: 0;
            }
        
            li img {
                width: 75px;
                margin: 0;
            }
        }
    }

    @media only screen and (min-width: 1400px) {
        &::before {
            content: '';
            background: url(${dots});
            background-repeat: no-repeat;
            position: absolute;
            right: -25px;
            top: 0;
            width: 110px;
            height: 800px;
            z-index: -1;
        }
    }
`

export default Features;