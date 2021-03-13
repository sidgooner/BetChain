import React from 'react';
import './team-card.styles.scss'
class TeamCard extends React.Component{
    constructor(props){
        super(props);

        this.state={
            amount: 0
        }
    }

    handleChange=(event)=>{
        const {value, name} = event.target;
      //csadsda  console.log(event.target);

        this.setState({[name]: value})
    }

    handleSubmit=async(event)=>{
        event.preventDefault();
        // console.log(this.state)

       await this.props.betOnTeam(this.props.teamid, this.state.amount);

       this.setState({amount:0});
    }

    

    render(){
        return(
            <div className='team-card'>
                <h1 className='title'>{this.props.teamName}</h1>
                <img  className='logo' src={this.props.imageUrl} />
                
                <form onSubmit={this.handleSubmit}>
                    <input type="number" name= "amount" value={this.state.amount} onChange  ={this.handleChange}/>
                    <button type= 'submit' className='submit'>Make a Bet!</button>
                </form>

                <button onClick={this.props.team1Amount}>team Amount</button>
            </div>

        )
    }
}

export default TeamCard;