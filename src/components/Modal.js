import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
import Inquiry from "./inquiry/Inquiry";
import icon from "../assets/images/icon.svg";

const Modal = (props) => {
    let modal;

    if (props.data !== null) {
        if (props.category === "videography" || props.category === "livestream" || props.category === "featured") {
            modal = <div id="modal" className="modal modal-iframe modal-opacity-dark" style={props.modal === true ? {display: "block"} : {display: "none"}}>
                        <span role="button" tabIndex="0" className="close-alt" onClick={() => props.handleClose()} onKeyDown={() => props.handleClose()}>&times;</span>
                        <iframe title={props.data.title} src={props.data.url} allowFullScreen></iframe>
                        <h4>{props.data.title}</h4>
                    </div>
        }
        else if (props.category === "webdesign") {
            let image;
            
            if (props.data.image !== undefined) {
                image = getImage(props.data.image.localFile);
            }

            modal = <div id="modal" className="modal" style={props.modal === true ? {display: "block"} : {display: "none"}}>
                        <div className="modal-content">
                            <div className="modal-body">
                                {image === undefined ? "" : <GatsbyImage image={image} className="modal-image" id="modal-image" alt={props.data.alt !== undefined ? props.data.alt : ""} />}
                                <div className="modal-info">
                                    <h4>{props.data.title}</h4>
                                    <p>{props.data.description}</p>
                                    {props.data.buttonURL === undefined ? "" : <a href={props.data.buttonURL} target="_blank" rel="noreferrer" className="btn-primary">{props.data.buttonText}</a>}
                                    <button className="btn-primary" onClick={() => props.handleClose()}>close</button>
                                </div>
                            </div>
                        </div>
                    </div>
        }
        else if (props.category === "faq") {
            modal = <div id="modal" className="modal" style={props.modal === true ? {display: "block"} : {display: "none"}}>
                        <div className="modal-dialog" id="faq">
                            <div className="modal-content-center">
                                <div className="modal-form">
                                    <span role="button" tabIndex="0" className="close" onClick={() => props.handleClose()} onKeyDown={() => props.handleClose()}>&times;</span>
                                    <div className="form-content">
                                        <h3 className="faq-title">frequently asked questions</h3>
                                        <hr />
                                        <ul>
                                            {props.data.map(item => {
                                                return (
                                                    <li className="faq" key={item.id}>
                                                        <div className="question">{item.question}</div>
                                                        <div className="answer">{item.answer}</div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        }
        else if (props.category === "success" && props.modal === true) {
            modal = <div id="modal" className="modal modal-show">
                        <div className="modal-content-center">
                            <div className="modal-success">
                                <img src={icon} alt="Awkwa Fox icon" />
                                <h4>{props.data === undefined ? "Error!" : props.data.successHeading}</h4>
                                <p>{props.data === undefined ? "An error has occured." : props.data.successBody}</p>
                                <Link to={props.data === undefined ? "/" : props.data.redirectURL} className="btn-primary">Close</Link>
                            </div>
                        </div>
                    </div>
        }
        else if (props.category === "inquiry") {
            modal = <div id="modal" className="modal" style={props.modal === true ? {display: "block"} : {display: "none"}}>
                        <div className="modal-dialog" id="inquiry">
                            <div className="modal-content-center">
                                <div className="modal-form" id="modal-form">
                                    <span role="button" tabIndex="0" className="close" onClick={() => props.handleClose()} onKeyDown={() => props.handleClose()}>&times;</span>
                                    <Inquiry type={props.type} data={props.data} />
                                </div>
                            </div>
                        </div>
                    </div>
        }
    }

    return (
        <Wrapper>
            {modal}
        </Wrapper>
    );
}

const Wrapper = styled.section`
    .modal {
        display: none;
        position: fixed;
        z-index: 1001;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%; 
        overflow: hidden;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.7);
    }
    
    .modal-content-right {
        position: relative;
        background-color: #fff;
        padding: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
        -webkit-animation-name: animateright;
        -webkit-animation-duration: 0.4s;
        animation-name: animateright;
        animation-duration: 0.4s
    }

    .modal-content-center {
        background: #fff;
        margin: 5% auto 0 auto;
        border: 1px solid #888;
        width: 95%;
        box-shadow: 0 4px 15px 0 rgb(0, 0, 0), 0 6px 20px 0 rgb(0, 0, 0);
        -webkit-animation-name: animatetop;
        -webkit-animation-duration: 0.4s;
        animation-name: animatetop;
        animation-duration: 0.4s;
    }

    .modal-dialog {
        overflow-y: initial !important;
    }

    .modal-show {
        display: block;
    }

    .modal-opacity-dark {
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.9);
    }
    
    @-webkit-keyframes animateright {
        from {left: -300px; opacity: 0} 
        to {left: 0; opacity: 1}
    }
    
    @keyframes animateright {
        from {left: -300px; opacity: 0}
        to {left: 0; opacity: 1}
    }

    @-webkit-keyframes animatetop {
        from {top: -300px; opacity: 0} 
        to {top: 0; opacity: 1}
    }

    @keyframes animatetop {
        from {top: -300px; opacity: 0}
        to {top: 0; opacity: 1}
    }

    .close {
        position: absolute;
        top: 30px;
        right: 35px;
        color: var(--primary);
        font-size: 35px;
        font-weight: bold;
        transition: 0.3s;
    }

    .close-alt {
        position: absolute;
        top: 30px;
        right: 35px;
        color: #f1f1f1;
        font-size: 35px;
        font-weight: bold;
        transition: 0.3s;
    }
    
    .close:hover, .close:focus, .close-alt:hover, .close-alt:focus {
        color: var(--primary-light);
        text-decoration: none;
        cursor: pointer;
    }
    
    .modal-body {
        padding: 5em 1.5em 0 1.5em;
        text-align: center;

        img {
            max-width: 600px;
            margin: 1em auto 0 auto;
        }
    }

    .modal-info {  
        h4 {
            color: var(--text-dark);
            margin-top: 1em;
        }

        p {
            color: var(--text-dark);
            font-size: 0.9em;
            margin: 0 0 2em 0;
            padding: 0;
        }

        button {
            margin-left: 0.5em;
            padding: 1.3em 2.2em 1.3em 2.2em;
        }
    }

    .modal-success {
        padding: 2em 1.5em;
        text-align: center;

        h4 {
            color: var(--primary);
            font-size: 1.4em;
        }

        p {
            font-size: 0.8em;
            margin-bottom: 2.5em;
        }

        img {
            width: 50px;
            margin: 0 auto;
        }
    }

    .modal-form {
        height: 88vh;
        width: 100%;
        margin-top: 3em;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .modal-iframe {
        iframe {
            margin: 3em auto 0 auto;
            padding-top: 3em;
            display: block;
            width: 90%;
            height: 50%;
            border: none;
            -webkit-animation-name: animateright;
            -webkit-animation-duration: 0.4s;
            animation-name: animateright;
            animation-duration: 0.4s
        }

        h4 {
            margin: auto;
            display: block;
            width: 80%;
            max-width: 700px;
            text-align: center;
            color: #ccc;
            padding: 10px 0;
            height: 150px;
        }
    }

    @media (orientation: landscape) and (min-height: 415px) {
        .modal-form {
            height: 90vh;
        }
    }

    @media only screen and (min-width: 768px) {
        .modal-body {
            padding: 2em;
        }

        .modal-content-center {
            margin: 15% auto 0 auto;
            width: 85%;
        }

        .modal-success {
            h4{
                font-size: 1.5em;
            }
            
            p {
                font-size: 1em;
            }
        }

        .modal-form {
            height: 60vh;
            margin-top: 0;
        }

        .close, .close-alt {
            position: absolute;
            top: 15px;
            right: 35px;
            color: #f1f1f1;
            font-size: 40px;
            transition: 0.3s;
        }
    }

    @media only screen and (min-width: 992px) {
        .modal-content {
            width: 50%;
        }

        .modal-content-center {
            margin: 3% auto;
            width: 65%;
        }

        .modal-iframe {
            iframe {
                margin: auto;
                width: 70%;
                height: 85%;
            }
        }

        .modal-form {
            height: 87vh;
        }
    }

    @media only screen and (min-width: 1600px) {
        .modal-form {
            height: 65vh;
        }
    }

    @media (min-height: 1366px) {
        .modal-content-center {
            margin: 15% auto;
            width: 80%;
        }

        .modal-form {
            height: 50vh;
        }
    }
`

export default Modal;