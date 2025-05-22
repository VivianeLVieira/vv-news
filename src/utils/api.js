import axios from "axios"

const vvNewsApi = axios.create({
    baseURL: "https://seeding-vv-news.onrender.com/api",
})

const getArticles = (topic, orderBy, sortBy) => {
    return vvNewsApi.get("/articles", {
        params: {
            order: orderBy || "desc",
            topic: topic,
            sort_by: sortBy
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

const getTopics = () => {
    return vvNewsApi.get(`/topics`)
        .then((response)=> {
            return response.data.topics
        })
}

const patchArticle = (article_id, voteNumber) => {
    return vvNewsApi.patch(`/articles/${article_id}`, {inc_votes: voteNumber})
}

const postNewComment = (article_id, username, body) => {
    return vvNewsApi.post(`/articles/${article_id}/comments`, { username: username, body: body })
}

const deleteComment = (comment_id) => {
    return vvNewsApi.delete(`/comments/${comment_id}`)
}

export { getArticles, getArticle, getComments, getUsers, getTopics, patchArticle, postNewComment, deleteComment }