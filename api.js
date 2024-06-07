import axios from "axios";


export const api = axios.create({
    baseURL: "http://localhost:8000/api/v1/",
    headers: {
        "Content-Type": "application/json"
    }
});

export const get = async (url) => {
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const post = async (url, data) => {
    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const put = async (url, data) => {
    try {
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const remove = async (url) => {
    try {
        const response = await api.delete(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// Path: api.js