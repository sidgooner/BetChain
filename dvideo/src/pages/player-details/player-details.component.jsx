import React from 'react'
import { squad_data } from '../../components/squad/squad_data';
import {Container} from 'react-bootstrap'
import './player-details.styles.scss'

class PlayerDetails extends React.Component{
    constructor(props)
    {
        super(props);

        this.state={
            player: squad_data[1]
        }
    }

    componentDidMount(){
        this.setState({player: squad_data[1]})
    }

    render(){

        console.log(this.state);
        return(
            
           <div>
            <h1 className="heading">Player-Details</h1>

            <Container>
        <img src={this.state.player.player.photo}  class="center"/>
            <h3>Basic information</h3>

<table id="basic_info">
  <tr>
    <th>Name</th>
    <th>Age</th>
    <th>Country</th>
    <th>Id</th>
    <th>Height</th>
    <th>Weight</th>
    <th>Injured</th>
  </tr>
  <tr>
    <td>{this.state.player.player.name}</td>
    <td>{this.state.player.player.age}</td>
    <td>{this.state.player.player.nationality}</td>
    <td>{this.state.player.player.id}</td>
    <td>{this.state.player.player.height}</td>
    <td>{this.state.player.player.weight}</td>
     <td>{this.state.player.player.injured}</td>

  </tr>


</table>

 <h3>Performance details</h3>
<h4>Premier league</h4>
<table id="basic_info">
  <tr>
    <th>position</th>
    <th>appearences</th>
    <th>red-card</th>
    <th>yellow-card</th>
    <th>goals-saved</th>
    <th>goals-scored</th>
    <th>assists</th>
  </tr>
  <tr>
    <td>{this.state.player.statistics[0].games.position}</td>
    <td>{this.state.player.statistics[0].games.appearences}</td>
    <td>{this.state.player.statistics[0].cards.red}</td>
    <td>{this.state.player.statistics[0].cards.yellow}</td>
    <td>{this.state.player.statistics[0].goals.saves}</td>
    <td>{this.state.player.statistics[0].goals.conceded}</td>
    <td>{this.state.player.statistics[0].goals.assists}</td>
</tr>
</table>
<h4>league cup</h4>

<table id="basic_info">
<tr>
    <th>position</th>
    <th>appearences</th>
    <th>red-card</th>
    <th>yellow-card</th>
    <th>goals-saved</th>
    <th>goals-scored</th>
    <th>assists</th>
  </tr>
  <tr>
    <td>{this.state.player.statistics[1].games.position}</td>
    <td>{this.state.player.statistics[1].games.appearences}</td>
    <td>{this.state.player.statistics[1].cards.red}</td>
    <td>{this.state.player.statistics[1].cards.yellow}</td>
    <td>{this.state.player.statistics[1].goals.saves}</td>
    <td>{this.state.player.statistics[1].goals.conceded}</td>
    <td>{this.state.player.statistics[1].goals.assists}</td>
</tr>
</table>

<h4>FA cup</h4>

<table id="basic_info">
<tr>
    <th>position</th>
    <th>appearences</th>
    <th>red-card</th>
    <th>yellow-card</th>
    <th>goals-saved</th>
    <th>goals-scored</th>
    <th>assists</th>
  </tr>
  <tr>
    <td>{this.state.player.statistics[2].games.position}</td>
    <td>{this.state.player.statistics[2].games.appearences}</td>
    <td>{this.state.player.statistics[2].cards.red}</td>
    <td>{this.state.player.statistics[2].cards.yellow}</td>
    <td>{this.state.player.statistics[2].goals.saves}</td>
    <td>{this.state.player.statistics[2].goals.conceded}</td>
    <td>{this.state.player.statistics[2].goals.assists}</td>
</tr>
</table>

            </Container></div>
        );
    }
}

export default PlayerDetails;