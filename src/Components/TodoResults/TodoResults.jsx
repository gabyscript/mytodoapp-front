import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {Container, Row, Col} from 'react-bootstrap';
import { getTodosData } from "../../redux/todoSlice";

import "./TodoResults.css";

const TodoResults = () => {
  
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)
  const [doneTodosQuantity, setDoneTodosQuantity] = useState(0)
  const [missingTodoQuantity, setMissingTodoQuantity] = useState(todos.length)

  useEffect(() => {
    const backupTodos = todos;
    const filteredMissingTodos = backupTodos.filter((t) => {return t.checked === false})
    const filteredDoneTodos = backupTodos.filter((t) =>{ return t.checked === true});
    setDoneTodosQuantity(filteredDoneTodos.length);
    setMissingTodoQuantity(filteredMissingTodos.length)
  }, [todos])

  return (
      <Container fluid>
        <Row>
          <Col>
            <h6 className="text-center pt-4">Tareas realizadas: {doneTodosQuantity}</h6>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 className="text-center pt-2">Tareas pendientes: {missingTodoQuantity}</h6>           
          </Col>
        </Row>
      </Container>
  )
    
};

export default TodoResults;
