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
    <th>red-cards</th>
    <th>dribbles</th>
    <th>fouls</th>
    <th>games</th>
    <th>goals saved</th>
    <th>passes</th>
    <th>shots</th>
  </tr>
  <tr>
    <td>{this.state.player.statistics[0].cards.red}</td>
    <td>{this.state.player.statistics[0].dribbles.attemts}</td>
    <td>{this.state.player.statistics[0].fouls.commited}</td>
    <td>{this.state.player.statistics[0].games.appearences}</td>
    <td>{this.state.player.statistics[0].goals.saved}</td>
    <td>{this.state.player.statistics[0].passes.total}</td>
    <td>{this.state.player.statistics[0].shots.total}</td>
</tr>
</table>
<h4>league cup</h4>

<table id="basic_info">
  <tr>
    <th>red-cards</th>
    <th>dribbles</th>
    <th>fouls</th>
    <th>games</th>
    <th>goals saved</th>
    <th>passes</th>
    <th>shots</th>
  </tr>
  <tr>
    <td>{this.state.player.statistics[1].cards.red}</td>
    <td>{this.state.player.statistics[1].dribbles.attemts}</td>
    <td>{this.state.player.statistics[1].fouls.commited}</td>
    <td>{this.state.player.statistics[1].games.appearences}</td>
    <td>{this.state.player.statistics[1].goals.saved}</td>
    <td>{this.state.player.statistics[1].passes.total}</td>
    <td>{this.state.player.statistics[1].shots.total}</td>
</tr>
</table>

<h4>FA cup</h4>

<table id="basic_info">
  <tr>
    <th>red-cards</th>
    <th>dribbles</th>
    <th>fouls</th>
    <th>games</th>
    <th>goals saved</th>
    <th>passes</th>
    <th>shots</th>
  </tr>
  <tr>
    <td>{this.state.player.statistics[2].cards.red}</td>
    <td>{this.state.player.statistics[2].dribbles.attemts}</td>
    <td>{this.state.player.statistics[2].fouls.commited}</td>
    <td>{this.state.player.statistics[2].games.appearences}</td>
    <td>{this.state.player.statistics[2].goals.saved}</td>
    <td>{this.state.player.statistics[2].passes.total}</td>
    <td>{this.state.player.statistics[2].shots.total}</td>
</tr>
</table>

            </Container></div>
        );
    }
}

export default PlayerDetails;