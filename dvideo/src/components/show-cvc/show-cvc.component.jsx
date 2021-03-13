import React from 'react'
import './show-cvc.styles.scss'
import {Card, Row, Col, Button}  from 'react-bootstrap'
const ShowCVc = (props)=>{

    return(
        <Card style={{ width: '65rem' }}>
        <Row className='no-gutters'>
        <Col md={5} lg={5}  >
        <Card.Img variant="top" src={props.iamgeUrl} />
        </Col>
        <Col>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        </Col>
        </Row>
      </Card>
        )
}

export default ShowCVc