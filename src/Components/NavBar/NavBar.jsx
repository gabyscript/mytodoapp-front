
import {Container, Nav, Navbar, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import './NavBar.css';
import {useDispatch} from "react-redux";
import { logOutUser } from '../../redux/todoSlice';

const NavigationBar = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logOutUser())
        alert("Has cerrado sesión de manera exitosa");
        navigate('/login')
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand>My TodoApp 📒✍</Navbar.Brand>
                <Button variant="danger" onClick={handleLogOut}>Cerrar sesión</Button>
            </Container>
        </Navbar>
    )
}

export default NavigationBar