//import React from "react";
import { Link } from "react-router";

function Article({ article }) {
    return (
        <li className="article">
            {article.article_img_url && (
            <img className="article-image" src={article.article_img_url} alt="article-image" />
            )}
            <nav> 
                <Link className="nav-link" to={`/article/${article.article_id}`} alt={article.title}>
                    <span className="article-title">{article.title} </span>
                </Link>
                <p className="article-title">{article.topic} </p>
            </nav>
        </li>
    )
}

export default Article;
