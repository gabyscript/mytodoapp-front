
import {Container, Row, Col, Form, Button, Image} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Login.css';

import Logo from '../../assets/images/list.png';

import { fetchLoginUser } from '../../API/usersData';

import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({})

    const handlerSetUserData = ({target: {value, name}}) => {
        const field = {};
        field[name] = value;
        setUserData({...userData, ...field})
    }

    const loginUser = async (e) => {
        e.preventDefault()
        const {email, password} = userData;
        try {
            if (!email || !password) {
                alert("Algo ha pasado")
            }
            const token = await fetchLoginUser(userData);
            localStorage.setItem('token', token);
            alert("Se ha iniciado sesión de manera correcta")
            navigate('/todo')
        } catch (error) {
            alert("Hubo un error, intente nuevamente")
            console.log(error)
        }
    }

    return (
        <Container fluid id="login-container">
            <Row>
                <Col className="pt-4 px-4 d-flex flex-row justify-content-end align-items-center">
                    <Container className="d-flex flex-row justify-content-end align-items-center">
                        <h6 className="text-end">¿No tienes una cuenta? <NavLink to="/registro"> Regístrate </NavLink></h6>
                    </Container>                    
                </Col>                
            </Row>
            <Container fluid id="form-container" className="d-flex flex-column justify-content-center">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <h3 className='text-center'>My TodoApp</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Container className="d-flex justify-content-center align-items-center pt-2">
                            <Image src={Logo} id="logo"/>
                        </Container>                        
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <h5 className='text-center pt-2'>Iniciar sesión</h5>
                    </Col>                 
                </Row>
                <Row>
                    <Col xl={{offset:3, span:6}}>
                        <Form onSubmit={loginUser}>
                            <Form.Group>
                                <Form.Label className="pt-2 fw-bold">
                                    Email
                                </Form.Label>
                                <Form.Control type="text" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} required/>
                                <Form.Label className="pt-2 fw-bold">
                                    Contraseña
                                </Form.Label>
                                <Form.Control type="password" value={userData.password} onChange={(e) => setUserData({...userData, password: e.target.value})} required />
                            </Form.Group>
                            <Container className="pt-4 d-flex justify-content-center">
                                <Button type="submit">Iniciar sesión</Button>
                            </Container>
                        </Form>
                    </Col>                
                </Row>
            </Container>
           
        </Container>
    )
}

export default Login