import { useParams } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ArticleDetailed from "../components/ArticleDetailed";

function ArticlePage () {
    const { article_id } = useParams()

    return (
        <>
            <Header />
            <ArticleDetailed article_id={article_id}/>
            <Footer />
        </>
    )
}
export default ArticlePage;