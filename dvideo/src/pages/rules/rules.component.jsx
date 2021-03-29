import React from 'react'
import './rules.styles.scss'

const RulesPage=()=>{
    return(
        <div>
            <h1>Creating your team</h1>
<p>Every football team you build has to have 11 players, of which a maximum of 7 players can be from any one team playing the real-life match.
Player Combinations
Your can have different combinations of players but must qualify the following team selection criteria:</p>

<table id="rules">
  <tr>
    <th>player type</th>
    <th>min</th>
    <th>max</th>
  </tr>
  <tr>
    <td>Goalkeeper</td>
    <td>1</td>
    <td>1</td>
  </tr>
  <tr>
    <td>Defender</td>
    <td>3</td>
    <td>5</td>
  </tr>
  <tr>
    <td>midfielder</td>
    <td>3</td>
    <td>5</td>
  </tr>
  <tr>
    <td>Forward</td>
    <td>1</td>
    <td>3</td>
  </tr>
  
</table>
<h2>Captain and Vice-captain points</h2>

<p>Once you have selected your 11 players, you will have to assign a captain and vice-captain for your team.
The captain will give you 2x points scored by them in the actual match.
The vice-captain will give you 1.5x points scored by them in the actual match.
For more details check fantasy points system</p>
        </div>
    )
}

export default RulesPage;