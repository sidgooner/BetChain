import React from 'react';
import ContestTile from '../../components/contest-tile/contest-tile.component';
import './contest-page.styles.scss'
import { Link } from 'react-router-dom'
import { CONTEST_DATA } from './contest-data';
import {Card, Row, Col, Button, Container, Carousel}  from 'react-bootstrap'

class ContestPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fixture_data: null
        }
    }

    componentDidMount() {
        // var today = new Date();
        // var dd = String(today.getDate()).padStart(2, '0');
        // var dd2 = String(today.getDate() + 7).padStart(2, '0');
        // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        // var yyyy = today.getFullYear();

        // var from = yyyy + '-' + mm + '-' + dd;

        // var to = yyyy + '-' + mm + '-' + dd2;

        // const requestOptions = {
        //     method: 'GET',
        //     headers: {
        //         'x-rapidapi-host': 'v3.football.api-sports.io',
        //         'x-rapidapi-key': '718b15b972a3bc571a36b512a7bf94c6'
        //     },
        // };

        // fetch(`https://v3.football.api-sports.io/fixtures?league=39&season=2020&from=${from}&to=${to}`, requestOptions)
        //     .then(response => response.json())
        //     .then((data) => {
        //         this.setState({ fixture_data: data.response });
        //         // console.log(this.state.fixture_data)
        //     })


        //====================== using non api data=================
        
        this.setState({fixture_data: CONTEST_DATA})
    }

    render() {
        console.log(this.state);
        return (
            // <h1>hi</h1>
            this.state.fixture_data ? (
                <div>    <h1 className="heading">Bet-Chain</h1>
                <Container className="tiles">
                    <Row>
                    <Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://www.quantumcloud.com/wp/slider-hero/intro-offer.jpg"
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://i.pinimg.com/originals/ab/23/e6/ab23e6d7aad70ebe6d3009a14674aba4.png"
                            alt="Second slide"
                            />

                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://i.pinimg.com/originals/ab/23/e6/ab23e6d7aad70ebe6d3009a14674aba4.png"
                            alt="Third slide"
                            />

                            <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        </Carousel>
                    </Row>
                    <Row>
                    {
                        this.state.fixture_data.map((card_data, key) =>
                        (
                            <Link to={`/select-team/${card_data.fixture.id}/${card_data.teams.home.id}/${card_data.teams.away.id}`}>
                                <ContestTile key={key} id={card_data.fixture.id}
                                    home_name={card_data.teams.home.name}
                                    away_name={card_data.teams.away.name}
                                    home_logo={card_data.teams.home.logo}
                                    away_logo={card_data.teams.away.logo} />
                            </Link>
                        )
                        )
                    }
                    </Row>
                </Container></div>) : (<h1>wait</h1>)
        )
    }
}

export default ContestPage