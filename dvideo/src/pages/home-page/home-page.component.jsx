import React from 'react'
import './home-page.styles.scss'
import Web3 from 'web3'




class HomePage extends React.Component{
   

    constructor(props) {
        super(props)
        this.state = {
         
          account: '',
          //set states
        }
    
        //Bind functions
      }

    // async componentWillMount() {
    //     await this.loadWeb3()
    //     await this.loadBlockchainData()
    //   }
    
    //   async loadWeb3() {
    //     if (window.ethereum) {
    //       window.web3 = new Web3(window.ethereum)
    //       await window.ethereum.enable()
    //     }
    //     else if (window.web3) {
    //       window.web3 = new Web3(window.web3.currentProvider)
    //     }
    //     else {
    //       window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    //     }
    //   }

    //   async loadBlockchainData() {
    //     const web3 = window.web3
    //     //Load accounts
    //     //Add first account the the state
    //     const accounts = await web3.eth.getAccounts();
    //     console.log(accounts);
    //     this.setState({account: accounts[0]});
    //     //Get network ID
    //     //Get network data
       


          
     // }

    
    render()
   {
    return( 
        <div>
            <h1>HomePage {this.state.account}</h1>
            <button className="btn">hello</button>
        </div>)}
}

export default HomePage;