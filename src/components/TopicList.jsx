import { useState, useEffect, useContext } from "react"
import { getTopics } from "../utils/api"
import TopicCard from "./TopicCard"
import Error from "./Error"
import { Link } from "react-router";

function TopicList(){
    const [topicList, setTopicList] = useState([]) 
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!topicList.length) {
            setIsLoading(true)
        }
        getTopics()
            .then((topicsFromApi) => {
                setTopicList(topicsFromApi)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    if(error) {
        return <Error error ={error} />
    }
    if(isLoading) {
        return <p>Loading...</p>
    }

    if (!topicList || topicList.length === 0) {
        return (<p>No topics</p>)
    }

    return (
        <nav>
            <ul className="topic-list">
                <li>
                    <Link className="topic-link" to={`/`}>
                        <span className="topic-slug">All topics</span>
                    </Link>
                </li>
                {topicList.map((topic) => {
                    return (
                        <TopicCard key={topic.slug} topic={topic}/>
                    )
                })}
            </ul>
        </nav>
    )
}

export default TopicList