import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <hr />
            <div className = 'navigation'>
                <ul>
                    <li key='1' ><NavLink to="/cars">Cars</NavLink></li>
                    <li key='2' ><NavLink to="/bikes">Bikes</NavLink></li>
                    <li key='3' ><NavLink to="/shows">Shows</NavLink></li>
                </ul>
            </div>
            <hr />
        </div>
    );
}

export default Navigation;