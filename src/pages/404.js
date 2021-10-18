import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { Link } from "gatsby";
import styled from "styled-components";

const NotFoundPage = () => {
    return (
        <Layout page="error">
            <Seo title="Page Not Found - Awkwa Fox" description="Error Page" noindex={true} />
            <Wrapper>
                <div className="container">
                    <h1> 404</h1>
                    <h2>Oops.. You just found an error page...</h2>
                    <p>We're sorry but the page you requested was not found.</p>
                    <Link to="/" className="btn-primary">return home</Link>
                </div>
            </Wrapper>
        </Layout>
    )
}

const Wrapper = styled.section`
    background: var(--background6);
    display: flex;
    align-items: center;
    height: 100vh;
    width: 100%;
    text-align: center;

    h1 {
        font-size: 3em;
        font-weight: 400;
        color: #ccc;
    }

    h2 {
        color: var(--text-light);
        font-weight: 600;
    }

    p {
        color: var(--text-light);
        margin-bottom: 2em;
    }

    .btn-primary {
        color: var(--text-light);
        border: 3px solid var(--text-light);
    }

    .btn-primary:hover {
        background: var(--primary-dark);
    }
`

export default NotFoundPage;