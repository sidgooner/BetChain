import React from 'react'
import PlayerCardPitchStarted from '../player-card-pitch-match-started/player-card-pitch-match-started.component';
import { Button, Container, Row, Col } from 'react-bootstrap'
import './match-started.styles.scss'
import { PLAYER_STATS } from './match-started-data';

class MatchStarted extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            player_stats: null,
            total_points: 0
        }
    }

    async componentDidMount() {

        const requestOptions = {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': '718b15b972a3bc571a36b512a7bf94c6'
            },
        };


        var player_stats = [];

        // await fetch(`https://v3.football.api-sports.io/fixtures/players?fixture=${this.props.matchId}`, requestOptions)
        //     .then(response => response.json())
        //     .then((data) => {
        //         player_stats = data.response;
        //     });

        // this.setState({ player_stats: player_stats });


        // // pre saved data

       await this.setState({player_stats: PLAYER_STATS.response});


        console.log('response');
        console.log(PLAYER_STATS.response);

        this.calculateGKPoints(this.props.Goalkeeper);

        this.calculateDefPoints(this.props.Defender);
    }


    calculateGKPoints = (Goalkeeper) => {

        // check in team 1 of response

        var GkPoints = 0;

        for (let i = 0; i < this.state.player_stats[0].players.length; i++) {
            if (this.state.player_stats[0].players[i].player.id === Goalkeeper[0].player.id) {
                if (this.state.player_stats[0].players[i].statistics[0].goals.total) {
                    GkPoints += this.state.player_stats[0].players[i].statistics[0].goals.total * 60;
                }

                if (this.state.player_stats[0].players[i].statistics[0].goals.assists) {
                    GkPoints += this.state.player_stats[0].players[i].statistics[0].goals.assists * 20;
                }

                if (this.state.player_stats[0].players[i].statistics[0].shots.on) {
                    GkPoints += this.state.player_stats[0].players[i].statistics[0].shots.on * 20;
                }

                if (this.state.player_stats[0].players[i].statistics[0].passes.key) {
                    GkPoints += this.state.player_stats[0].players[i].statistics[0].passes.key * 3;
                }

                if (this.state.player_stats[0].players[i].statistics[0].tackles.total) {
                    GkPoints += this.state.player_stats[0].players[i].statistics[0].tackles.total * 4;
                }

                if (this.state.player_stats[0].players[i].statistics[0].tackles.interceptions) {
                    GkPoints += this.state.player_stats[0].players[i].statistics[0].tackles.interceptions * 4;
                }

                if (this.state.player_stats[0].players[i].statistics[0].goals.saves) {
                    GkPoints += this.state.player_stats[0].players[i].statistics[0].goals.saves * 6;
                }

                if (this.state.player_stats[0].players[i].statistics[0].penalty.saved) {
                    GkPoints += this.state.player_stats[0].players[i].statistics[0].penalty.saved * 50;
                }


                if (this.state.player_stats[0].players[i].statistics[0].goals.conceded === 0) {
                    GkPoints += 20;
                }

                if (this.state.player_stats[0].players[i].statistics[0].passes.accuracy) {
                    var temp = Number(this.state.player_stats[0].players[i].statistics[0].passes.accuracy);
                    GkPoints = GkPoints + Math.floor((temp / 5));
                }

                if (this.state.player_stats[0].players[i].statistics[0].games.minutes > 0 && !this.state.player_stats[0].players[i].statistics[0].games.substitute) {
                    GkPoints += 4;
                }

                if (this.state.player_stats[0].players[i].statistics[0].games.substitute) {
                    GkPoints += 2;
                }

                if (this.state.player_stats[0].players[i].statistics[0].cards.yellow === 1) {
                    GkPoints -= 4;
                }

                if (this.state.player_stats[0].players[i].statistics[0].cards.red === 1) {
                    GkPoints -= 10;
                }

                if (this.state.player_stats[0].players[i].statistics[0].goals.conceded) {
                    GkPoints -= 2 * this.state.player_stats[0].players[i].statistics[0].goals.conceded;
                }

                if (this.state.player_stats[0].players[i].statistics[0].penalty.missed) {
                    GkPoints -= this.state.player_stats[0].players[i].statistics[0].penalty.missed * 20;
                }

                if (this.state.player_stats[0].players[i].player.id === this.props.captain) {
                    GkPoints *= 2;
                }
                if (this.state.player_stats[0].players[i].player.id === this.props.vice_captain) {
                    GkPoints *= 1.5;
                }


            }
        }

        for (let i = 0; i < this.state.player_stats[1].players.length; i++) {
            if (this.state.player_stats[1].players[i].player.id === Goalkeeper[0].player.id) {
                if (this.state.player_stats[1].players[i].statistics[0].goals.total) {
                    GkPoints += this.state.player_stats[1].players[i].statistics[0].goals.total * 60;
                }

                if (this.state.player_stats[1].players[i].statistics[0].goals.assists) {
                    GkPoints += this.state.player_stats[1].players[i].statistics[0].goals.assists * 20;
                }

                if (this.state.player_stats[1].players[i].statistics[0].shots.on) {
                    GkPoints += this.state.player_stats[1].players[i].statistics[0].shots.on * 20;
                }

                if (this.state.player_stats[1].players[i].statistics[0].passes.key) {
                    GkPoints += this.state.player_stats[1].players[i].statistics[0].passes.key * 3;
                }

                if (this.state.player_stats[1].players[i].statistics[0].passes.accuracy) {
                    var temp = Number(this.state.player_stats[1].players[i].statistics[0].passes.accuracy);
                    GkPoints = GkPoints + Math.floor((temp / 5));
                }

                if (this.state.player_stats[1].players[i].statistics[0].tackles.total) {
                    GkPoints += this.state.player_stats[1].players[i].statistics[0].tackles.total * 4;
                }

                if (this.state.player_stats[1].players[i].statistics[0].tackles.interceptions) {
                    GkPoints += this.state.player_stats[1].players[i].statistics[0].tackles.interceptions * 4;
                }

                if (this.state.player_stats[1].players[i].statistics[0].goals.saves) {
                    GkPoints += this.state.player_stats[1].players[i].statistics[0].goals.saves * 6;
                }

                if (this.state.player_stats[1].players[i].statistics[0].penalty.saved) {
                    GkPoints += this.state.player_stats[1].players[i].statistics[0].penalty.saved * 50;
                }


                if (this.state.player_stats[1].players[i].statistics[0].goals.conceded === 0) {
                    GkPoints += 20;
                }

                if (this.state.player_stats[1].players[i].statistics[0].games.minutes > 0 && !this.state.player_stats[1].players[i].statistics[0].games.substitute) {
                    GkPoints += 4;
                }

                if (this.state.player_stats[1].players[i].statistics[0].games.substitute) {
                    GkPoints += 2;
                }

                if (this.state.player_stats[1].players[i].statistics[0].cards.yellow === 1) {
                    GkPoints -= 4;
                }

                if (this.state.player_stats[1].players[i].statistics[0].cards.red === 1) {
                    GkPoints -= 10;
                }

                if (this.state.player_stats[1].players[i].statistics[0].goals.conceded) {
                    GkPoints -= 2 * this.state.player_stats[1].players[i].statistics[0].goals.conceded;
                }

                if (this.state.player_stats[1].players[i].statistics[0].penalty.missed) {
                    GkPoints -= this.state.player_stats[1].players[i].statistics[0].penalty.missed * 20;
                }

                if (this.state.player_stats[1].players[i].player.id === this.props.captain) {
                    GkPoints *= 2;
                }
                if (this.state.player_stats[1].players[i].player.id === this.props.vice_captain) {
                    GkPoints *= 1.5;
                }


            }
        }
        // console.log("gk pts");
        // console.log(GkPoints);   
    }

    calculateDefPoints = (Defender) => {

        for (let k = 0; k < Defender.length; k++) {
            var DefPoints = 0;

            for (let i = 0; i < this.state.player_stats[0].players.length; i++) {
                if (this.state.player_stats[0].players[i].player.id === Defender[k].player.id) {
                    if (this.state.player_stats[0].players[i].statistics[0].goals.total) {
                        DefPoints += this.state.player_stats[0].players[i].statistics[0].goals.total * 60;
                    }

                    if (this.state.player_stats[0].players[i].statistics[0].goals.assists) {
                        DefPoints += this.state.player_stats[0].players[i].statistics[0].goals.assists * 20;
                    }

                    if (this.state.player_stats[0].players[i].statistics[0].shots.on) {
                        DefPoints += this.state.player_stats[0].players[i].statistics[0].shots.on * 20;
                    }

                    if (this.state.player_stats[0].players[i].statistics[0].passes.key) {
                        DefPoints += this.state.player_stats[0].players[i].statistics[0].passes.key * 3;
                    }

                    if (this.state.player_stats[0].players[i].statistics[0].tackles.total) {
                        DefPoints += this.state.player_stats[0].players[i].statistics[0].tackles.total * 4;
                    }

                    if (this.state.player_stats[0].players[i].statistics[0].passes.accuracy) {
                        var temp = Number(this.state.player_stats[0].players[i].statistics[0].passes.accuracy);
                        DefPoints = DefPoints + Math.floor((temp / 5));
                    }

                    if (this.state.player_stats[0].players[i].statistics[0].tackles.interceptions) {
                        DefPoints += this.state.player_stats[0].players[i].statistics[0].tackles.interceptions * 4;
                    }

                    if (this.state.player_stats[0].players[i].statistics[0].goals.saves) {
                        DefPoints += this.state.player_stats[0].players[i].statistics[0].goals.saves * 6;
                    }

                    if (this.state.player_stats[0].players[i].statistics[0].penalty.saved) {
                        DefPoints += this.state.player_stats[0].players[i].statistics[0].penalty.saved * 50;
                    }

                    if (this.state.player_stats[0].players[i].statistics[0].games.minutes > 0 && !this.state.player_stats[0].players[i].statistics[0].games.substitute) {
                        DefPoints += 4;
                    }

                    if (this.state.player_stats[0].players[i].statistics[0].games.substitute) {
                        DefPoints += 2;
                    }

                    if (this.state.player_stats[0].players[i].statistics[0].cards.yellow === 1) {
                        DefPoints -= 4;
                    }

                    if (this.state.player_stats[0].players[i].statistics[0].cards.red === 1) {
                        DefPoints -= 10;
                    }

                    if (this.state.player_stats[0].players[i].statistics[0].goals.conceded) {
                        DefPoints -= 2 * this.state.player_stats[0].players[i].statistics[0].goals.conceded;
                    }

                    if (this.state.player_stats[0].players[i].statistics[0].penalty.missed) {
                        DefPoints -= this.state.player_stats[0].players[i].statistics[0].penalty.missed * 20;
                    }

                    if (this.state.player_stats[0].players[i].player.id === this.props.captain) {
                        DefPoints *= 2;
                    }
                    if (this.state.player_stats[0].players[i].player.id === this.props.vice_captain) {
                        DefPoints *= 1.5;
                    }


                }


            }

            for (let i = 0; i < this.state.player_stats[1].players.length; i++) {
                if (this.state.player_stats[1].players[i].player.id === Defender[k].player.id) {
                    if (this.state.player_stats[1].players[i].statistics[0].goals.total) {
                        DefPoints += this.state.player_stats[1].players[i].statistics[0].goals.total * 60;
                       // console.log(DefPoints)
                    }

                    if (this.state.player_stats[1].players[i].statistics[0].goals.assists) {
                        DefPoints += this.state.player_stats[1].players[i].statistics[0].goals.assists * 20;
                       // console.log(DefPoints)
                    }

                    if (this.state.player_stats[1].players[i].statistics[0].shots.on) {
                        DefPoints += this.state.player_stats[1].players[i].statistics[0].shots.on * 20;
                       // console.log(DefPoints)
                    }

                    if (this.state.player_stats[1].players[i].statistics[0].passes.key) {
                        DefPoints += this.state.player_stats[1].players[i].statistics[0].passes.key * 3;
                       // console.log(DefPoints)
                    }

                    if (this.state.player_stats[1].players[i].statistics[0].passes.accuracy) {
                        var temp = Number(this.state.player_stats[1].players[i].statistics[0].passes.accuracy);
                        DefPoints = DefPoints + Math.floor((temp / 5));
                       // console.log(DefPoints)
                    }

                    if (this.state.player_stats[1].players[i].statistics[0].tackles.total) {
                        DefPoints += this.state.player_stats[1].players[i].statistics[0].tackles.total * 4;
                       // console.log(DefPoints)
                       // console.log('tack')
                    }

                    if (this.state.player_stats[1].players[i].statistics[0].tackles.interceptions) {
                        DefPoints += this.state.player_stats[1].players[i].statistics[0].tackles.interceptions * 4;
                      //  console.log(DefPoints)
                    }

                    if (this.state.player_stats[1].players[i].statistics[0].goals.saves) {
                        DefPoints += this.state.player_stats[1].players[i].statistics[0].goals.saves * 6;
                       // console.log(DefPoints)
                    }

                    if (this.state.player_stats[1].players[i].statistics[0].penalty.saved) {
                        DefPoints += this.state.player_stats[1].players[i].statistics[0].penalty.saved * 50;
                       // console.log(DefPoints)
                    }


                    if (this.state.player_stats[1].players[i].statistics[0].games.minutes > 0 && !this.state.player_stats[1].players[i].statistics[0].games.substitute) {
                        DefPoints += 4;
                       // console.log(DefPoints)
                       // console.log('start');
                    }

                    if (this.state.player_stats[1].players[i].statistics[0].games.substitute) {
                        DefPoints += 2;
                       // console.log(DefPoints)
                       // console.log("sub")
                    }

                    if (this.state.player_stats[1].players[i].statistics[0].cards.yellow === 1) {
                        DefPoints -= 4;
                       // console.log(DefPoints)
                       // console.log("yell")
                    }

                    if (this.state.player_stats[1].players[i].statistics[0].cards.red === 1) {
                        DefPoints -= 10;
                       // console.log(DefPoints)
                       // console.log("red")
                    }

                    // not working for defenders

                    if (this.state.player_stats[1].players[i].statistics[0].goals.conceded) {
                        DefPoints -= 2 * this.state.player_stats[1].players[i].statistics[0].goals.conceded;
                       // console.log(DefPoints)
                       // console.log("conceade")
                    }

                    if (this.state.player_stats[1].players[i].statistics[0].penalty.missed) {
                        DefPoints -= this.state.player_stats[1].players[i].statistics[0].penalty.missed * 20;
                       // console.log(DefPoints)
                       // console.log("pen miss")
                    }

                    if (this.state.player_stats[1].players[i].player.id === this.props.captain) {
                        DefPoints *= 2;
                       // console.log(DefPoints)
                       // console.log("capt")
                    }
                    if (this.state.player_stats[1].players[i].player.id === this.props.vice_captain) {
                        DefPoints *= 1.5;
                       // console.log(DefPoints)
                       // console.log("vc")
                    }


                }
            }

            console.log("def pts");
            console.log(DefPoints);
        }

    }

    render() {
        console.log(this.state.player_stats);
        return (
            <Col className='pitch-started'>
                <Container>
                    <Row className='justify-content-center'>
                        {
                            this.props.Goalkeeper.map((member, key) => (

                                <PlayerCardPitchStarted
                                    id={member.player.id}
                                    first_name={member.player.firstname}
                                    last_name={member.player.lastname}
                                    imageUrl={member.player.photo}
                                    key={key}
                                    position={member.statistics[0].games.position}
                                />

                            ))
                        }
                    </Row>
                    <Row className='justify-content-center'>{
                        this.props.Defender.map((member, key) => (

                            <PlayerCardPitchStarted
                                id={member.player.id}
                                first_name={member.player.firstname}
                                last_name={member.player.lastname}
                                imageUrl={member.player.photo}
                                key={key}
                                position={member.statistics[0].games.position}
                            />

                        ))
                    }
                    </Row>
                    <Row className='justify-content-center'>
                        {
                            this.props.Midfielder.map((member, key) => (

                                <PlayerCardPitchStarted
                                    id={member.player.id}
                                    first_name={member.player.firstname}
                                    last_name={member.player.lastname}
                                    imageUrl={member.player.photo}
                                    key={key}
                                    position={member.statistics[0].games.position}
                                />

                            ))
                        }
                    </Row>
                    <Row className='justify-content-center'>{
                        this.props.Attacker.map((member, key) => (

                            <PlayerCardPitchStarted
                                id={member.player.id}
                                first_name={member.player.firstname}
                                last_name={member.player.lastname}
                                imageUrl={member.player.photo}
                                key={key}
                                position={member.statistics[0].games.position}
                            />

                        ))
                    }</Row>
                </Container>
            </Col>
        )
    }
}

export default MatchStarted;