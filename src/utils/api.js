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

const getComments = (article_id) => {
    return vvNewsApi.get(`/articles/${article_id}/comments`)
        .then((response)=> {
            return response.data.comments
        })
}

const getUsers = () => {
    return vvNewsApi.get(`/users`)
        .then((response)=> {
            return response.data.users
        })
}

const patchArticle = (article_id, voteNumber) => {
    return vvNewsApi.patch(`/articles/${article_id}`, {inc_votes: voteNumber})
}

const postNewComment = (article_id, username, body) => {
    return vvNewsApi.post(`/articles/${article_id}/comments`, { username: username, body: body })
}

export { getArticles, getArticle, getComments, getUsers, patchArticle, postNewComment }