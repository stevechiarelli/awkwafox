import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
import Registration from "./registration/Registration";

const Modal = (props) => {
    let modal;

    if (props.data !== null) {
        if (props.category === "videography" || props.category === "livestream") {
            modal = <div id="modal" className="modal modal-iframe" style={props.modal === true ? {display: "block"} : {display: "none"}}>
                        <span role="button" tabIndex="0" className="iframe-close" onClick={() => props.handleClose()} onKeyDown={() => props.handleClose()}>&times;</span>
                        <iframe title={props.data.title} src={props.data.url}></iframe>
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
                                    <a href={props.data.buttonURL} target="_blank" rel="noreferrer" className="btn-primary">{props.data.buttonText}</a>
                                    <button className="btn-primary" onClick={() => props.handleClose()}>close</button>
                                </div>
                            </div>
                        </div>
                    </div>
        }
        else if (props.category === "faq") {
            modal = <div id="modal" className="modal" style={props.modal === true ? {display: "block"} : {display: "none"}}>
                        <div className="modal-dialog" id="faq">
                            <div className="modal-content">
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
        else if (props.category === "success") {
            modal = <div id="modal" className="modal" style={props.modal === true ? {display: "block"} : {display: "none"}}>
                        <div className="modal-content-center">
                            <div className="modal-success">
                                <h4>Success!</h4>
                                <p>Your form has been submitted. Thanks for your interest.</p>
                                <Link to="/" className="btn-primary">Close</Link>
                            </div>
                        </div>
                    </div>
        }
        else {
            modal = <div id="modal" className="modal" style={props.modal === true ? {display: "block"} : {display: "none"}}>
                        <div className="modal-dialog" id="registration">
                            <div className="modal-content">
                                <div className="modal-form" id="modal-form">
                                    <span role="button" tabIndex="0" className="close" onClick={() => props.handleClose()} onKeyDown={() => props.handleClose()}>&times;</span>
                                    <Registration type={props.type} data={props.data} />
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
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.8);
    }
    
    .modal-content {
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
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        -webkit-animation-name: animatetop;
        -webkit-animation-duration: 0.4s;
        animation-name: animatetop;
        animation-duration: 0.4s
    }

    .modal-dialog {
        overflow-y: initial !important;
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
        display: flex;
        justify-content: flex-end;
        color: var(--primary);
        font-size: 35px;
        font-weight: bold;
        margin: 15px 35px 0 0;
    }

    .iframe-close {
        position: absolute;
        top: 15px;
        right: 35px;
        color: #f1f1f1;
        font-size: 40px;
        font-weight: bold;
        transition: 0.3s;
    }
    
    .close:hover, .close:focus, .iframe-close:hover, .iframe-close:focus {
        color: var(--primary-light);
        text-decoration: none;
        cursor: pointer;
    }
    
    .modal-body {
        padding: 5em 1.5em 0 1.5em;
        text-align: center;

        img {
            max-width: 600px;
            margin-top: 2em;
        }
    }

    .modal-info {  
        h4 {
            color: var(--text-dark);
            margin-top: 0.5em;
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
            font-size: 1.5em;
        }
    }

    .modal-form {
        height: 100vh;
        width: 100%;
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

    @media only screen and (min-width: 768px) {
        .modal-body {
            padding: 2em;
        }
    }

    @media only screen and (min-width: 992px) {
        .modal-content {
            width: 50%;
        }

        .modal-content-center {
            width: 60%;
        }

        .modal-iframe {
            iframe {
                margin: auto;
                width: 70%;
                height: 85%;
            }
        }

        .close {
            position: absolute;
            top: 0;
            right: -100px;
            color: #f1f1f1;
            font-size: 40px;
        }
    }
`

export default Modal;