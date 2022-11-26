import react from 'react';
import { ListGroup, Col, Row, ButtonGroup, Button } from 'react-bootstrap';

const AQI_BRACKET = (aqi) => {
    const res = {}
    if (aqi >= 0 && aqi <= 50) {
        res.color = '#00B050'
        res.hint = 'Good'
    }
    else if (aqi > 50 && aqi <= 100) {
        res.color = '#92D050'
        res.hint = 'Satisfactory'
    }
    else if (aqi > 100 && aqi <= 200) {
        res.color = '#FFFF00'
        res.hint = 'Moderate'
    }
    else if (aqi > 201 && aqi <= 300) {
        res.color = '#FF9900'
        res.hint = 'Poor'
    }
    else if (aqi > 301 && aqi <= 400) {
        res.color = '#FF0000'
        res.hint = 'Very Poor'
    }
    else if (aqi > 401) {
        res.color = '#C00000'
        res.hint = 'Severe'
    }
    else {
        res.color = '#000000'
        res.hint = 'Data not available'
    }
    return res
}


const AqiDisplayer = ({ data, onAqiClick }) => {
    if (data.length) {
        console.log('here')
        console.log(data)
        let aqi = data[0].data.AQI
        let bucket = AQI_BRACKET(aqi).hint

        let message = {
            [bucket]: aqi
        }

        return (
            <>
                <Row>
                    <Col xs={2} className='m-1' >
                        <Button style={{ background: bucket === 'Good' ? '#00B050' : '#C5C5C5' }}> &nbsp; </Button>
                    </Col>
                    <Col xs={8} className='m-2'>Good </Col>
                    <Col xs={2} className='m-1'>
                        <Button style={{ background: bucket === 'Satisfactory' ? '#92D050' : '#C5C5C5' }}>&nbsp;</Button>
                    </Col>
                    <Col xs={8} className='m-2'>Satisfactory</Col>
                    <Col xs={2} className='m-1'>
                        <Button style={{ background: bucket === 'Moderate' ? '#FFFF00' : '#C5C5C5' }}>&nbsp;</Button>
                    </Col>
                    <Col xs={8} className='m-2'>Moderate</Col>
                    <Col xs={2} className='m-1'>
                        <Button style={{ background: bucket === 'Poor' ? '#FF9900' : '#C5C5C5' }}>&nbsp;</Button>
                    </Col>
                    <Col xs={8} className='m-2'>Poor</Col>
                    <Col xs={2} className='m-1'>
                        <Button style={{ background: bucket === 'Very Poor' ? '#FF0000' : '#C5C5C5' }}>&nbsp;</Button>
                    </Col>
                    <Col xs={8} className='m-2'>Very Poor </Col>
                    <Col xs={2} className='m-1'>
                        <Button style={{ background: bucket === 'Severe' ? '#C00000' : '#C5C5C5' }}>&nbsp;</Button>
                    </Col>
                    <Col xs={8} className='m-2'>Severe </Col>
                </Row>
            </>
        )
    }
    return (
        <>
            <Row>
                <Col xs={2} className='m-1' >
                    <Button style={{ background: '#00B050' }}> &nbsp; </Button>
                </Col>
                <Col xs={8} className='m-2' style={{ color: '#00B050' }}>Good</Col>
                <Col xs={2} className='m-1'>
                    <Button style={{ background: '#A3DA8D' }}>&nbsp;</Button>
                </Col>
                <Col xs={8} className='m-2'>Satisfactory</Col>
                <Col xs={2} className='m-1'>
                    <Button style={{ background: '#FFFF00' }}>&nbsp;</Button>
                </Col>
                <Col xs={8} className='m-2'>Moderate</Col>
                <Col xs={2} className='m-1'>
                    <Button style={{ background: '#FF9900' }}>&nbsp;</Button>
                </Col>
                <Col xs={8} className='m-2'>Poor</Col>
                <Col xs={2} className='m-1'>
                    <Button style={{ background: '#FF0000' }}>&nbsp;</Button>
                </Col>
                <Col xs={8} className='m-2'>Very Poor</Col>
                <Col xs={2} className='m-1'>
                    <Button style={{ background: '#C00000' }}>&nbsp;</Button>
                </Col>
                <Col xs={8} className='m-2'>Severe</Col>
            </Row>
        </>
    );
}

const Pollutants = ({ data }) => {
    return (data.length &&
        <ListGroup>
            {/* <ListGroup.Item><strong>AQI</strong> {data[0].data.AQI}</ListGroup.Item> */}
            <ListGroup.Item><strong>District name: </strong>{data[0].city}</ListGroup.Item>
            <ListGroup.Item>Pollutants<ListGroup>
                <ListGroup.Item> PM2.5 {data[0].data.PM25}</ListGroup.Item>
                <ListGroup.Item> PM10 {data[0].data.PM10}</ListGroup.Item>
                <ListGroup.Item> NO2 {data[0].data.NO2}</ListGroup.Item>
                <ListGroup.Item> So2 {data[0].data.SO2}</ListGroup.Item>
                <ListGroup.Item> Co {data[0].data.CO}</ListGroup.Item>
                <ListGroup.Item> Ozone {data[0].data.OZONE}</ListGroup.Item>
            </ListGroup></ListGroup.Item>
        </ListGroup>
    );
}

const Data = ({ data, onAqiClick }) => {
    console.log(data)
    return (
        <>
            <Row>
                <AqiDisplayer onAqiClick={onAqiClick} data={data} />
            </Row>
            <Row>
                <Pollutants data={data} />
            </Row>
        </>
    )

}

export default Data;