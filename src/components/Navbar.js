import React from 'react';
import {
    Nav,
    Navbar,
    Col
} from 'react-bootstrap';

export default function () {
    return (
        <Navbar bg="light" expand="lg">
            <Col>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">How it works</Nav.Link>
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Col>
        </Navbar>
    );
}