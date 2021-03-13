import React from 'react'
import PlayerCard from '../../components/player-card/player-card.component';
import SelectedTeam from '../../components/selected-team/selected-team.component';
import Squad from '../../components/squad/squad.component';
import { squad_data } from '../../components/squad/squad_data';
import {Button, Container, Row, Col} from 'react-bootstrap'
import './select-team.styles.scss'
import {Link} from 'react-router-dom'
import PlayerCardPitch from '../../components/player-card-pitch/player-card-pitch.component';
import ShowCVc from '../../components/show-cvc/show-cvc.component';


class SelectTeamPage extends React.Component{
    constructor(props)
    {
        super(props);

        this.state={
            
            team_selected: [],
            home_team: [],
            away_team: [],
            home_no: 0,
            away_no: 0,
            Goalkeeper: 0,
            Defender: 0,
            Midfielder: 0,
            Attacker: 0,
            showCaptain:false


        }


    }

    filterPlayers = (player)=>{
        // console.log(player.statistics[0].games.lineups);
        return player.statistics[0].games.lineups!==0;
    }

    async componentDidMount()
    {
        // ==================== home team =========================

        const requestOptions = {
            method: 'GET',
            headers: { 'x-rapidapi-host': 'v3.football.api-sports.io' ,
                    'x-rapidapi-key': '718b15b972a3bc571a36b512a7bf94c6'},
        };


       
       var homeId = this.props.match.params.homeId;
       var awayId = this.props.match.params.awayId;
       var matchId = this.props.match.params.matchId;

        // //put fixture id and team id for reference team
    //     var home_data = [];
    //     var pages;
    //    await fetch(`https://v3.football.api-sports.io/players?team=${homeId}&season=2020&page=1`, requestOptions)
    //     .then(response => response.json())
    //     .then((data)=>{
    //         home_data = data.response;
    //         pages = data.paging.total;
           
    //     })

    //     for(var i=2; i<=pages; i++){
    //         await fetch(`https://v3.football.api-sports.io/players?team=${homeId}&season=2020&page=${i}`, requestOptions)
    //             .then(response => response.json())
    //             .then((data)=>{
    //                 home_data = home_data.concat(data.response);
                    
                
    //             })
    //     }

    //     // //filter players who have not played a match yet

    //     home_data = home_data.filter(this.filterPlayers);

    //     this.setState({home_team: home_data});

    //     console.log(this.state.home_team);

    //     // ==================== away team =========================



    //     // put fixture id and team id for reference team
    //     var away_data = [];
        
    //    await fetch(`https://v3.football.api-sports.io/players?team=${awayId}&season=2020&page=1`, requestOptions)
    //     .then(response => response.json())
    //     .then((data)=>{
    //         away_data = data.response;
    //         pages = data.paging.total;
           
    //     })

    //     for(var i=2; i<=pages; i++){
    //         await fetch(`https://v3.football.api-sports.io/players?team=${awayId}&season=2020&page=${i}`, requestOptions)
    //             .then(response => response.json())
    //             .then((data)=>{
    //                 away_data = away_data.concat(data.response);
                    
                
    //             })
    //     }

    //     // filter players who have not played a match yet

    //     away_data = away_data.filter(this.filterPlayers);

    //     this.setState({away_team: away_data});
        

    //     console.log(this.state.away_team);
    //     home_data = home_data.concat(away_data);

    //     this.setState({home_team: home_data}) 
         this.setState({home_team: squad_data})
        
    }

    showCvc=()=>{
        if(this.state.team_selected.length<11) {
            window.alert("select 11 players");
            return
        }

        this.setState({showCaptain: !this.state.showCaptain})
    }
     
    removePlayer=async(member)=>{

        var position = member.statistics[0].games.position;

        await this.setState({
            team_selected: this.state.team_selected.filter(el => el !== member)})
            var team_new = this.state.home_team.concat(member);
        await this.setState({home_team: team_new, [position]:this.state.[position] - 1});
    }

    selectPlayer= async(member)=>{

        var position = member.statistics[0].games.position;

        if(position === "Goalkeeper" && this.state.Goalkeeper> 0)
        {
            window.alert("you cant select more than 1 Goalkeeper");
            return;
        }

        if(position === "Midfielder" && this.state.Midfielder === 5)
        {
            window.alert("you cant select more than 5 Midfielders");
            return;
        }

        if(position === "Defender" && this.state.Defender === 5)
        {
            window.alert("you cant select more than 5 Defenders");
            return;
        }

        if(position === "Attacker" && this.state.Attacker === 3)
        {
            window.alert("you cant select more than 3 Attackers");
            return;
        }

        if(this.state.team_selected.length >= 11) {
            window.alert("you cant select more than 11 players");
            return;
        }

        await this.setState({
            home_team: this.state.home_team.filter(el => el !== member)})
        
         console.log(this.state);
         var team_new = this.state.team_selected.concat(member);

         

        await this.setState({team_selected: team_new, [position]:this.state.[position] + 1  });
         

        console.log(this.state)
    }

    render(){
        console.log(this.state);
        //console.log( this.props )

        if(!this.state.showCaptain)
        {return(
            <Container>
                <Row>
                {this.state.home_team?(
                    <Col className='player-cards'>
                    
                    {
                        
                            this.state.home_team.map((member, key)=>(
                                
                                <button className="player-button" onClick={() => { this.selectPlayer(member)}}>
                                <PlayerCard 
                                id={member.player.id}
                                name={member.player.name}
                                imageUrl={member.player.photo}
                                key={key}
                                    
                                />
                                </button>
                             
                        ))
                    }
                
                </Col>):(<h1>wait</h1>)
                
            }
                <Col className='pitch'>
                    {
                        this.state.team_selected.map((member, key)=>(
                            <button className="player-button" onClick={() => { this.removePlayer(member)}}>
                            <PlayerCardPitch 
                               id={member.player.id}
                               name={member.player.name}
                               imageUrl={member.player.photo}
                               key={key}
                                
                            />
                            </button>
                        ))
                    }
                </Col>
            </Row>   
                <Row>
                
                    <Button variant='success' onClick={() => { this.showCvc()}}>Choose your Commanders!!</Button>
                
                </Row> 
            </Container>
            
            )}

        else{
            return(<Container>
                <Row>
                    <Col>
                        {
                            this.state.team_selected.map((member, key)=>(
                                <Row>
                                    <ShowCVc
                                        id={member.player.id}
                                        name={member.player.name}
                                        imageUrl={member.player.photo}
                                        key={key}
                                    />
                                </Row>
                            ))
                        }
                    </Col>
                </Row>
            </Container>)
        }
    }

}

export default SelectTeamPage;







