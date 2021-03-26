import React from 'react'
import './show-cvc.styles.scss'
import {ToggleButton, ButtonGroup} from 'react-bootstrap';

import {Card, Row, Col, Button}  from 'react-bootstrap'


class ShowCVc extends React.Component{
   // console.log(props)
    
   constructor(props){
     super(props)

    //  this.state={
    //    captain:null,
    //    viceCaptain: null
    //  }
   }
   
  //  handleCaprtainClick = (event)=>{
  //    event.preventDefault();


  //  }

   render()
    {return(
        <Card className='cvc-card' style={{ width: '65rem' }}>
        <Row className='no-gutters'>
        <Col md={5} lg={5}  >
        <Card.Img variant="top" className='cvc-photo' src={this.props.imageUrl} />
        </Col>
        <Col>
        <Card.Body>
          <Card.Title>{this.props.name}</Card.Title>
          <Card.Text>{this.props.position}</Card.Text>
          <ButtonGroup toggle className="mb-2">
        <ToggleButton
          onClick={() => { this.props.selectCaptain(this.props.id)}}
          type="radio"
        //   checked={unchecked}
          variant={this.props.captain===this.props.id?'secondary':'outline-secondary'}>C</ToggleButton>
         
          </ButtonGroup>

          <ButtonGroup toggle className="mb-2">
        <ToggleButton
          onClick={() => { this.props.selectViceCaptain(this.props.id)}}
          type="radio"
        //   checked={unchecked}
          variant={this.props.viceCaptain===this.props.id?'secondary':'outline-secondary'}>VC</ToggleButton>
         
          </ButtonGroup>
          

        </Card.Body>
        </Col>
        </Row>
      </Card>
        )}
}

export default ShowCVc