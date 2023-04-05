
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchRegisterNewUser = async (newUser) => {
    const resp = await axios.post(`${BASE_URL}/users/register`, newUser)
    return resp.data
}

export const fetchLoginUser = async(userData) => {
    const resp = await axios.post(`${BASE_URL}/users/login`, userData)    
    return resp.data
}

export const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    const resp = await axios.get(`${BASE_URL}/users`, {
        headers: {Authorization: 'Bearer ' + token}
    });
    return resp.data
}

export const fetchNewTask = async (newTodo) => {
    const resp = await axios.post(`${BASE_URL}/todos`, newTodo);
    return newTodo
}

export const fetchEraseTask = async (todoId) => {
    const token = localStorage.getItem('token');
    const resp = await axios.delete(`${BASE_URL}/todos/` + todoId, {
        headers: {Authorization: 'Bearer ' + token}
    });
    return todoId
}
export const fetchCheckTask = async (todoId, isChecked) => {
    const token = localStorage.getItem('token');
    const resp = await axios.patch(`${BASE_URL}/todos/` + todoId,
        {check: isChecked},
        {        
        headers: {Authorization: 'Bearer ' + token},        
    });
    return {todoId, isChecked}
}