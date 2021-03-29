import React from 'react'
import './points.styles.scss'

const Points=()=>{
    return(
        <div className="mainDiv">
          

<h1>Fantasy points system</h1>
<h2>Attack points</h2>
<table id="attacktable">
  <tr>
    <th>event</th>
    <th>score</th>
  </tr>
  <tr>
    <td>goal scored by stricker</td>
    <td>+40</td>
  </tr>
  <tr>
    <td>goal scored by midfeilder</td>
    <td>+50</td>
  </tr>
  <tr>
    <td>defender or goalkeeper</td>
    <td>+60</td>
  </tr>
  <tr>
    <td>assist</td>
    <td>+20</td>
  </tr>
  <tr>
    <td>shot on target</td>
    <td>+6</td>
  </tr>
  <tr>
    <td>chance created</td>
    <td>+3</td>
  </tr>
</table>
<h2>defence points</h2>


<table id="defencetable">
  <tr>
    <th>event</th>
    <th>score</th>
  </tr>
  <tr>
    <td>tackle won</td>
    <td>+4</td>
  </tr>
  <tr>
    <td>interception won</td>
    <td>+4</td>
  </tr>
  <tr>
    <td>saves</td>
    <td>+6</td>
  </tr>
  <tr>
    <td>panelty saved</td>
    <td>+50</td>
  </tr>
  <tr>
    <td>clean sheet</td>
    <td>+20</td>
  </tr>
</table>

<h2>other points</h2>


<table id="othertable">
  <tr>
    <th>event</th>
    <th>score</th>
  </tr>
  <tr>
    <td>points scored by captain</td>
    <td>2X</td>
  </tr>
  <tr>
    <td>points scored by vicecaptian</td>
    <td>1.5X</td>
  </tr>
  <tr>
    <td>in playing 11</td>
    <td>+4</td>
  </tr>
  <tr>
    <td>coming on as a substitute</td>
    <td>+2</td>
  </tr>
</table>
        </div>

    )
    }
    export default Points;