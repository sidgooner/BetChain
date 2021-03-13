import React from 'react';
import PlayerCard from '../player-card/player-card.component';

import './squad.styles.scss'
import { squad_data } from './squad_data';


class Squad extends React.Component{
    constructor(props)
    {
        super(props);
    
        this.state={
            home_team: [],
            away_team: []
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

        // put fixture id and team id for reference team
    //     var home_data = [];
    //     var pages;
    //    await fetch("https://v3.football.api-sports.io/players?team=44&season=2020&page=1", requestOptions)
    //     .then(response => response.json())
    //     .then((data)=>{
    //         home_data = data.response;
    //         pages = data.paging.total;
           
    //     })

        // for(var i=2; i<=pages; i++){
        //     await fetch(`https://v3.football.api-sports.io/players?team=44&season=2020&page=${i}`, requestOptions)
        //         .then(response => response.json())
        //         .then((data)=>{
        //             home_data = home_data.concat(data.response);
                    
                
        //         })
        // }

        // filter players who have not played a match yet

        // home_data = home_data.filter(this.filterPlayers);

        // this.setState({home_team: home_data});

        // console.log(this.state.home_team);

        // ==================== away team =========================



        // put fixture id and team id for reference team
        var away_data = [];
        
    //    await fetch("https://v3.football.api-sports.io/players?team=42&season=2020&page=1", requestOptions)
    //     .then(response => response.json())
    //     .then((data)=>{
    //         away_data = data.response;
    //         pages = data.paging.total;
           
    //     })

        // for(var i=2; i<=pages; i++){
        //     await fetch(`https://v3.football.api-sports.io/players?team=42&season=2020&page=${i}`, requestOptions)
        //         .then(response => response.json())
        //         .then((data)=>{
        //             away_data = away_data.concat(data.response);
                    
                
        //         })
        // }

        // filter players who have not played a match yet

        // away_data = away_data.filter(this.filterPlayers);

        // this.setState({away_team: away_data});
        

        //console.log(this.state.away_team);
        // home_data = home_data.concat(away_data);

         this.setState({home_team: squad_data})
        
    }

    onClickHandle=async(member)=>{
         
        await this.setState({
            home_team: this.state.home_team.filter(el => el !== member)})
        
         console.log(this.state);
        await this.props.selectPlayer(member)
        

        
    }

    render()
    {
        console.log(this.state)
        return(
        <div className="select-team">
            {this.state.home_team?(
                <div className="player-cards">
                    {
                        this.state.home_team.map((member, key)=>(
                            <button className="player-button" onClick={() => { this.onClickHandle(member)}}>
                            <PlayerCard 
                               id={member.player.id}
                               name={member.player.name}
                               imageUrl={member.player.photo}
                               key={key}
                                
                            />
                            </button>
                        ))
                    }
                </div>):(<h1>wait</h1>)
            }
        </div> 
        )
    }


}


export default Squad;