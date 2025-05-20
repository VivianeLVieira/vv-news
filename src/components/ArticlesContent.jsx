import { useState, useEffect } from "react"

import { getArticles } from "../api"
import Error from "./Error"
import ArticlePreview from "./ArticlePreview"

const ArticlesContent = () => {
    const [articleList, setArticleList] = useState([]) 
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        getArticles()
            .then((articlesFromApi) => {
                setArticleList(articlesFromApi)
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

    if (articleList.length === 0) {
        return (<>No related articles found.</>)
    }

    return (
        <ul>
            {articleList.map((article)=> {
                return (
                    <ArticlePreview key={ article.article_id } article={ article }/>
                )
            })}
        </ul>
    )
}

export default ArticlesContent;
