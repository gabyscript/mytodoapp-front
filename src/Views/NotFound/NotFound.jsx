
import {Container, Image, Button} from 'react-bootstrap';
import Logo from '../../assets/images/list.png';

import { useNavigate } from 'react-router-dom';

import { useSelector} from "react-redux";

const NotFound = () => {

    const navigate = useNavigate();
    const todos = useSelector((state) => state.todos)

    return (
        <Container fluid id="notfound-container" className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
            <Container className="d-flex flex-column justify-content-center align-items-center pb-4">
                <h4 className="text-center">La página que estas buscando no existe</h4>
            </Container>
            <Container className="d-flex flex-column justify-content-center align-items-center pb-4">
                <Image src={Logo} />
            </Container>
            <Container className="d-flex flex-column justify-content-center align-items-center">
                <Button onClick={() => {navigate('/login')}}>Volver al inicio</Button>
            </Container>
        </Container>
    )

}

export default NotFound