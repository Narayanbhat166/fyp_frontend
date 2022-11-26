import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const radios = [
    { name: 'Support Vector Classifier', value: '1' },
    { name: 'Linear Regression', value: '2' }
];

function NavBar({ radioValue, setRadioValue }) {
    return (<Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Air Quality Index</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <ButtonGroup>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </Container>
    </Navbar>
    )
}

export default NavBar;