import React, { Component } from 'react';
import Betting from '../abis/Betting.json'
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';
import TeamCard from './team-card/team-card.component';
import ContestPage from '../pages/contest-page/contest-page.component';
import PaymentPage from '../pages/payment-page/payment-page.component';
import {Route} from 'react-router-dom'
import HomePage from '../pages/home-page/home-page.component';
import SelectTeamPage from '../pages/select-team/select-team.component';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'


class App extends Component {

  constructor(props)
  {
    super(props);
  }

  render(){
    return (
      <div>
        <Route exact path='/' component={HomePage}/>
        <Route exact path="/payment" component={PaymentPage}/>
        <Route exact path="/contests" component={ContestPage}/>
        <Route  path="/select-team/:matchId/:homeId/:awayId" component={SelectTeamPage}/>
      </div>
    )
  }
}

export default App;