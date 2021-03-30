import React from 'react'
import './home-page.styles.scss'
import Web3 from 'web3'
import {Container, Row, Col} from 'react-bootstrap'



class HomePage extends React.Component{
   

    constructor(props) {
        super(props)
        this.state = {
         
          account: '',
          //set states
        }
    
        //Bind functions
      }

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
       


          
      }
    
    
    
    
    render()
   {
    if(this.state.account){
      localStorage.setItem('user', this.state.account);
      console.log("user set");
    }
    return( 

      
        <div>
          <div id='head'>
<h1 className='heading'>Welcome to BetChain !</h1>
</div>
    <div id="landing-header">
      {/* { <Container>
      <h1 className='heading'>Welcome to BetChain !</h1>
      </Container> } */}

      <Container>
      <h3 className='maintext'>Introducing the first blockchain based fantasy league  </h3>
      <h3 className='maintext'>create your own team battle against others </h3>
      <h3 className='maintext'>and keep winning </h3>
      <h3 className='maintext'>make your team now!!!!! </h3>
      </Container>
 		
		<a href="/campgrounds" class="btn btn-lg btn-success">Choose Your Battles!!</a>
    </div>
    
    
    <ul class="slideshow">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
        </div>)}
}

export default HomePage;