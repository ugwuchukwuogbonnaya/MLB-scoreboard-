/**
 * Renders the list of scores as provided by the redux store
 */

import React from 'react';
import {connect} from 'react-redux';

import ScoreItem from './ScoreItem';

const LoadingSymbol = require("../images/loading.gif");

class ScoreList extends React.Component{

	render(){	
		// sort your favourites, so Bluejays appear on the top
		const sortFavourite = (games)=>{			
			var faves = [];			
			for(var i in games){ // sort into a new array to keep other games in chronological order
				if(games[i] === null) continue;
				games[i]['index'] = i;
				if(games[i]['away_team_name'] === 'Blue Jays' || games[i]['home_team_name'] === 'Blue Jays'){										
					faves.push(games[i]);
					games[i] = null;
				}								
			}												
			return ([...faves,...games]).filter((item)=>item !== null);
		}
		
		// Function to pull information from the redux store for the ScoreItem to be rendered
		const getScores = (item,index)=>{
			var itemProps = {
				awayteam: {
					name: item['away_team_name'],
					score: item['linescore']? item['linescore']['r']['away']:null
				},
				hometeam: {
					name: item['home_team_name'],
					score: item['linescore']? item['linescore']['r']['home']:null
				},
				status: item['status']? item['status']['status']:null,
				dataDirectory: item['game_data_directory'],
				index: item.index
			};			
			return <ScoreItem key={index} {...itemProps} clickable={true} />
		};

		// Check if it's an array, if so, sort it and map the information. 
		// If not, just get the information
		var list;
		if(!this.props.fetching){
			if(this.props.scores instanceof Array){
				var sortedGames = sortFavourite(this.props.scores.slice());
				list = sortedGames.map(getScores);
			}else{
				list = getScores(this.props.scores,0);
			}		
		}

		return (
			<React.Fragment>
				{
					this.props.fetching?  // if we're still fetching, show the loading symbol
						<div className="loading-zone">
							<img src={LoadingSymbol} alt="Loading"/>
						</div>:
						list.length === 0?  // if we're done, but there isn't any information, tell the user
							<h2>No games found for this date</h2>
							:list // render the content
				}
			</React.Fragment>
		)
	}
}

const mstp = state =>({
	scores: state.scores.games.game? state.scores.games.game: [],
	fetching: state.scores.fetching
})

export default connect(mstp)(ScoreList);