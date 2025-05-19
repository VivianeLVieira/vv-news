import React from "react";

function Article({ article }) {
    if (!article) return (<></>)

    return (
        <li className="article">
            {article.article_img_url && (
            <img className="article-image" src={article.article_img_url} alt="article-image" />
            )}
            <span className="article-title">{article.title}</span>
        </li>
    )
}

export default Article;
