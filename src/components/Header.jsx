import React from "react";
import { useContext } from "react";
import { Link } from "react-router";
import { AccountContext } from "../context/Account";

function Header() {
    const { loggedUser } = useContext(AccountContext)
    return (
        <header className="Header">
            <Link className="logo" to="/">
                VV-News
            </Link>
            <nav>
                <Link className="nav-link" to="/home">
                    Home
                </Link>
                {/* {loggedUser &&
                    <Link className="nav-link" to={`/user/${loggedUser}/articles`}>
                        Your articles
                    </Link>
                } */}
                <Link className="nav-link" to="/login">
                    {loggedUser ? `Welcome, ${loggedUser}`: "Sign in"}
                </Link>
            </nav>
        </header>
    )
}

export default Header;
