import Header from "../components/Header";
import Footer from "../components/Footer";
import ArticleDetailed from "../components/ArticleDetailed";
import CommentList from "../components/CommentList";

function ArticlePage () {
    return (
        <>
        <Header />
        <ArticleDetailed />
        <CommentList />
        <Footer />
        </>
    )
}
export default ArticlePage;