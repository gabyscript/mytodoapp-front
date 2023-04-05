
import './Todo.css';
import NavigationBar from '../../Components/NavBar/NavBar';
import TodoListItem from "../../Components/TodoListItem/TodoListItem";
import {useEffect, useState} from "react";
import { Container, Row, Col, Stack, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch} from "react-redux";
import { getTodosData, checkTodo, deleteTodo, addNewTodo} from "../../redux/todoSlice";

const Todo = () => {

    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user.userData);
    const userTodo = useSelector((state) => state.user.userTodos);
    const userId = useSelector((state) => state.user.userId);
    const totalPending = useSelector((state) => state.user.totalPending);
    const totalDone = useSelector((state) => state.user.totalDone);  

    const [inputValue, setInputValue] = useState("")    
    
   
    useEffect(() => {       
        dispatch(getTodosData())          
    }, [])

    const handleDelete = (todoId) => {
        dispatch(deleteTodo({todoId}))
        dispatch(getTodosData())  
    };

    const toggleCheck = (todoId, isChecked) => {    
        dispatch(checkTodo({todoId, isChecked: !isChecked}))      
        dispatch(getTodosData())     
    };

    const submitTodoForm = (e) => {
        e.preventDefault()
        if(inputValue === "") {
            alert("Complete con una tarea antes de presionar el botón")
            return
        }
        let newTodo = {
            user_id: userId,
            name: inputValue,
        }
        dispatch(addNewTodo(newTodo))         
        setInputValue("")
        dispatch(getTodosData())  
    }


    return ( 
        <Container fluid id="todo-container" className="min-vh-100 d-flex flex-column justfiy-content-evenly bg-light">              
            <NavigationBar />
            <Container fluid>
                <Container>
                    <h5 className="text-center pt-4 pb-2"> ¡Hola {userData?.map(data => {return (data.firstname)})}!, estas son tus tareas pendientes, ¡éxito con tus tareas! </h5>
                </Container>
            <Container className="d-flex flex-column justify-content-center">
                {userTodo?.map(todo => {
                        return (<TodoListItem key={todo.todo_id} id={todo.todo_id} label={todo.name} checked={todo.checked} 
                        onCheck={() => {toggleCheck(todo.todo_id, todo.checked) }} 
                        onDelete={() => {handleDelete(todo.todo_id)}}/>)})}
                </Container>  
            </Container>
            <Container fluid>
                <Row>
                <Col>
                    <h6 className="text-center pt-4">Tareas realizadas: {totalDone} </h6>
                </Col>
                </Row>
                <Row>
                <Col>
                    <h6 className="text-center pt-2">Tareas pendientes: {totalPending}</h6>           
                </Col>
                </Row>
            </Container>
            <Container fluid id="todo-form-container" className="pt-4 d-flex flex-row justify-content-center">            
                <Stack direction="horizontal" gap={2} >
                        <Form.Control type="text" id="form-input" placeholder="Añade una nueva tarea" value={inputValue} onChange={(e) =>setInputValue(e.target.value)}></Form.Control>
                        <div className='vr' />
                        <Button variant="primary" type="submit" onClick={submitTodoForm}>
                            Agregar 
                        </Button>
                </Stack>
            </Container>
            {/*<TodoList />
            <TodoResults />
            <TodoForm /> */}
        </Container>
    )
}

export default Todo