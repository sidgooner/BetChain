import React from 'react'
import Betting from '../../abis/Betting.json'
import {Container, Row, Col, Card, Button, Form} from 'react-bootstrap'

import Web3 from 'web3'
import ContestPage from '../contest-page/contest-page.component'
import TeamCard from '../../components/team-card/team-card.component'

class PaymentPage extends React.Component{

   

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
      }
    
      async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      }
    
      async loadBlockchainData() {
        const web3 = window.web3
        //Load accounts
        //Add first account the the state
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        this.setState({account: accounts[0]});
        //Get network ID
        //Get network data
        const networkId = await web3.eth.net.getId();
        const networkData = Betting.networks[networkId]; 
        if(networkData)
        {
          const betting = new web3.eth.Contract(Betting.abi, networkData.address)
          console.log(betting);
          this.setState({ betting });
          console.log(this.state)
        }
        else{
          window.alert("contract not deployed");
        }
          
      }
    
        // getTeam1Amount=async()=>{
        //   const team1Amount =await this.state.betting.methods.AmountOne().call({from: this.state.account});
        //   const team1AmountNum = team1Amount.toNumber()/1000000000000000000;
        //   window.alert("The amount is " + team1AmountNum );
        //   }
    
        // getTeam2Amount=async()=>{
        //   const team2Amount =await this.state.betting.methods.AmountTwo().call();
        //   const team2AmountNum = team2Amount.toNumber();
        //   window.alert("The amount is " + team2AmountNum );
        //   } 
          
        betOnTeam=async(team, amount)=>{
            amount = amount*1000000000000000000;
            await this.state.betting.methods.doBet().send({from: localStorage.getItem('user'), value: amount});
            window.alert("Your bet is placed");
        }    
        
        decideWinner=async()=>{
          await this.state.betting.methods.chooseWinner(localStorage.getItem('user')).send({from: this.state.account});
          window.alert("winner set");
        }
        distribute=async()=>{
          
          // console.log(event);
          await this.state.betting.methods.distribute(localStorage.getItem('user')).send({from: localStorage.getItem('user')});
          window.alert("ok");
        }
    
        handleChange=(event)=>{
          const {value, name} = event.target;
          //csadsda  console.log(event.target);
    
            this.setState({[name]: value})
        }
      constructor(props) {
        super(props)
        this.state = {
          loading: false,
          account: '',
          betting: null, 
          winner: null
          //set states
        }
    
        //Bind functions
      }
    
      render() {
        return (
          <div className="page">
            
              
            {/* {<div className="grid-container">
              <div className="team">
                <TeamCard teamName = "India" 
                teamid={1}
                betOnTeam={this.betOnTeam}
                team1Amount={this.getTeam1Amount} 
                imageUrl="https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Cricket_India_Crest.svg/1200px-Cricket_India_Crest.svg.png "/>
              </div>
              <div className="vs-sign">
                <img className="vs-logo" src="https://thumbs.dreamstime.com/b/vs-versus-icon-isolated-confrontation-symbol-game-concept-letter-sign-choise-vs-versus-icon-isolated-confrontation-symbol-166196291.jpg"/>
              </div>
              <div className="team">
                <TeamCard teamName = "Australia" 
                teamid={2}
                betOnTeam={this.betOnTeam}
                team2Amount={this.getTeam2Amount} 
                imageUrl="https://vignette.wikia.nocookie.net/logopedia/images/b/b0/CricketAustralia.png/revision/latest?cb=20160315134728 "/>
              </div>
            </div>  
            <div className= "buttons">
              <form onSubmit={this.distribute}>
              <input placeholder="enter winner" name="winner" onChange={this.handleChange} type="number"></input>  
              <button type="submit">Distribute</button>
              </form>
            </div>} */}
            <Container>
              <Row>
                <h3>5 eth Contest</h3>
                <p>Your accout will be debited with 5 eth</p>
                <Button variant='success' onClick={() => { this.betOnTeam(localStorage.getItem('user'), 5) }}>bet</Button>
                <Button variant='success' onClick={() => { this.distribute() }}>ditribute</Button>
              </Row>
            </Container>
            
          </div>
        );
      }
}

export default PaymentPage
