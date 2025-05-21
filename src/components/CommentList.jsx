import { useState, useEffect } from "react"
import { useParams } from "react-router";

import { getComments } from "../utils/api"
import Error from "./Error"
import CommentCard from "./CommentCard"


function CommentList() {
    const [commentList, setCommentList] = useState([]) 
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const { article_id } = useParams()

    useEffect(() => {
        setIsLoading(true)
        getComments(article_id)
            .then((commentsFromApi) => {
                setCommentList(commentsFromApi)
            })
            .catch((err) => {
                if(err.response.status ===404){
                    setCommentList([])
                } else {
                    setError(err)
                }
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

    if (!commentList || commentList.length === 0) {
        return (<p>No comments</p>)
    }

    return (
        <section className="comment-section">
        <h2 className="comments-title">Comments</h2>
        <section className="comment-list">
            {commentList.map((comment)=>{
                return (
                    <CommentCard  key={comment.comment_id} comment={comment}/>
                )
            })}
        </section>
        </section>
    )
}

export default CommentList;
