import React from 'react'
import { squad_data } from '../../components/squad/squad_data';

import './player-details.styles.scss'

class PlayerDetails extends React.Component{
    constructor(props)
    {
        super(props);

        this.state={
            player: null
        }
    }

    componentDidMount(){
        this.setState({player: squad_data[1]})
    }

    render(){

        console.log(this.state);
        return(
            <div>
                player details
            </div>
        );
    }
}

export default PlayerDetails;