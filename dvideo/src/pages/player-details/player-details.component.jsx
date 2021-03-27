import React from 'react'
import { squad_data } from '../../components/squad/squad_data';

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
               {console.log(this.state.player.statistics)}
            </div>
        );
    }
}

export default PlayerDetails;