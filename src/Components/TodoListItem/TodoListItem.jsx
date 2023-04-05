import React from "react";
import "./TodoListItem.css";
import { Button, Container, Row, Col} from "react-bootstrap";

const TodoListItem = ({ onCheck, checked, onDelete, label }) => (  
  <Container>
    <Row >
      <Col xs={{span:1}} sm={{offset:2, span:1}} md={{offset:2, span:1}} lg={{offset:2, span:1}} xl={{offset:2, span:1}} className="g-2 text-end">
        <Container>
          <input
            tabIndex="-1"
            type="checkbox"
            checked={checked}
            onChange={onCheck}
          />
        </Container>
      </Col>
      <Col xs={{offset:1, span:8}} sm={5} md={4} lg={4} xl={4} className="g-2 ">
        <span id={checked ? "todo-list-item-checked" : ""} className="text-start">{label}</span>
      </Col>
      <Col xs={1} xl={{offset:1, span:1}} className="g-2 px-3">
        <Button variant="danger" className="d-flex justify-content-center align-items-center" id="todo-list-item-delete" onClick={onDelete}>X</Button>
      </Col>
    </Row>
  </Container>
  
);

export default TodoListItem;
