import React from "react"
import styled from "styled-components";

const Footer = () => {
    return (
        <Wrapper>
            <p>Copyright © 2021 Awkwa Fox. All rights reserved.</p>
        </Wrapper>
    );
}

const Wrapper = styled.footer`
    width: 100%;
    height: 100px;

    p {
        color: var(--primary-dark);
        text-align: center;
        margin: auto;
        padding-top: 3em;
        font-size: 0.8em;
        opacity: 0.8;
    }
`

export default Footer;