
import {Container, Button, Form, Row, Col, Stack} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { addNewTodo, getTodosData } from '../../redux/todoSlice';

import './TodoForm.css';

const TodoForm = () => {

    const todos = useSelector((state) => state.todos);
    const [inputValue, setInputValue] = useState("")    

    const dispatch = useDispatch();
    
    const submitTodoForm = (e) => {
        e.preventDefault()
        if(inputValue === "") {
            alert("Complete con una tarea antes de presionar el botón")
            return
        }
        let newTodo = {
            user_id: todos[0].user_id,
            name: inputValue,
        }
        dispatch(addNewTodo(newTodo)) 
        setInputValue("")
    }
    return (
        <Container fluid id="todo-form-container" className="pt-4 d-flex flex-row justify-content-center">            
            <Stack direction="horizontal" gap={2} >
                        <Form.Control type="text" id="form-input" placeholder="Añade una nueva tarea" value={inputValue} onChange={(e) =>setInputValue(e.target.value)}></Form.Control>
                        <div className='vr' />
                        <Button variant="primary" type="submit" onClick={submitTodoForm}>
                            Agregar 
                        </Button>
            </Stack>
        </Container>
    )
}

export default TodoForm