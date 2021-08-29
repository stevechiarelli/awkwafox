import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const NotFoundPage = () => {
    return (
        <Wrapper>
            <div class="container">
                <h1> 404</h1>
                <h2>Oops.. You just found an error page...</h2>
                <p>We're sorry but the page you requested was not found.</p>
                <Link to="/" className="btn-primary">return home</Link>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    display: flex;
    align-items: center;
    height: 100vh;
    text-align: center;

    h1 {
        font-size: 3em;
        font-weight: 400;
        color: #9aa0ac;
    }

    p {
        color: #9aa0ac;
    }

    h2 {
        color: var(--primary);
        font-weight: 600;
    }

    .btn-primary:hover {
        background: #fff;
    }
`

export default NotFoundPage;
