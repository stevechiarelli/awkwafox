import React, { useState, useEffect } from "react";
import Links from "./Links";
import styled from "styled-components";
import logoLight from "../assets/images/logo_light.svg";
import logoPrimary from "../assets/images/logo_primary.svg";
import menuLight from "../assets/images/menu-light.svg";
import menuDark from "../assets/images/menu-dark.svg";

const Navbar = ({ page, toggleSidebar }) => {
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        window.onscroll = () => {
          handleScroll();
        }
    }, []);


    const handleScroll = () => {
        if (window.scrollY > 0) {
            setSticky(true);
        }
        else {
            setSticky(false);
        }
    }

    return (
        <Wrapper>
            <div className={sticky ? "navbar sticky" : "navbar"} id="navbar">
                <div className="container">
                    <header>
                        <div className="logo">
                            <a href="https://www.awkwafox.com" className="logo-light"><img src={logoLight} alt="logo light" /></a>
                            <a href="https://www.awkwafox.com" className="logo-dark hidden"><img src={logoPrimary} alt="logo primary" /></a>
                        </div>

                        <div className="nav-btn">
                            <button type="button" className="nav-btn-light" onClick={toggleSidebar}>
                                <img src={menuLight} alt="open navigation light" />
                            </button>
                            <button type="button" className="nav-btn-dark hidden" onClick={toggleSidebar}>
                                <img src={menuDark} alt="open navigation dark" />
                            </button>
                        </div>
                    </header>
                    <Links page={page} styleClass="nav-links"></Links>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: transparent;
        padding: 1.5em 0 1em 0;
        z-index: 999;
        opacity: 0;
        transition: 0.7s;
        animation-name: navbar;
        animation-duration: 1s;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;

        .container {
            padding-bottom: 0.3em;
        }
    }

    header {
        display: flex;
        justify-content: space-between;
    }

    .logo-light {
        display: inline-block;
    }

    .logo-light, .logo-dark {
        width: 115px !important;
        margin: 0;
        transition: 0.6s;
    }

    .nav-btn-light, .nav-btn-dark {
        cursor: pointer;
        outline: none;
    }

    .navbar.sticky {
        background: #fff;
    }

    .navbar.sticky .logo-light, .navbar.sticky .nav-btn-light {
        display: none;
    }

    .navbar.sticky .logo-dark, .navbar.sticky .nav-btn-dark {
        display: inline-block;
    }

    .navbar.sticky nav ul li a {
        color: #666;
    }

    .navbar.sticky .active a, .navbar.sticky nav ul li a:hover {
        color: var(--primary);
    }

    @keyframes navbar {
        from {
            opacity: 0;
            padding: 0;
        }
        to {
            opacity: 1;
            padding-top: 1em 0;
        }
    }

    @media only screen and (min-width: 768px) {
        .logo-light, .logo-dark {
            width: 150px !important;
        }
    }

    @media only screen and (min-width: 992px) {
        .navbar {
            background: transparent;

            .container {
                display: flex;
                justify-content: space-between;
                padding-bottom: 0.7em;
            }
        }

        .nav-btn {
            display: none;
        }
    }

`

export default Navbar;