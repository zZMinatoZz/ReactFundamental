import http from "../http-common";

const getAll = () => {
    return http.get("/posts");
};

const getById = (id) => {
    return http.get(`/posts/${id}`);
};

export default {
    getAll,
    getById
};