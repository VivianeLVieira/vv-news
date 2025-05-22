import { useState, useEffect } from "react"
import { getArticles } from "../utils/api"
import Error from "./Error"
import ArticlePreview from "./ArticlePreview"

const ArticlesContent = ({ topic }) => {
    const [articleList, setArticleList] = useState([]) 
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!articleList.length) {
            setIsLoading(true)
        }
        getArticles(topic)
            .then((articlesFromApi) => {
                setArticleList(articlesFromApi)
                setIsLoading(false)
                setError(null)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [topic])

    // if(error) {
    //     return <Error error ={error} />
    // }
    if(isLoading) {
        return <p>Loading...</p>
    }

    if (!articleList || articleList.length === 0) {
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
