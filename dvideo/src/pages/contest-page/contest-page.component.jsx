import React from 'react';
import ContestTile from '../../components/contest-tile/contest-tile.component';
import './contest-page.styles.scss'
import {Link} from 'react-router-dom'

class ContestPage extends React.Component{
    constructor(props)
    {
        super(props);

        this.state={
            fixture_data: null
        }
    }

    componentDidMount(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var dd2 = String(today.getDate()+7).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

       var from = yyyy + '-' + mm + '-' + dd;

       var to = yyyy + '-' + mm + '-' + dd2;
        
        const requestOptions = {
            method: 'GET',
            headers: { 'x-rapidapi-host': 'v3.football.api-sports.io' ,
                    'x-rapidapi-key': '718b15b972a3bc571a36b512a7bf94c6'},
        };

        fetch(`https://v3.football.api-sports.io/fixtures?league=39&season=2020&from=${from}&to=${to}` , requestOptions)
        .then(response => response.json())
        .then((data)=>{
            this.setState({fixture_data: data.response});
           // console.log(this.state.fixture_data)
        })
    }

    render()
    {
        console.log(this.state);
        return(
            //<h1>hi</h1>
            this.state.fixture_data?(
            <div className="tiles">
                {
                    this.state.fixture_data.map((card_data, key)=>
                        (
                        <Link to={`/select-team/${card_data.fixture.id}/${card_data.teams.home.id}/${card_data.teams.away.id}`}>
                            <ContestTile key={key} id={card_data.fixture.id} 
                            home_name={card_data.teams.home.name} 
                            away_name={card_data.teams.away.name}
                            home_logo={card_data.teams.home.logo}
                            away_logo={card_data.teams.away.logo}/>
                        </Link>
                        )
                    )
                }
            </div>):(<h1>wait</h1>)
        )
    }
}

export default ContestPage