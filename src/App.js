import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './components/Map';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import NavBar from './components/Navbar';
import Data from './components/Data';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  let [cities, setCities] = useState([]);
  let [selectedCity, setSelectedCity] = useState('');
  let [selectedBucket, selectBucket] = useState({
    'Good': false,
    'Moderate': false,
    'Unhealthy for sensitive groups': false,
    'Unhealthy': false,
    'Very Unhealthy': false,
    'Hazardous': false
  });

  const [radioValue, setRadioValue] = useState({ value: '1' })

  useEffect(() => {
    fetch('http://raspberrypi:3001/documents')
      .then(res => res.json())
      .then(res => setCities(res))
  }, [radioValue])

  let onCityClick = (data) => {
    let id = data.properties.objectid
    let city = cities.filter((ele) => ele['object_id'] === id)
    setSelectedCity(city)
  }

  let onAqiClick = (bucket) => {
    console.log("Clicked ", bucket)
    selectBucket((prevState) => ({
      ...prevState,
      [bucket]: true
    }))
  }



  return (
    <>
      <NavBar radioValue={radioValue} setRadioValue={setRadioValue}></NavBar>
      <Container>
        <Row>
          <Col xs={8}>
            <Map onCityClick={onCityClick} data={cities} selectedBucket={selectedBucket} />
          </Col >
          <Col xs={4}>
            <Data onAqiClick={onAqiClick} data={selectedCity} />
          </Col >
        </Row>
      </Container>
    </>
  );
}

export default App;