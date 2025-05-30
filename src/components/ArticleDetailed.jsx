import React from "react";
import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../context/Account";
import { getArticle, patchArticle } from "../utils/api";
import Error from "./Error";
import CommentList from "./CommentList";


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
        <>
            <section className="article-detailed">
                {article.article_img_url && (
                    <img className="article-image" src={article.article_img_url} alt="article-image" />
                )}

                <div className="article-heading">
                    <h1 className="article-title">{article.title}</h1>
                    <p>Authored by <span className="article-author">{article.author}</span></p>
                </div>

                {article.body.split("\n").map((paragraph, index) => {
                    return (
                        <p key={index} className="article-body">{paragraph}</p>
                    )
                })}

                <p className="article-topic">Topic: {article.topic} </p>
                <p className="article-votes">Votes: {article.votes}</p>

                {hasVoted ? <p>Well done voting! </p>: null}

                <div className="btn-group" role="group" aria-label="Basic example">
                    <button onClick={handleClickOnUpVote} className="btn btn-secondary" disabled={!loggedUser || hasVoted }>👍</button>
                    <button onClick={handleClickOnDownVote} className="btn btn-secondary" disabled={!loggedUser || hasVoted }>👎</button>
                </div>
            </section>

            {article && <CommentList article_id={article_id}/>}
        </>
    )
}

export default ArticleDetailed;

