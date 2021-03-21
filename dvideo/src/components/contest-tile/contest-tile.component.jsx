import React from 'react';
import './contest-tile.styles.scss'
const ContestTile = (props) => {
    return (
        <div className="contest-tile">
            <div className="home">
                <img src={props.home_logo} />
                <h3>{props.home_name}</h3>
            </div>
            <img className="vs-logo" src="https://thumbs.dreamstime.com/b/vs-versus-icon-isolated-confrontation-symbol-game-concept-letter-sign-choise-vs-versus-icon-isolated-confrontation-symbol-166196291.jpg" />
            <div className="away">
                <img src={props.away_logo} />
                <h3>{props.away_name}</h3>
            </div>
        </div>
    );
}

export default ContestTile;