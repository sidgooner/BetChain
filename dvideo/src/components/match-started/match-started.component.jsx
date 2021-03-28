import React from 'react'
import PlayerCardPitchStarted from '../player-card-pitch-match-started/player-card-pitch-match-started.component';
import {Button, Container, Row, Col} from 'react-bootstrap'
import './match-started.styles.scss'

class MatchStarted extends React.Component{
    constructor(props)
    {
        super(props);

        this.state={
            player_stats: null
        }
    }

    componentDidMount(){
        
        const requestOptions = {
            method: 'GET',
            headers: { 'x-rapidapi-host': 'v3.football.api-sports.io' ,
                    'x-rapidapi-key': '718b15b972a3bc571a36b512a7bf94c6'},
        };


        // var player_stats = [];
                
        //  await fetch(`https://v3.football.api-sports.io/fixtures/players?id=${this.props.matchId}`, requestOptions)
        //   .then(response => response.json())
        //   .then((data)=>{
        //       player_stats = data.response;
        //   });

        //   this.setState({player_stats: player_stats});


    }


    calculatePoints=(playerInTeam)=>{

        var Goalkeeper_pts=0, Midfielder_pts=0, Defender_pts=0, Attacker_pts=0; 




    }

    render(){
        return (
            <Col className='pitch-started'>
                    <Container>
                        <Row className='justify-content-center'>
                    {
                        this.props.Goalkeeper.map((member, key)=>(
                            
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
                        this.props.Defender.map((member, key)=>(
                            
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
                        this.props.Midfielder.map((member, key)=>(
                            
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
                        this.props.Attacker.map((member, key)=>(
                            
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