import React from "react";
import { useContext } from "react";
import { Link } from "react-router";
import { AccountContext } from "../context/Account";

function Header() {
    const { loggedUser } = useContext(AccountContext)
    return (
        <header className="Header">
            <nav>
                <Link className="nav-link" to="/">
                    Home
                </Link>
                <Link className="nav-link" to="/topics">
                    Topic
                </Link>
                {loggedUser &&
                    <Link className="nav-link" to="/user/:user/articles">
                        Your articles
                    </Link>
                }
                <Link className="nav-link" to="/login">
                    {loggedUser ? `${loggedUser}`: "Sign in"}
                </Link>
            </nav>
        </header>
    )
}

export default Header;
