import React from 'react'

import './admin-match.styles.scss'

import Betting from '../../abis/Betting.json'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Web3 from 'web3'
import { PLAYER_STATS } from '../match-started/match-started-data'

class AdminMatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contest_data: null,
      account: '',
      betting: null,
      player_stats: null,
      gk1: [],
      def1: [],
      mid1: [],
      att1: [],
      gk2: [],
      def2: [],
      mid2: [],
      att2: [],
      total_pts1: 0,
      total_pts2: 0,
      cap1: 0,
      cap2: 0,
      vcap1: 0,
      vcap2:0
    }
  }

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    // // get data
    console.log('this.props.match.params.matchId');
    await fetch(`http://localhost:1337/api/bet/${this.props.match.params.matchId}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        this.setState({ contest_data: data });
      }).then(() => {
        //console.log(this.state);
      })

      
    const requestOptions = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': '718b15b972a3bc571a36b512a7bf94c6'
      },
    };


    var player_stats = [];

    // await fetch(`https://v3.football.api-sports.io/fixtures/players?fixture=${this.props.matchId}`, requestOptions)
    //     .then(response => response.json())
    //     .then((data) => {
    //         player_stats = data.response;
    //     });

    // this.setState({ player_stats: player_stats });


    // // pre saved data

    await this.setState({ player_stats: PLAYER_STATS.response });


    // console.log('response');
    // console.log(this.state);

    await fetch(`http://localhost:1337/api/select-team/${this.state.contest_data.user1}/${this.props.match.params.matchId}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ gk1: data.Goalkeeper, mid1: data.Midfielder, def1: data.Defender, att1: data.Attacker, total_pts1: data.points });

      });

      
    console.log("opponent_data")
    await fetch(`http://localhost:1337/api/select-team/${this.state.contest_data.user2}/${this.props.match.params.matchId}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ gk2: data.Goalkeeper, mid2: data.Midfielder, def2: data.Defender, att2: data.Attacker, total_pts2: data.points });

      })

     

    //this.setState({opp_Gk: opponent_data})

    // // updating player arrays with points

    var Goalkeeper_new = this.calculateGKPoints(this.state.gk1);

    //console.log(Goalkeeper_new);

    var Defender_new = this.calculateDefPoints(this.state.def1);
    // console.log("Defender_new");
    // console.log(Defender_new);


    var Midfielder_new = this.calculateMidPoints(this.state.mid1);
    // console.log("Midfielder_new");
    // console.log(Midfielder_new);

    var Attacker_new = this.calculateAttPoints(this.state.att1);
    // console.log("Attacker_new");
    // console.log(Attacker_new);

    var total_points = this.calculateTotalPoints(Goalkeeper_new) + this.calculateTotalPoints(Defender_new) + this.calculateTotalPoints(Midfielder_new) + this.calculateTotalPoints(Attacker_new);

    await this.setState({total_pts1: total_points});

    // console.log("total pts")
    // console.log(total_points);

    await fetch(`http://localhost:1337/api/update-pts/${this.state.contest_data.user1}/${this.props.match.params.matchId}`, {
      method: 'post',

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({

        Goalkeeper_new, Defender_new, Midfielder_new, Attacker_new, total_points
      })
    }).then((res) => {
      console.log("res");
    });

    console.log(this.state);

    var Goalkeeper_new_opponent = this.calculateGKPoints(this.state.gk2);
    // console.log(Goalkeeper_new_opponent);

    var Defender_new_opponent = this.calculateDefPoints(this.state.def2);
    //  console.log("Defender_new_oppon");
    //  console.log(Defender_new_opponent);


    var Midfielder_new_opponent = this.calculateMidPoints(this.state.mid2);
    // console.log("Midfielder_new");
    // console.log(Midfielder_new_opponent);

    var Attacker_new_opponent = this.calculateAttPoints(this.state.att2);
    // console.log("Attacker_new");
    // console.log(Attacker_new_opponent);

     total_points = this.calculateTotalPoints(Goalkeeper_new_opponent) + this.calculateTotalPoints(Defender_new_opponent) + this.calculateTotalPoints(Midfielder_new_opponent) + this.calculateTotalPoints(Attacker_new_opponent);

    // console.log("hello");

    await this.setState({total_pts2: total_points});

    await fetch(`http://localhost:1337/api/update-pts/${this.state.contest_data.user2}/${this.props.match.params.matchId}`, {
      method: 'post',

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({

        Goalkeeper_new_opponent, Defender_new_opponent, Midfielder_new_opponent, Attacker_new_opponent, total_points
      })
    }).then(() => {
      // console.log(this.state.opp_Gk);
    });

    

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


  calculateGKPoints = (Goalkeeper) => {

    // check in team 1 of response

    var GkPoints = 0; 

    for (let i = 0; i < this.state.player_stats[0].players.length; i++) {
      if (this.state.player_stats[0].players[i].player.id === Goalkeeper[0].player.id) {
        if (this.state.player_stats[0].players[i].statistics[0].goals.total) {
          GkPoints += this.state.player_stats[0].players[i].statistics[0].goals.total * 60;
        }

        if (this.state.player_stats[0].players[i].statistics[0].goals.assists) {
          GkPoints += this.state.player_stats[0].players[i].statistics[0].goals.assists * 20;
        }

        if (this.state.player_stats[0].players[i].statistics[0].shots.on) {
          GkPoints += this.state.player_stats[0].players[i].statistics[0].shots.on * 20;
        }

        if (this.state.player_stats[0].players[i].statistics[0].passes.key) {
          GkPoints += this.state.player_stats[0].players[i].statistics[0].passes.key * 3;
        }

        if (this.state.player_stats[0].players[i].statistics[0].tackles.total) {
          GkPoints += this.state.player_stats[0].players[i].statistics[0].tackles.total * 4;
        }

        if (this.state.player_stats[0].players[i].statistics[0].tackles.interceptions) {
          GkPoints += this.state.player_stats[0].players[i].statistics[0].tackles.interceptions * 4;
        }

        if (this.state.player_stats[0].players[i].statistics[0].goals.saves) {
          GkPoints += this.state.player_stats[0].players[i].statistics[0].goals.saves * 6;
        }

        if (this.state.player_stats[0].players[i].statistics[0].penalty.saved) {
          GkPoints += this.state.player_stats[0].players[i].statistics[0].penalty.saved * 50;
        }


        if (this.state.player_stats[0].players[i].statistics[0].goals.conceded === 0) {
          GkPoints += 20;
        }

        if (this.state.player_stats[0].players[i].statistics[0].passes.accuracy) {
          var temp = Number(this.state.player_stats[0].players[i].statistics[0].passes.accuracy);
          GkPoints = GkPoints + Math.floor((temp / 5));
        }

        if (this.state.player_stats[0].players[i].statistics[0].games.minutes > 0 && !this.state.player_stats[0].players[i].statistics[0].games.substitute) {
          GkPoints += 4;
        }

        if (this.state.player_stats[0].players[i].statistics[0].games.substitute) {
          GkPoints += 2;
        }

        if (this.state.player_stats[0].players[i].statistics[0].cards.yellow === 1) {
          GkPoints -= 4;
        }

        if (this.state.player_stats[0].players[i].statistics[0].cards.red === 1) {
          GkPoints -= 10;
        }

        if (this.state.player_stats[0].players[i].statistics[0].goals.conceded) {
          GkPoints -= 2 * this.state.player_stats[0].players[i].statistics[0].goals.conceded;
        }

        if (this.state.player_stats[0].players[i].statistics[0].penalty.missed) {
          GkPoints -= this.state.player_stats[0].players[i].statistics[0].penalty.missed * 20;
        }

        if (this.state.player_stats[0].players[i].player.id === this.props.captain) {
          GkPoints *= 2;
        }
        if (this.state.player_stats[0].players[i].player.id === this.props.vice_captain) {
          GkPoints *= 1.5;
        }


      }
    }

    for (let i = 0; i < this.state.player_stats[1].players.length; i++) {
      if (this.state.player_stats[1].players[i].player.id === Goalkeeper[0].player.id) {
        if (this.state.player_stats[1].players[i].statistics[0].goals.total) {
          GkPoints += this.state.player_stats[1].players[i].statistics[0].goals.total * 60;
        }

        if (this.state.player_stats[1].players[i].statistics[0].goals.assists) {
          GkPoints += this.state.player_stats[1].players[i].statistics[0].goals.assists * 20;
        }

        if (this.state.player_stats[1].players[i].statistics[0].shots.on) {
          GkPoints += this.state.player_stats[1].players[i].statistics[0].shots.on * 20;
        }

        if (this.state.player_stats[1].players[i].statistics[0].passes.key) {
          GkPoints += this.state.player_stats[1].players[i].statistics[0].passes.key * 3;
        }

        if (this.state.player_stats[1].players[i].statistics[0].passes.accuracy) {
          var temp = Number(this.state.player_stats[1].players[i].statistics[0].passes.accuracy);
          GkPoints = GkPoints + Math.floor((temp / 5));
        }

        if (this.state.player_stats[1].players[i].statistics[0].tackles.total) {
          GkPoints += this.state.player_stats[1].players[i].statistics[0].tackles.total * 4;
        }

        if (this.state.player_stats[1].players[i].statistics[0].tackles.interceptions) {
          GkPoints += this.state.player_stats[1].players[i].statistics[0].tackles.interceptions * 4;
        }

        if (this.state.player_stats[1].players[i].statistics[0].goals.saves) {
          GkPoints += this.state.player_stats[1].players[i].statistics[0].goals.saves * 6;
        }

        if (this.state.player_stats[1].players[i].statistics[0].penalty.saved) {
          GkPoints += this.state.player_stats[1].players[i].statistics[0].penalty.saved * 50;
        }


        if (this.state.player_stats[1].players[i].statistics[0].goals.conceded === 0) {
          GkPoints += 20;
        }

        if (this.state.player_stats[1].players[i].statistics[0].games.minutes > 0 && !this.state.player_stats[1].players[i].statistics[0].games.substitute) {
          GkPoints += 4;
        }

        if (this.state.player_stats[1].players[i].statistics[0].games.substitute) {
          GkPoints += 2;
        }

        if (this.state.player_stats[1].players[i].statistics[0].cards.yellow === 1) {
          GkPoints -= 4;
        }

        if (this.state.player_stats[1].players[i].statistics[0].cards.red === 1) {
          GkPoints -= 10;
        }

        if (this.state.player_stats[1].players[i].statistics[0].goals.conceded) {
          GkPoints -= 2 * this.state.player_stats[1].players[i].statistics[0].goals.conceded;
        }

        if (this.state.player_stats[1].players[i].statistics[0].penalty.missed) {
          GkPoints -= this.state.player_stats[1].players[i].statistics[0].penalty.missed * 20;
        }

        if (this.state.player_stats[1].players[i].player.id === this.props.captain) {
          GkPoints *= 2;
        }
        if (this.state.player_stats[1].players[i].player.id === this.props.vice_captain) {
          GkPoints *= 1.5;
        }


      }
    }

    Goalkeeper[0]['points'] = GkPoints;
    return Goalkeeper;
    // console.log("gk pts");
    // console.log(GkPoints);   
  }

  calculateDefPoints = (Defender) => {

    for (let k = 0; k < Defender.length; k++) {
      var DefPoints = 0;

      for (let i = 0; i < this.state.player_stats[0].players.length; i++) {
        if (this.state.player_stats[0].players[i].player.id === Defender[k].player.id) {
          if (this.state.player_stats[0].players[i].statistics[0].goals.total) {
            DefPoints += this.state.player_stats[0].players[i].statistics[0].goals.total * 60;
          }

          if (this.state.player_stats[0].players[i].statistics[0].goals.assists) {
            DefPoints += this.state.player_stats[0].players[i].statistics[0].goals.assists * 20;
          }

          if (this.state.player_stats[0].players[i].statistics[0].shots.on) {
            DefPoints += this.state.player_stats[0].players[i].statistics[0].shots.on * 20;
          }

          if (this.state.player_stats[0].players[i].statistics[0].passes.key) {
            DefPoints += this.state.player_stats[0].players[i].statistics[0].passes.key * 3;
          }

          if (this.state.player_stats[0].players[i].statistics[0].tackles.total) {
            DefPoints += this.state.player_stats[0].players[i].statistics[0].tackles.total * 4;
          }

          if (this.state.player_stats[0].players[i].statistics[0].passes.accuracy) {
            var temp = Number(this.state.player_stats[0].players[i].statistics[0].passes.accuracy);
            DefPoints = DefPoints + Math.floor((temp / 5));
          }

          if (this.state.player_stats[0].players[i].statistics[0].tackles.interceptions) {
            DefPoints += this.state.player_stats[0].players[i].statistics[0].tackles.interceptions * 4;
          }

          if (this.state.player_stats[0].players[i].statistics[0].goals.saves) {
            DefPoints += this.state.player_stats[0].players[i].statistics[0].goals.saves * 6;
          }

          if (this.state.player_stats[0].players[i].statistics[0].penalty.saved) {
            DefPoints += this.state.player_stats[0].players[i].statistics[0].penalty.saved * 50;
          }

          if (this.state.player_stats[0].players[i].statistics[0].games.minutes > 0 && !this.state.player_stats[0].players[i].statistics[0].games.substitute) {
            DefPoints += 4;
          }

          if (this.state.player_stats[0].players[i].statistics[0].games.substitute) {
            DefPoints += 2;
          }

          if (this.state.player_stats[0].players[i].statistics[0].cards.yellow === 1) {
            DefPoints -= 4;
          }

          if (this.state.player_stats[0].players[i].statistics[0].cards.red === 1) {
            DefPoints -= 10;
          }

          if (this.state.player_stats[0].players[i].statistics[0].goals.conceded) {
            DefPoints -= 2 * this.state.player_stats[0].players[i].statistics[0].goals.conceded;
          }

          if (this.state.player_stats[0].players[i].statistics[0].penalty.missed) {
            DefPoints -= this.state.player_stats[0].players[i].statistics[0].penalty.missed * 20;
          }

          if (this.state.player_stats[0].players[i].player.id === this.props.captain) {
            DefPoints *= 2;
          }
          if (this.state.player_stats[0].players[i].player.id === this.props.vice_captain) {
            DefPoints *= 1.5;
          }


        }


      }

      for (let i = 0; i < this.state.player_stats[1].players.length; i++) {
        if (this.state.player_stats[1].players[i].player.id === Defender[k].player.id) {
          if (this.state.player_stats[1].players[i].statistics[0].goals.total) {
            DefPoints += this.state.player_stats[1].players[i].statistics[0].goals.total * 60;
            // console.log(DefPoints)
          }

          if (this.state.player_stats[1].players[i].statistics[0].goals.assists) {
            DefPoints += this.state.player_stats[1].players[i].statistics[0].goals.assists * 20;
            // console.log(DefPoints)
          }

          if (this.state.player_stats[1].players[i].statistics[0].shots.on) {
            DefPoints += this.state.player_stats[1].players[i].statistics[0].shots.on * 20;
            // console.log(DefPoints)
          }

          if (this.state.player_stats[1].players[i].statistics[0].passes.key) {
            DefPoints += this.state.player_stats[1].players[i].statistics[0].passes.key * 3;
            // console.log(DefPoints)
          }

          if (this.state.player_stats[1].players[i].statistics[0].passes.accuracy) {
            var temp = Number(this.state.player_stats[1].players[i].statistics[0].passes.accuracy);
            DefPoints = DefPoints + Math.floor((temp / 5));
            // console.log(DefPoints)
          }

          if (this.state.player_stats[1].players[i].statistics[0].tackles.total) {
            DefPoints += this.state.player_stats[1].players[i].statistics[0].tackles.total * 4;
            // console.log(DefPoints)
            // console.log('tack')
          }

          if (this.state.player_stats[1].players[i].statistics[0].tackles.interceptions) {
            DefPoints += this.state.player_stats[1].players[i].statistics[0].tackles.interceptions * 4;
            //  console.log(DefPoints)
          }

          if (this.state.player_stats[1].players[i].statistics[0].goals.saves) {
            DefPoints += this.state.player_stats[1].players[i].statistics[0].goals.saves * 6;
            // console.log(DefPoints)
          }

          if (this.state.player_stats[1].players[i].statistics[0].penalty.saved) {
            DefPoints += this.state.player_stats[1].players[i].statistics[0].penalty.saved * 50;
            // console.log(DefPoints)
          }


          if (this.state.player_stats[1].players[i].statistics[0].games.minutes > 0 && !this.state.player_stats[1].players[i].statistics[0].games.substitute) {
            DefPoints += 4;
            // console.log(DefPoints)
            // console.log('start');
          }

          if (this.state.player_stats[1].players[i].statistics[0].games.substitute) {
            DefPoints += 2;
            // console.log(DefPoints)
            // console.log("sub")
          }

          if (this.state.player_stats[1].players[i].statistics[0].cards.yellow === 1) {
            DefPoints -= 4;
            // console.log(DefPoints)
            // console.log("yell")
          }

          if (this.state.player_stats[1].players[i].statistics[0].cards.red === 1) {
            DefPoints -= 10;
            // console.log(DefPoints)
            // console.log("red")
          }

          // not working for defenders

          if (this.state.player_stats[1].players[i].statistics[0].goals.conceded) {
            DefPoints -= 2 * this.state.player_stats[1].players[i].statistics[0].goals.conceded;
            // console.log(DefPoints)
            // console.log("conceade")
          }

          if (this.state.player_stats[1].players[i].statistics[0].penalty.missed) {
            DefPoints -= this.state.player_stats[1].players[i].statistics[0].penalty.missed * 20;
            // console.log(DefPoints)
            // console.log("pen miss")
          }

          if (this.state.player_stats[1].players[i].player.id === this.props.captain) {
            DefPoints *= 2;
            // console.log(DefPoints)
            // console.log("capt")
          }
          if (this.state.player_stats[1].players[i].player.id === this.props.vice_captain) {
            DefPoints *= 1.5;
            // console.log(DefPoints)
            // console.log("vc")
          }


        }
      }

      // console.log("def pts");
      // console.log(DefPoints);
      Defender[k]['points'] = DefPoints;
    }

    return Defender;

  }

  calculateMidPoints = (Midfielder) => {

    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < Midfielder.length; k++) {
        var MidPoints = 0;

        for (let i = 0; i < this.state.player_stats[j].players.length; i++) {

          if (this.state.player_stats[j].players[i].player.id === Midfielder[k].player.id) {

            if (this.state.player_stats[j].players[i].statistics[0].goals.total) {
              MidPoints += this.state.player_stats[j].players[i].statistics[0].goals.total * 50;
            }

            if (this.state.player_stats[j].players[i].statistics[0].goals.assists) {
              MidPoints += this.state.player_stats[j].players[i].statistics[0].goals.assists * 20;
            }

            if (this.state.player_stats[j].players[i].statistics[0].shots.on) {
              MidPoints += this.state.player_stats[j].players[i].statistics[0].shots.on * 6;
              // console.log("MidPoints");
              // console.log(MidPoints);
            }

            if (this.state.player_stats[j].players[i].statistics[0].games.minutes > 0 && !this.state.player_stats[1].players[i].statistics[0].games.substitute) {
              MidPoints += 4;
              // console.log(MidPoints)
              // console.log('start');
            }

            if (this.state.player_stats[j].players[i].statistics[0].passes.key) {
              MidPoints += this.state.player_stats[j].players[i].statistics[0].passes.key * 3;
              // console.log("MidPoints");
              // console.log(MidPoints);
            }

            if (this.state.player_stats[j].players[i].statistics[0].tackles.total) {
              MidPoints += this.state.player_stats[j].players[i].statistics[0].tackles.total * 4;
            }

            if (this.state.player_stats[j].players[i].statistics[0].passes.accuracy) {
              var temp = Number(this.state.player_stats[j].players[i].statistics[0].passes.accuracy);
              MidPoints = MidPoints + Math.floor((temp / 5));
              // console.log("MidPoints");
              // console.log(MidPoints);
            }

            if (this.state.player_stats[j].players[i].statistics[0].tackles.interceptions) {
              MidPoints += this.state.player_stats[j].players[i].statistics[0].tackles.interceptions * 4;
              // console.log("MidPoints");
              // console.log(MidPoints);
            }

            if (this.state.player_stats[j].players[i].statistics[0].games.substitute) {
              MidPoints += 2;
              // console.log("MidPoints");
              // console.log(MidPoints);
            }

            if (this.state.player_stats[j].players[i].statistics[0].cards.yellow === 1) {
              MidPoints -= 4;
              // console.log("MidPoints");
              // console.log(MidPoints);
            }

            if (this.state.player_stats[j].players[i].statistics[0].cards.red === 1) {
              MidPoints -= 10;
            }

            if (this.state.player_stats[j].players[i].statistics[0].penalty.missed) {
              MidPoints -= this.state.player_stats[j].players[i].statistics[0].penalty.missed * 20;
            }

            if (this.state.player_stats[j].players[i].player.id === this.props.captain) {
              MidPoints *= 2;
            }
            if (this.state.player_stats[j].players[i].player.id === this.props.vice_captain) {
              MidPoints *= 1.5;

            }

            //console.log(this.props.vice_captain)
            // console.log(this.state.player_stats[j].players[i].player.name);
            // console.log(MidPoints);
            Midfielder[k]['points'] = MidPoints;
          }


        }


      }

    }

    return Midfielder;
  }

  calculateAttPoints = (Attacker) => {

    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < Attacker.length; k++) {
        var AttPoints = 0;

        for (let i = 0; i < this.state.player_stats[j].players.length; i++) {

          if (this.state.player_stats[j].players[i].player.id === Attacker[k].player.id) {

            if (this.state.player_stats[j].players[i].statistics[0].goals.total) {
              AttPoints += this.state.player_stats[j].players[i].statistics[0].goals.total * 40;
            }

            if (this.state.player_stats[j].players[i].statistics[0].goals.assists) {
              AttPoints += this.state.player_stats[j].players[i].statistics[0].goals.assists * 20;
            }

            if (this.state.player_stats[j].players[i].statistics[0].shots.on) {
              AttPoints += this.state.player_stats[j].players[i].statistics[0].shots.on * 6;
              // console.log("AttPoints");
              // console.log(AttPoints);
            }

            if (this.state.player_stats[j].players[i].statistics[0].games.minutes > 0 && !this.state.player_stats[1].players[i].statistics[0].games.substitute) {
              AttPoints += 4;
              // console.log(AttPoints)
              // console.log('start');
            }

            if (this.state.player_stats[j].players[i].statistics[0].passes.key) {
              AttPoints += this.state.player_stats[j].players[i].statistics[0].passes.key * 3;
              // console.log("AttPoints");
              // console.log(AttPoints);
            }

            if (this.state.player_stats[j].players[i].statistics[0].tackles.total) {
              AttPoints += this.state.player_stats[j].players[i].statistics[0].tackles.total * 4;
            }

            if (this.state.player_stats[j].players[i].statistics[0].passes.accuracy) {
              var temp = Number(this.state.player_stats[j].players[i].statistics[0].passes.accuracy);
              AttPoints = AttPoints + Math.floor((temp / 5));
              // console.log("AttPoints");
              // console.log(AttPoints);
            }

            if (this.state.player_stats[j].players[i].statistics[0].tackles.interceptions) {
              AttPoints += this.state.player_stats[j].players[i].statistics[0].tackles.interceptions * 4;
              // console.log("AttPoints");
              // console.log(AttPoints);
            }

            if (this.state.player_stats[j].players[i].statistics[0].games.substitute) {
              AttPoints += 2;
              // console.log("AttPoints");
              // console.log(AttPoints);
            }

            if (this.state.player_stats[j].players[i].statistics[0].cards.yellow === 1) {
              AttPoints -= 4;
              // console.log("AttPoints");
              // console.log(AttPoints);
            }

            if (this.state.player_stats[j].players[i].statistics[0].cards.red === 1) {
              AttPoints -= 10;
            }

            if (this.state.player_stats[j].players[i].statistics[0].penalty.missed) {
              AttPoints -= this.state.player_stats[j].players[i].statistics[0].penalty.missed * 20;
            }

            if (this.state.player_stats[j].players[i].player.id === this.props.captain) {
              AttPoints *= 2;

            }
            if (this.state.player_stats[j].players[i].player.id === this.props.vice_captain) {
              AttPoints *= 1.5;

            }

            //console.log(this.props.vice_captain)
            //    console.log(this.state.player_stats[j].players[i].player.name);
            //     console.log(AttPoints);
            Attacker[k]['points'] = AttPoints;
          }


        }


      }

    }

    return Attacker;
  }

  calculateTotalPoints = (Players) => {

    var total_pts_temp = 0;

    for (let i = 0; i < Players.length; i++) {
      total_pts_temp += Players[i].points;
    }

    return total_pts_temp;
  }




  distribute = async () => {
    if (this.state.total_pts1 && this.state.total_pts2 && this.state.total_pts1 > this.state.total_pts2) {
      await this.state.betting.methods.distribute(this.state.contest_data.user1).send({ from: localStorage.getItem('user') });
    }
    else {
      await this.state.betting.methods.distribute(this.state.contest_data.user2).send({ from: localStorage.getItem('user') });
    }
  }


  render() {
    //console.log(this.props.match.params.matchId);
    if (this.state.contest_data) {
      return (
        <div>
          <Container>
            <Row>
              <Col>
                {this.state.contest_data.user1}
                <p>points: {this.state.total_pts1}</p>
              </Col>
              <Col>
                vs</Col>
              <Col>
                {this.state.contest_data.user2}
                <p>points: {this.state.total_pts2}</p>
              </Col>

            </Row>
            <Row>

              <Button variant='primary' onClick={() => { this.distribute() }}>distribute</Button>
            </Row>
          </Container>
        </div>
      )
    }
    else {
     
      return (<div>wait</div>)
    }
  }

}

export default AdminMatch;