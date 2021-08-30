import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Links from "./Links";
import styled from "styled-components";

const Sidebar = ({ page, isOpen, toggleSidebar }) => {
    const data = useStaticQuery(query);
    const info = data.contact.nodes[0];

    return (
        <Wrapper>
            <aside className={`sidebar ${isOpen ? "show-sidebar" : ""}`}>
                <button className="close-btn" onClick={toggleSidebar}>
                    <span>&times;</span>
                </button>
                <div className="side-container">
                    <Links page={page} styleClass={`${isOpen ? "sidebar-links" : ""}`} />
                    <ul className={`${isOpen ? "sidebar-info" : ""}`}>
                        <li>{info.phone}</li>
                        <li className="dot"></li>
                        <li>{info.email}</li>
                    </ul>
                </div>
            </aside>
        </Wrapper>
    );
}

export const query = graphql`
  {
    contact:allStrapiContact {
      nodes {
        email
        phone
      }
    }
  }
`

const Wrapper = styled.section`
    .sidebar {
        background: var(--background1);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        display: grid;
        place-items: center;
        opacity: 0;
        transition: all 0.3s linear;
        transform: translateX(-100%);
    }

    .show-sidebar {
        opacity: 1;
        transform: translateX(0);
    }

    .close-btn {
        position: absolute;
        right: 2.5%;
        top: 1.5%;
        font-size: 2.5rem;
        background: transparent;
        border-color: transparent;
        color: var(--text-dark);
        cursor: pointer;
    }

    .close-btn span {
        color: var(--text-dark);
    }

    .sidebar-info {
        position: absolute;
        bottom: 5%;
        left: 0;
        width: 100%;
        text-align: center;

        li {
            opacity: 0;
            animation: slideUp 0.5s ease-in-out 0.3s forwards;
            display: inline;
            text-align: center;
            color: var(--text-dark);
            letter-spacing: 0.2rem;
            font-size: 0.6em;
            transition: all 0.3s linear;
            border-radius: 0.25rem;
        }

        li:nth-of-type(1), li:nth-of-type(3)  {
            animation-delay: 0.5s;
        }

        li:nth-of-type(2) {
            animation-delay: 1s;
        }

        .dot {
            height: 5px;
            width: 5px;
            background-color: var(--text-dark);
            border-radius: 50%;
            display: inline-block;
            margin: 0.1em 1em;
        }

        @keyframes slideUp {
            0% {
                transform: translateY(200px);
                opacity: 0;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }
    }

    @media screen and (min-width: 992px) {
        .sidebar {
            transform: translateX(-100%);
        }
    }
`

export default Sidebar;