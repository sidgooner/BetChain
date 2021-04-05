import './player-card-pitch-match-started.styles.scss'
import React from 'react'
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'


class PlayerCardPitchStarted extends React.Component {

    constructor(props) {
        super(props)


    }


    render() {
        if (!this.props.points) {
            var class1 = "player-card-pitch-started";
            if(this.props.captain === this.props.id) class1 ="player-card-pitch-started-captain"
            else if(this.props.vice_captain === this.props.id) class1 ="player-card-pitch-started-vice_captain"
            return (
                <Card className={class1} style={{ width: '5.7rem' }}>
                    <Card.Img class='photo' variant="top" src={this.props.imageUrl} />
                    <Card.Body className="player-body-started">

                        <Card.Text className="player-name-pitch-started">{this.props.first_name[0] + "." + this.props.last_name}</Card.Text>
                        <Card.Text className="player-position-pitch-started">
                            {this.props.position}
                        </Card.Text>

                    </Card.Body>
                </Card>
            );
        }
        else{
            var class1 = "player-card-pitch-started";
            if(this.props.captain === this.props.id){
                console.log(this.props.last_name)
                 class1 ="player-card-pitch-started-captain"}
            else if(this.props.vice_captain === this.props.id) class1 ="player-card-pitch-started-vice_captain"
            return(
                <Card className={class1} style={{ width: '5.7rem' }}>
                    <Card.Img class='photo' variant="top" src={this.props.imageUrl} />
                    <Card.Body className="player-body-started">

                        <Card.Text className="player-name-pitch-started">{this.props.first_name[0] + "." + this.props.last_name}</Card.Text>
                        <Card.Text className="player-position-pitch-started">
                            {this.props.points} pts
                        </Card.Text>

                    </Card.Body>
                </Card>
            )
        }
    }
}

export default PlayerCardPitchStarted;