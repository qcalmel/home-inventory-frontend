import http from "../http-common";

export const getAll = () => {
    return http.get("/locations");
};

const get = id => {
    return http.get(`/locations/${id}`);
};

const getAllChildren = id => {
    return http.get(`/locations/${id}/children`);
};

const getAllItems = id => {
    return http.get(`/locations/${id}/items`);
};

const create = data => {
    return http.post("/locations", data);
};

const update = (id, data) => {
    return http.put(`/locations/${id}`, data);
};

const remove = id => {
    return http.delete(`/locations/${id}`);
};

const removeAll = () => {
    return http.delete(`/locations`);
};

export default {
    getAll,
    get,
    getAllChildren,
    getAllItems,
    create,
    update,
    remove,
    removeAll,
};