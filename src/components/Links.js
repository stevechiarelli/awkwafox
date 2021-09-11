import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const data = [
    {
        id: 1,
        text: "home",
        url: "/",
    },
    {
        id: 2,
        text: "videography",
        url: "/videography/",
    },
    {
        id: 3,
        text: "live stream",
        url: "/livestream/",
    },
    {
        id: 4,
        text: "web design",
        url: "/webdesign/",
    },
    {
        id: 5,
        text: "contact",
        url: "/contact/",
    },
]

const Links = ({ page, styleClass }) => {
    return (
        <Nav>
            <ul className={`page-links ${styleClass ? styleClass : ""}`} itemScope itemType="http://www.schema.org/SiteNavigationElement">
                {data.map(link => {
                    return (
                        <li key={link.id} className={page === link.text ? "active" : ""} itemProp="name">
                            <Link to={link.url} itemProp="url">{link.text}</Link>
                        </li>
                    );
                })}
            </ul>
        </Nav>
    );
}

const Nav = styled.nav`
    .sidebar-links {
        li {
            opacity: 0;
            animation: slideRight 0.5s ease-in-out 0.3s forwards;
        }

        li a {
            display: block;
            text-align: center;
            text-transform: capitalize;
            color: var(--text-dark);
            letter-spacing: 0.2rem;
            margin-bottom: 0.5rem;
            font-size: 2rem;
            transition: all 0.3s linear;
            border-radius: 0.25rem;
        }

        li a:hover {
            color: var(--primary-light);
        }

        li:nth-of-type(1) {
            animation-delay: 0.25s;
        }

        li:nth-of-type(2) {
            animation-delay: 0.5s;
        }

        li:nth-of-type(3) {
            animation-delay: 0.75s;
        }

        li:nth-of-type(4) {
            animation-delay: 1s;
        }

        li:nth-of-type(5) {
            animation-delay: 1.25s;
        }

        @keyframes slideRight {
            0% {
                transform: translateX(-200px);
                opacity: 0;
            }
            100% {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .active a {
            color: var(--primary-light);
            cursor: default;
        }
    }

    .nav-links {
        display: none;
    }

    @media only screen and (min-width: 992px) {
        .nav-links {  
            display: flex;
            height: auto;
            overflow: hidden;
            transition: all 0.3s linear;

            li {
                padding: 0 0.8em;
                margin: 0;

                &:last-child {
                    padding-right: 0;
                }
            }
        
            li a {
                color: var(--text-light);
                font-size: 0.7em;
                font-weight: 600;
                text-transform: uppercase;
                transition: all 0.3s linear;
                padding: 0;
            }

            li a:hover {
                color: var(--primary);
                cursor: pointer;
            }

            .active a {
                color: var(--primary);
            }
        }
    }
`

export default Links;