import { useContext } from "react"
import { AccountContext } from "../context/Account";

function CommentCard({ comment, removeComment }) {
    const { loggedUser } = useContext(AccountContext)

    function HandleRemove() {
        removeComment(comment.comment_id)
    }

    return (
        <li className="comment">
            <p className="comment-body">{comment.body}</p>
            <p className="comment-author">by {comment.author}</p>
            <p className="comment-votes">Votes: {comment.votes}</p>
            {loggedUser === comment.author &&
                <button onClick={HandleRemove}>Remove</button>
            }
        </li>
    )
}

export default CommentCard;
