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
            Goalkeeper: [],
            Defender: [],
            Midfielder: [],
            Attacker: [],
            showCaptain:false,
            captain:0,
            vice_captain:0


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

    selectCaptain=(player_id)=>{
        this.setState({captain: player_id});
    }

    selectViceCaptain=(player_id)=>{
        this.setState({vice_captain: player_id});
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
        await this.setState({home_team: team_new, [position]:this.state.[position].filter(el => el !== member)});
    }

    selectPlayer= async(member)=>{

        var position = member.statistics[0].games.position;

        if(position === "Goalkeeper" && this.state.Goalkeeper.length> 0)
        {
            window.alert("you cant select more than 1 Goalkeeper");
            return;
        }

        if(position === "Midfielder" && this.state.Midfielder.length === 5)
        {
            window.alert("you cant select more than 5 Midfielders");
            return;
        }

        if(position === "Defender" && this.state.Defender.length === 5)
        {
            window.alert("you cant select more than 5 Defenders");
            return;
        }

        if(position === "Attacker" && this.state.Attacker.length === 3)
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
        
        // console.log(this.state);
         var team_new = this.state.team_selected.concat(member);

         

        await this.setState({team_selected: team_new, [position]:this.state.[position].concat(member)  });
         

       // console.log(this.state)
    }

    selectTeam=()=>{
        
        if(!this.state.captain || !this.state.vice_captain){
            window.alert("Select your captain and vice captain");
        }

        else{
            // const res = await fetch('http://localhost:1337/api/select-team',{
            //     method: 'post',
                
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         displayName, email, password
            //     })
            // }).then((t)=>t.json())

            //  console.log(res);
            
            //  if(res.status==="err") {
            //      window.alert(res.message);
            //  }
        }
    }

    render(){
        console.log(this.state);
        //console.log( this.props )
        console.log(localStorage.getItem('user'));
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
                                 position={member.statistics[0].games.position}   
                                />
                                </button>
                             
                        ))
                    }
                
                </Col>):(<h1>wait</h1>)
                
            }
                <Col className='pitch'>
                    {/* {
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
                    } */}
                    <Container>
                        <Row className='justify-content-center'>
                        {
                        this.state.Goalkeeper.map((member, key)=>(
                            <button className="player-button" onClick={() => { this.removePlayer(member)}}>
                            <PlayerCardPitch 
                               id={member.player.id}
                               first_name={member.player.firstname}
                               last_name={member.player.lastname}
                               imageUrl={member.player.photo}
                               key={key}
                               position={member.statistics[0].games.position} 
                            />
                            </button>
                        ))
                    }
                        </Row>
                        <Row className='justify-content-center'>{
                        this.state.Defender.map((member, key)=>(
                            <button className="player-button" onClick={() => { this.removePlayer(member)}}>
                            <PlayerCardPitch 
                               id={member.player.id}
                               first_name={member.player.firstname}
                               last_name={member.player.lastname}
                               imageUrl={member.player.photo}
                               key={key}
                               position={member.statistics[0].games.position} 
                            />
                            </button>
                        ))
                    }
                    </Row>
                    <Row className='justify-content-center'>
                            {
                        this.state.Midfielder.map((member, key)=>(
                            <button className="player-button" onClick={() => { this.removePlayer(member)}}>
                            <PlayerCardPitch 
                               id={member.player.id}
                               first_name={member.player.firstname}
                               last_name={member.player.lastname}
                               imageUrl={member.player.photo}
                               key={key}
                                position={member.statistics[0].games.position}
                            />
                            </button>
                        ))
                             }
                    </Row>
                        <Row className='justify-content-center'>{
                        this.state.Attacker.map((member, key)=>(
                            <button className="player-button" onClick={() => { this.removePlayer(member)}}>
                            <PlayerCardPitch 
                               id={member.player.id}
                               first_name={member.player.firstname}
                               last_name={member.player.lastname}
                               imageUrl={member.player.photo}
                               key={key}
                               position={member.statistics[0].games.position} 
                            />
                            </button>
                        ))
                    }</Row>
                    </Container>
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
                                        position={member.statistics[0].games.position}
                                        key={key}
                                        selectCaptain={this.selectCaptain}
                                        selectViceCaptain={this.selectViceCaptain}
                                        captain={this.state.captain}
                                        viceCaptain={this.state.vice_captain}
                                    />
                                </Row>
                            ))
                        }
                        <Row>
                            <Button variant='success' onClick={() => { this.selectTeam()}}>Select Team!</Button>
                        </Row>
                    </Col>
                </Row>
            </Container>)
        }
    }

}

export default SelectTeamPage;







