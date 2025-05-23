import { Link } from "react-router";

function Article({ article }) {
    return (
        <div className="col mb-3 mr-3"> 
            <Link className="nav-link" to={`/article/${article.article_id}`} alt={article.title}>
                <div className="card" style={{width: '18rem'}}>
                    {article.article_img_url && (
                    <img src={article.article_img_url} className="card-img-top"  alt="article-image" />
                    )}
                    <div className="card-body">   
                        <h5 className="card-title">{article.title} </h5>
                        <p className="card-text">{article.topic} </p>
                    </div> 
                </div>
            </Link>
        </div>
    )
}

export default Article;
