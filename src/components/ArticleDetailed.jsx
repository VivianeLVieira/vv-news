import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { getArticle } from "../api";
import Error from "./Error";

function ArticleDetailed() {
    const [article, setArticle] = useState(null) 
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const { article_id } = useParams()

    useEffect(() => {
        setIsLoading(true)
        getArticle(article_id)
            .then((articleFromApi) => {
                setArticle(articleFromApi)
                setIsLoading(false)
            })
            .catch((err) => {
                setError(err)
            })
    }, [])

    if(error) {
        return <Error error ={error} />
    }
    if(isLoading) {
        return <p>Loading...</p>
    }

    if (!article) {
        return (<>Not article found</>)
    }

    return (
        <section className="article-detailed">
            {article.article_img_url && (
            <img className="article-image" src={article.article_img_url} alt="article-image" />
            )}
            <div className="article-heading">
                <h1 className="article-title">{article.title}</h1>
                <span className="article-author">Authored by {article.author}</span>
            </div>
            {article.body.split("\n").map(paragraph => {
                return (
                    <p key="article-body" className="article-body">{paragraph}</p>
                )
            })}
            <p className="article-topic">Topic: {article.topic} </p>
            <p className="article-votes">Votes: {article.votes}</p>
        </section>
    )
}

export default ArticleDetailed;

