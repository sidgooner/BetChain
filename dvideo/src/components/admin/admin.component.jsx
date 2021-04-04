import React from 'react'
import Betting from '../../abis/Betting.json'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'

import Web3 from 'web3'

class Admin extends React.Component{
    constructor(props)
    {
        super(props);

        this.state={
            contest_data: null,
            account: '',
            betting: null
        }
    }

    async componentWillMount(){
        await this.loadWeb3()
        await this.loadBlockchainData()
        // // get data

         fetch('http://localhost:1337/api/bet')
         .then((response) => response.json())
         .then((data)=>{
             console.log(data);
             this.setState({contest_data: data});
         })
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
        this.setState({ account: accounts[0] });
        //Get network ID
        //Get network data
        const networkId = await web3.eth.net.getId();
        const networkData = Betting.networks[networkId];
        if (networkData) {
          const betting = new web3.eth.Contract(Betting.abi, networkData.address)
          console.log(betting);
          this.setState({ betting });
          console.log(this.state)
        }
        else {
          window.alert("contract not deployed");
        }
    
      }

      distribute=async()=>{
          if(this.state.contest_data[0].user1_pts && this.state.contest_data[0].user2_pts && this.state.contest_data[0].user1_pts > this.state.contest_data[0].user2_pts)
          {
            await this.state.betting.methods.distribute(this.state.contest_data[0].user1).send({ from: localStorage.getItem('user') });
          }
          else{
            await this.state.betting.methods.distribute(this.state.contest_data[0].user2).send({ from: localStorage.getItem('user') });
          }
      }

    render(){
        console.log(this.state);
        if(this.state.contest_data)
        {return(
            <div>
              <Container>
                  {this.state.contest_data.map((contest, key)=>(
                          <Container>
                      <Row>
                          <Col>
                          <h5>{contest.user1}</h5>
                          </Col>
                          <Col>vs</Col>
                          <Col>
                          <h5>{contest.user2}</h5>
                          </Col>
                      </Row>
                      <Row>
                      <Button variant='primary' onClick={()=>{this.distribute()}}>Distribute</Button>
                      </Row>
                      </Container>
                      
                  ))}
              </Container>
            </div>
        )}
        else{
            return(
                <div>
                    wait
                </div>
            )
        }
    }

    

}

export default Admin;