import { Link } from "react-router";

function TopicCard({topic}){
    return (
        <li>
            <Link className="topic-link" to={`/home?topic=${topic.slug}`} alt={topic.slug}>
                <span className="topic-slug">{topic.slug} </span>
            </Link>
        </li>
    )
}

export default TopicCard