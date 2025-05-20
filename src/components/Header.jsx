import React from "react";
import { Link } from "react-router";

function Header() {
    return (
        <header className="Header">
        <nav>
            <Link className="nav-link" to="/">
            Home
            </Link>
        </nav>
        </header>
    )
}

export default Header;
