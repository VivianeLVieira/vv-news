import React from "react";
import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../context/Account";
import { getArticle, patchArticle } from "../utils/api";
import Error from "./Error";


function ArticleDetailed({ article_id }) {
    const { loggedUser } = useContext(AccountContext)
    const [article, setArticle] = useState(null) 
    const [hasVoted, setHasVoted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        getArticle(article_id)
            .then((articleFromApi) => {
                setArticle(articleFromApi)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    
    function handleClickOnUpVote(){
        if(!hasVoted) {
            patchArticle(article_id, 1)
                .then(() => {
                    setArticle({
                        ...article,
                        votes: article.votes + 1
                    })
                    setHasVoted(true)
                })
                .catch(() => {
                    setHasVoted(false)
                })
        }
    }

    function handleClickOnDownVote(){
        if(!hasVoted) {
            patchArticle(article_id, -1)
                .then(() => {
                    setArticle({
                        ...article,
                        votes: article.votes -1
                    })
                    setHasVoted(true)
                })
                .catch(() => {
                    setHasVoted(false)
                })
        }
    }

    if(error) {
        return <Error error ={error} />
    }
    if(isLoading) {
        return <p>Loading...</p>
    }

    if (!article) {
        return (<>No article found</>)
    }

    return (
        <section className="article-detailed">
            {article.article_img_url && (
            <img className="article-image" src={article.article_img_url} alt="article-image" />
            )}
            <div className="article-heading">
                <h1 className="article-title">{article.title}</h1>
                <p>Authored by <span className="article-author">{article.author}</span></p>
            </div>
            {article.body.split("\n").map(paragraph => {
                return (
                    <p key="article-body" className="article-body">{paragraph}</p>
                )
            })}
            <p className="article-topic">Topic: {article.topic} </p>
            <p className="article-votes">Votes: {article.votes}</p>
            {hasVoted ? <p>Well done voting! </p>: null}
            <button onClick={handleClickOnUpVote} disabled={!loggedUser || hasVoted }>Upvote</button>
            <button onClick={handleClickOnDownVote} disabled={!loggedUser || hasVoted }>DownVote</button>
        </section>
    )
}

export default ArticleDetailed;

