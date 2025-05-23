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

    const HandleSortBySelectedType = (event) => {
        const [sort, order] = event.target.getAttribute('value').split(" ")
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
            <div className="dropdown" >
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sort by: <span id="selectedSortLabel">Newest</span>
                </button>
                <ul className="dropdown-menu">
                    <li><a value="created_at desc" className="dropdown-item" onClick={HandleSortBySelectedType}>Newest</a></li>
                    <li><a value="created_at asc" className="dropdown-item" onClick={HandleSortBySelectedType}>Oldest</a></li>
                    <li><a value="comment_count desc" className="dropdown-item" onClick={HandleSortBySelectedType}>Most commented</a></li>
                    <li><a value="comment_count asc" className="dropdown-item" onClick={HandleSortBySelectedType}>Least commented</a></li>
                    <li><a value="votes desc" className="dropdown-item" onClick={HandleSortBySelectedType}>Most popular</a></li>
                    <li><a value="votes asc" className="dropdown-item" onClick={HandleSortBySelectedType}>Least popular</a></li>
                </ul>
            </div>

            <div className="container ">
                <div className="row row-cols-3">
                    {articleList.map((article)=> {
                        return (
                            <ArticlePreview key={ article.article_id } article={ article }/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default ArticlesContent;
