import { useState, useEffect } from "react"
import { getArticles } from "../utils/api"
import Error from "./Error"
import ArticlePreview from "./ArticlePreview"

const ArticlesContent = ({ topic }) => {
    const [articleList, setArticleList] = useState([]) 
    const [lastTopic, setLastTopic] = useState("")
    const [sortBy, setSortBy] = useState("")
    const [orderBy, setOrderBy] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const sortBySelectedTypeHandle = (event) => {
        const [sort, order] = event.target.value.split(" ")
        setSortBy(sort)
        setOrderBy(order)
    }

    if(lastTopic !== topic){
        setOrderBy("")
        setSortBy("")
        setLastTopic(topic)
    }

    useEffect(() => {
        if (!articleList.length) {
            setIsLoading(true)
        }
        getArticles(topic, orderBy, sortBy)
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
    }, [topic, orderBy, sortBy])


    if(error) {
        return <Error error ={error} />
    }

    if(isLoading) {
        return <p>Loading...</p>
    }

    if (!articleList || articleList.length === 0) {
        return (<>No related articles found.</>)
    }

    return (
        <>
            <select value={sortBy +" "+ orderBy} onChange={sortBySelectedTypeHandle}>
                <option value={""}>Sort by</option>
                <option value="created_at desc">Newest</option>
                <option value="created_at asc">Oldest</option>
                <option value="comment_count desc">Most commented</option>
                <option value="comment_count asc">Least commented</option>
                <option value="votes desc">Most popular</option>
                <option value="votes asc">Least popular</option>
            </select>
            <ul>
                {articleList.map((article)=> {
                    return (
                        <ArticlePreview key={ article.article_id } article={ article }/>
                    )
                })}
            </ul>
        </>
    )
}

export default ArticlesContent;
