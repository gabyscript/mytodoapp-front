
import {Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css'



const Footer = () => {

    return (
        <Container fluid id="footer">
            <Row className="pt-2">
                <Col className="d-flex flex-row align-items-center justify-content-center pb-2">
                    <a href="https://www.linkedin.com/in/gabrielpreller/" target="__BLANK">
                        <FontAwesomeIcon icon={['fab', 'linkedin']} size="2x" color="black" id="icons" fixedWidth />
                    </a>
                    <a href="https://github.com/gabyscript" target="__BLANK">
                        <FontAwesomeIcon icon={['fab', 'github']} size="2x" color="black" id="icons" fixedWidth />
                    </a>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="fw-bold text-center">2023 Derechos reservados -  Web App by <a href="https://gabriel-preller-dev.netlify.app/" target="__BLANK">GabyScript </a></p>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer