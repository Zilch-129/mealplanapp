import axios, { AxiosResponse } from'axios';
import { Food } from '../../models/Food';

axios.defaults.baseURL = 'https://localhost:7150/api';

axios.interceptors.response.use(async response => {
    try {
        return response
    } catch (error) {
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Foods = {
    list: () => requests.get<Food[]>('/food'),
    details: (id: string) => requests.get<Food>(`/food/${id}`),
    create: (food: Food) => requests.post<void>('/food', food),
    update: (food: Food) => requests.put<void>(`/food/${food.id}`, food),
    delete: (id: string) => requests.del<void>(`/food/${id}`)
}

const agent = {
    Foods
}

export default agent;