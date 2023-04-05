import {useEffect, useState} from "react";
import TodoListItem from "../TodoListItem/TodoListItem";
import { useSelector, useDispatch} from "react-redux";
import { getTodosData, checkTodo, deleteTodo} from "../../redux/todoSlice"
import { Container, Row, Col } from "react-bootstrap";

const TodoList = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos);

  useEffect(() => {    
    dispatch(getTodosData())    
  }, [dispatch])

  
  const handleDelete = (todoId) => {
    dispatch(deleteTodo({todoId}))
  };

  const toggleCheck = (todoId, isChecked) => {    
    dispatch(checkTodo({todoId, isChecked: !isChecked}))    
  };

 
  return (
    <Container fluid>
      <Container>
        <h5 className="text-center pt-4 pb-2"> ¡Hola {todos[0]?.firstname}!, estas son tus tareas pendientes, ¡éxito con tus tareas! </h5>
      </Container>
      <Container className="d-flex flex-column justify-content-center">
      {todos?.map(todo => {
            return (<TodoListItem key={todo.id} id={todo.id} label={todo.name} checked={todo.checked} 
              onCheck={() => {toggleCheck(todo.id, todo.checked) }} 
            onDelete={() => {handleDelete(todo.id)}}/>)})}
      </Container>  
    </Container>
  );
};

export default TodoList;
