import React from "react";
import { Link } from "gatsby";
import { navigate } from 'gatsby-link';
import ScrollTo from "./ScrollTo";
import styled from "styled-components";

const Links = ({ page, styleClass, toggleSidebar }) => {

    const data = [
        {
            id: 1,
            text: "home",
            url: "/",
        },
        {
            id: 2,
            text: "wedding films",
            url: "/weddingfilms/",
        },
        {
            id: 3,
            text: "live stream",
            url: "/livestream/",
        },
        {
            id: 4,
            text: "contact",
            url: "/contact/",
        },
    ]

    const handleClick = (event) => {
        let section = document.querySelector(event.target.name);
    
        if (page === "contact") {
            navigate("/#cta");
        }
        else {
            ScrollTo(section, 1250, 65);
        }
        toggleSidebar();
    };

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
                <li>
                    <button className="btn-primary" name="#cta" onClick={handleClick}>Book Now</button>
                </li>
            </ul>
        </Nav>
    );
}

const Nav = styled.nav`
    .sidebar-links {
        li {
            opacity: 0;
            animation: slideRight 0.5s ease-in-out 0.3s forwards;
            text-align: center;

            .btn-primary {
                color: var(--primary);
                border: 3px solid var(--primary);
                margin-top: 3em;
            }
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
            color: var(--primary-medium);
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
            color: var(--primary-medium);
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

                .btn-primary {
                    margin: 0;
                    padding: 0.8em 1.8em 0.8em 1.8em;
                    font-size: .6em;
                    background: #111;
                    color: var(--primary-light);
                    border: 3px solid var(--primary-light);
                }

                .btn-primary:hover {
                    background: #222;
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
                color: var(--primary-light);
                text-decoration: underline;
                cursor: pointer;
            }

            .active a {
                color: var(--primary-light);
                text-decoration: underline;
            }
        }
    }
`

export default Links;