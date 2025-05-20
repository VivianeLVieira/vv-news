function CommentCard({ comment }) {
    return (
        <li className="comment">
            <p className="comment-body">{comment.body}</p>
            <p className="comment-author">by {comment.author}</p>
            <p className="comment-votes">Votes: {comment.votes}</p>
        </li>
    )
}

export default CommentCard;
