/**
 * Renders the score and initiates navigation to the detail page
 * Takes in the following properties:
 * - hometeam:
 * - - {score: integer, name: string}
 * - awayteam:
 * - - {score: integer, name: string}
 * - status: string
 * - dataDirectory: string
 * - index: integer
 */

import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import classNames from 'classnames';

const DefaultImage = require("../images/logos/mlb.png");

class ScoreItem extends React.Component{

	constructor(props){
		super(props);
		this.navigate = this.navigate.bind(this);
	}

	navigate(){
		if(!this.props.clickable)return;
		var url = "/details/" + this.props.dataDirectory.slice(17,20) + "/" + this.props.index + "/" + this.props.date.getFullYear();		
		url += "/" + (this.props.date.getMonth()+1);
		url += "/" + this.props.date.getDate();
		url += "/" + this.props.dataDirectory.slice(47);
		this.props.nav(url);
	}

	render(){		
		const homewins = this.props.hometeam.score > this.props.awayteam.score;
		const tie = this.props.hometeam.score === this.props.awayteam.score;
		var homeImage, awayImage;
		try{
			homeImage = require('../images/logos/'+this.props.hometeam.name+'.png');
			awayImage = require('../images/logos/'+this.props.awayteam.name+'.png');
		}catch(err){
			console.log("Unable to find images, using default");
		}

		// Set the colour for the game's status-bar depending on the status of the game
		var statusColour = "white";		
		if(this.props.status === "In Progress"){
			statusColour = "#29EB81";
		}
		else if(this.props.status === "Postponed"){
			statusColour = "#FFEF3E";
		}
		else if(this.props.status === "Cancelled"){
			statusColour = "#FF3E3E";
		}		
		var cname = classNames("score-item",
			{clickable: this.props.clickable} // if the item is clickable, signify that with the CSS class
		);
		return (
			<div className={cname} onClick={this.navigate} tabIndex={this.props.clickable? 0:-1}>
				<div className="score-bar">
					{/* Home Team */}
					<div className="team-name" style={{background: homewins && !tie? "rgba(41,189,235,0.5)" :"initial" }}>
						<span>{this.props.hometeam.name}</span>
						<img src={homeImage?homeImage:DefaultImage} alt="logo" />
					</div>
					{/* Home Team Score */}
					<div className="score">
						<span>{this.props.hometeam.score? this.props.hometeam.score : "TBD"}</span>
					</div>
					{/* Away Team Score */}
					<div className="score">
						<span>{this.props.awayteam.score? this.props.awayteam.score : "TBD"}</span>
					</div>
					{/* Away Team */}
					<div className="team-name" style={{background: !homewins && !tie? "rgba(41,189,235,0.5)" :"initial" }}>
						<img src={awayImage?awayImage:DefaultImage} alt="logo"/>
						<span>{this.props.awayteam.name}</span>
					</div>
				</div>			
				{/* Status Bar */}
				<div className="status-bar" style={{background:statusColour}}>
					<span>{this.props.status}</span>
				</div>
			</div>
		)
	}
}

const mstp = state =>({
	date: state.scores.date
});

const mdtp = {
	nav: push
};

export default connect(mstp,mdtp)(ScoreItem);