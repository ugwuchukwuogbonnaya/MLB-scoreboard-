/**
 * Shows the user the details of the selected games
 */

import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import ScoreItem from '../Components/ScoreItem';
import BattingBoard from '../Components/BattingBoard';
import ScoreBoard from '../Components/ScoreBoard';
import {getDetails,changeDate} from '../Actions';

const LoadingSymbol = require("../images/loading.gif");

var months = [
	'January','February','March','April','May',
	'June','July','August','September','October',
	'November','December'
];

class DetailPage extends React.Component{
	componentWillMount(){		
		var {year,month,day,dir,type} = this.props.match.params;		
		if(this.props.scores instanceof Array && this.props.scores.length === 0){ // if the scores aren't loaded, load them (directly went to page)
			var ndate = new Date(year,parseInt(month,10)-1,day);
			this.props.changeDate(ndate);
		}		
		
		var url = "/components/game";		
		url += "/" + type;
		url += "/year_" + year;
		url += "/month_" + (month < 10? "0" + month : month);
		url += "/day_" + (day < 10? "0" + day:day);
		url += "/" + dir;
		this.props.getDetails(url);	// reconstruct the request url from the url params
	}

	render(){
		var {year,month,day,index} = this.props.match.params;		
		month = parseInt(month,10) -1; // retrieve the current month

		// Get the information for this game to give to the score item
		var item={};
		if(this.props.scores instanceof Array) item = this.props.scores[index];
		else item = this.props.scores;
		var itemProps = {};
		console.log(item);
		if(item){		
			itemProps = {
				awayteam: {
					name: item['away_team_name'],
					score: item['linescore']? item['linescore']['r']['away']:null
				},
				hometeam: {
					name: item['home_team_name'],
					score: item['linescore']? item['linescore']['r']['home']:null
				},
				status: item['status']? item['status']['status']:null,
				dataDirectory: item['game_data_directory']
			};			
		}	

		// The content to render once everything has been loaded
		var content = (
			<React.Fragment>
				<ScoreItem {...itemProps} />
				<ScoreBoard/>
				<h2>Batters</h2>
				<BattingBoard/>								
			</React.Fragment>
		)

		// Send the user back to the homepage, useful if they go to the details page directly
		var back = ()=>{
			this.props.history.push("/");
		}
		console.log(itemProps);
		var allPresent = !this.props.fetching && !this.props.fetchError && itemProps.status;
		return (
			<div className="page" id="detail">
				<h1>MLB Scoreboard</h1>
				<div id="content-container">
					<div id="date-place">
						<span style={{fontSize:"1.4em",fontWeight:"500"}}>{months[month] + " " + day + ", " + year}</span><br/>
						<span>{this.props.details['venue_name']}</span>
					</div>
					<div className="content">
						{allPresent?
							 content
							 : this.props.fetchError?
								 <div style={{textAlign:'center'}}>No information could be found.</div>
								 : <div className="loading-zone">
								 		<img src={LoadingSymbol} alt="Loading"/>
							 		</div>								 
								}			
						<div style={{textAlign:'center',margin: '10px 0'}}>
							<button onClick={back} className="action">Back</button>
						</div>			
					</div>										
				</div>
			</div>
		)
	}
	
}

const mstp = state =>({
	scores: state.scores.games.game? state.scores.games.game: [],
	details: state.details.data,
	fetching: state.details.fetching || state.scores.fetching,
	fetchError: state.details.error || state.scores.error,	
});

const mdtp = (dispatch)=>({
	getDetails:getDetails(dispatch),
	changeDate:changeDate(dispatch),
	nav: push
});

export default connect(mstp,mdtp)(DetailPage);