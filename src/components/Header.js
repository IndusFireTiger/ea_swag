import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
    <div className = 'header'>
        <NavLink to="/">Logo</NavLink>
    </div>
    );
}

export default Header;