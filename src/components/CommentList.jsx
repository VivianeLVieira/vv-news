import { useState, useEffect, useContext } from "react"
import { AccountContext } from "../context/Account";
import { getComments, postNewComment, deleteComment } from "../utils/api"
import Error from "./Error"
import CommentCard from "./CommentCard"


function CommentList({ article_id }) {
    const { loggedUser } = useContext(AccountContext)
    const [commentList, setCommentList] = useState([]) 
    const [newComments, setNewComments] = useState(0)
    const [newCommentText, setNewCommentText] = useState("")
    const [hasCommented, setHasCommented] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!commentList.length) {
            setIsLoading(true)
        }
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
    }, [newComments])

    function onNewCommentFieldChange(event) {
        setNewCommentText(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault()

        if(newCommentText) {
            postNewComment(article_id, loggedUser, newCommentText)
                .then(() => {
                    setNewComments(newComments + 1)
                    setNewCommentText("");
                    setHasCommented(true)
                })
                .catch(()=>{
                    setError(true)
                    setHasCommented(false)
                })
        }
    }

    function removeComment(comment_id){
        deleteComment(comment_id)
            .then(() => {
                setCommentList(() => {
                    return commentList.filter( comment => comment.comment_id !== comment_id)
                })
            })
            .catch(()=>{
                setError(true)
            })
    }

    if(error) {
        return <Error error ={error} />
    }
    if(isLoading) {
        return <p>Loading...</p>
    }

    if (!commentList || commentList.length === 0) {
        return (<p>0 comments</p>)
    }

    return (
        <section className="comment-section">
            <h2 className="comments-title">Comments {commentList.length}</h2>
            <section>
                {loggedUser &&
                    <form className="comment-form" onSubmit={handleSubmit}>
                        <textarea
                            value={newCommentText}
                            onChange={onNewCommentFieldChange}
                            className="comment-from-text"
                            placeholder="Add your comment here!"
                            rows={4}>    
                        </textarea>
                        <input type="submit" id="comment-button" value="Submit"></input>
                    </form>
                }
                {hasCommented ? <p>Your comment was added! </p>: null}
            </section>
            <section className="comment-list">
                {commentList.map((comment)=>{
                    return (
                        <CommentCard  key={comment.comment_id} comment={comment} removeComment={removeComment}/>
                    )
                })}
            </section>
        </section>
    )
}

export default CommentList;
