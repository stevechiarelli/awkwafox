import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../assets/css/main.css"

const Layout = ({ page, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <Navbar page={page} toggleSidebar={toggleSidebar} />
            <Sidebar page={page} isOpen={isOpen} toggleSidebar={toggleSidebar} />
            { children }
            <Footer />
        </>
    )
}

export default Layout;