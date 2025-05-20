import axios from "axios"

const vvNewsApi = axios.create({
    baseURL: "https://seeding-vv-news.onrender.com/api",
})

const getArticles = () => {
    return vvNewsApi.get("/articles", {
        params: {
            order: "desc"
        }, 
    })
        .then((response)=> {
            return response.data.articles
        })
}

const getArticle = (article_id) => {
    return vvNewsApi.get(`/articles/${article_id}`)
        .then((response)=> {
            return response.data.article
        })
}

export { getArticles, getArticle }