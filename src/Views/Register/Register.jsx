
import {Container, Row, Col, Form, Button, Image} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Register.css';

import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/images/list.png'

import { fetchRegisterNewUser } from '../../API/usersData';

const Register = () => {

    const [newUser, setNewUser] = useState({})
    const navigate = useNavigate()

    const handleSetNewUser = ({target: {value, name}}) => {
        const field = {};
        field[name] = value;
        setNewUser({...newUser, ...field})
    }

    const registerUser = async (e) => {
        e.preventDefault()
        try {
            let res = await fetchRegisterNewUser(newUser);
            if (res) {
                alert("Usuario registrado con éxito");
                navigate("/login"); 
            }
        } catch (error) {
            alert("Algo salio mal, intente nuevamente");
            console.log(error)
        }
    }

    return (
        <Container fluid id="register-container" className="d-flex flex-column justify-content-evenly">
            <Row>
                <Col className="pt-4 px-4 d-flex flex-row justify-content-end align-items-center">
                    <h6>¿Ya tienes una cuenta? <NavLink to="/login"> Inicia tu sesión </NavLink></h6>
                </Col>                
            </Row>
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
                <Col xl={{offset:2, span:8}}>
                    <p className="pt-2" id="register-text">Bienvenido a <b>My TodoApp</b>, la aplicación que estabas buscando. Estamos emocionados de ayudarte a organizar y mantener un registro de tus tareas diarias.
                        Para usar nuestra aplicación, te invitamos a registrarte llenando los siguientes datos. ¡Regístrate ahora y comienza a mejorar tu productividad!
                    </p>
                </Col>                
            </Row>
            <Row >
                <Col xl={{offset:2, span:8}}>
                    <Form onSubmit={registerUser}>
                        <Form.Group>
                            <Form.Label className="pt-2">
                                Nombre
                            </Form.Label>
                            <Form.Control type="text" value={newUser.firstname} onChange={(e) => setNewUser({...newUser, firstname: e.target.value})} required />
                            <Form.Label className="pt-2">
                                Apellido
                            </Form.Label>
                            <Form.Control type="text" value={newUser.lastname} onChange={(e) => setNewUser({...newUser, lastname: e.target.value})} required />
                            <Form.Label className="pt-2">
                                Género
                            </Form.Label>
                            <Form.Select onChange={(e) => setNewUser({...newUser, gender: e.target.value})}>
                                <option value="">Seleccione una opción</option>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                                <option value="otro">Otro</option>
                                <option value="nan">Prefiero no decirlo</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="pt-2">
                                Email
                            </Form.Label>
                            <Form.Control type="email" placeholder="example@example.com" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})}/>
                            <Form.Label className="pt-2">
                                Contraseña
                            </Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})}/>
                            <Form.Text>Su contraseña debe tener entre 8 a 20 carácteres de largo, conteniendo letras y números.</Form.Text>
                        </Form.Group>
                        <Container className="pt-4 d-flex justify-content-center align-items-center">
                            <Button type="submit" variant="success">Registrarse</Button>
                        </Container>                        
                    </Form>
                </Col>                
            </Row>
        </Container>
    )
}

export default Register