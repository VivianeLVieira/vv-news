import { useSearchParams } from "react-router-dom"
import Header from "../components/Header";
import Footer from "../components/Footer";
import ArticlesContent from "../components/ArticlesContent";
import TopicList from "../components/TopicList";

function HomePage() {
  const [searchParams] = useSearchParams()
  const topic = searchParams.get("topic")

  return (
    <>
      <Header />
      <div className="home-content">
        <section className="topic-list">
          <h3>Topics</h3>
          <TopicList />
        </section>
        <section className="article-list" >
          <h1>Check the latest news</h1>
          <ArticlesContent topic={topic}/>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default HomePage;
