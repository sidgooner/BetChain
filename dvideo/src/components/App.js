import React, { Component } from 'react';
import Betting from '../abis/Betting.json'

import Web3 from 'web3';
import './App.css';
import TeamCard from './team-card/team-card.component';
import ContestPage from '../pages/contest-page/contest-page.component';
import PaymentPage from '../pages/payment-page/payment-page.component';
import {Route} from 'react-router-dom'
import HomePage from '../pages/home-page/home-page.component';
import SelectTeamPage from '../pages/select-team/select-team.component';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import PlayerDetails from '../pages/player-details/player-details.component';
import RulesPage from '../pages/rules/rules.component';
import Points from '../pages/points/points.component';
import Navbar1 from './navbar/navbar.component';
import Admin from './admin/admin.component';
import AdminMatch from './admin-match/admin-match.component';

class App extends Component {

  constructor(props)
  {
    super(props);
  }

  render(){
    return (
      
      <div>
       
        
        <Route exact path='/' component={HomePage}/>
        <Route exact path="/payment/:id" component={PaymentPage}/>
        <Route exact path="/contests" component={ContestPage}/>
        <Route  path="/select-team/:matchId/:homeId/:awayId" component={SelectTeamPage}/>
        <Route  path="/rules" component={RulesPage}/>
        <Route  path="/points" component={Points}/>
        <Route path='/player-detail/:playerId' component={PlayerDetails}></Route>
        <Route exact path='/admin' component={Admin}/>
        <Route path='/admin/:mathId' component={AdminMatch} />
      
      </div>
    )
  }
}

export default App;