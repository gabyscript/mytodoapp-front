import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import { fetchUserData, fetchNewTask, fetchEraseTask, fetchCheckTask } from '../API/usersData';

/* Thunks y métodos HTTP API */

export const getTodosData = createAsyncThunk(
    'user/getTodosData',
    async () => {
        try {
            const response = await fetchUserData();   
            const rows = await response.rows
            const userId = await rows[0].user_id;
            const userData =
                {"firstname" : rows[0].firstname,
                "lastname": rows[0].lastname,
                "email": rows[0].mail}
            if (rows[0].name === null || rows[0].todo_id === null || rows[0].checked === null ) {
                const userTodos = null;
                const totalPending = null;
                const totalDone = null;
                return {userId, userData, userTodos, totalPending, totalDone}
            } else {
                const userTodos = rows.map((todo) => ({name: todo.name, todo_id: todo.todo_id, checked: todo.checked}))
                const totalPending = await (userTodos.filter(t => t.checked === false)).length
                const totalDone = await (userTodos.filter(t => t.checked === true)).length
                return {userId, userData, userTodos, totalPending, totalDone};
            }           
        } catch (error) {
            console.log(error)
        }
    }
)

export const addNewTodo = createAsyncThunk(
    'user/addNewTodo',
    async(newTodo) => {
        try {
            const response = await fetchNewTask(newTodo)
            const newTask = await response
            console.log(newTask)
            return {newTask}
        } catch(error) {
            console.log(error)
            return rejectWithValue(error.message)
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'user/deleteTodo',
    async({todoId}, {rejectWithValue}) => {
        try {
            const response = await fetchEraseTask(todoId) 
            if (response) {
                return {todoId}
            }
        } catch(error) {
            console.log(error)
            return rejectWithValue(error.message)
        }        
    }
)

export const checkTodo = createAsyncThunk(
    'user/checkTodo',
    async({todoId, isChecked}, {rejectWithValue}) => {
        try {
            const response = await fetchCheckTask(todoId, isChecked);  
            if (response) {
                return {todoId, isChecked}
            }
        } catch(error) {
            console.log(error)
            return rejectWithValue(error.message)
        }
    }
)

/* Initial State */

const initialState = {
    userId: null,
    userData: null,
    userTodos: null,
    totalPending: null,
    totalDone: null
}

/* Slice */

const todoSlice = createSlice({
    name: "todosDataList",
    initialState,
    reducers: {
            logOutUser: (state) => {
                localStorage.removeItem('token')
                state.userId = null;
                state.userData = null;
                state.userTodos = null;
                state.totalPending = null;
                state.totalDone = null;
                console.log("Cerrando sesión");
            }},
    extraReducers: {
        [getTodosData.pending]: (state, action) => {
            console.log("Consiguiendo información...");
        },
        [getTodosData.fulfilled]: (state, action) => {
            state.userId = action.payload.userId;
            state.userData = [action.payload.userData];
            state.userTodos = action.payload.userTodos;
            
            if (action.payload.totalPending === null) {
                state.totalPending = 0;
            } else {
                state.totalPending = action.payload.totalPending
            }

            if (action.payload.totalDone === null) {
                state.totalDone = 0;
            } else {
                state.totalDone = action.payload.totalDone
            }
            console.log("Información conseguida con éxito")
            
        },  
        [addNewTodo.pending]: (state, action) => {
            console.log("Se está agregando una nueva tarea")
        },
        [addNewTodo.fulfilled]: (state, action) => {

            if (state.userTodos === null) {
                let arrayNewTask = [action.payload.newTask]
                state.userTodos = arrayNewTask
            } else {
                state.userTodos.push(action.payload.newTask)
            }                   
            console.log("Tarea agregada correctamente")
        },        
        [checkTodo.pending]: (state, action) => {
            console.log("Chequeando tarea")
        },
        [checkTodo.fulfilled]: (state, action) => {
            const todoIndex = state.userTodos.findIndex((todo) => todo.todo_id === action.payload.todoId);
            state.userTodos[todoIndex].checked = action.payload.isChecked;
            console.log("Tarea chequeada con éxito")
        },
        [deleteTodo.fulfilled] : (state, action) => {
            const filteredTodos = state.userTodos.filter((todo) => todo.todo_id !== action.payload.todoId)
            state.userTodos = filteredTodos;
        },
    }
});

export const { logOutUser } = todoSlice.actions

export default todoSlice.reducer;