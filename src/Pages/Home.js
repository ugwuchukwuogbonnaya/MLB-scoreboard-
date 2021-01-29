/**
 * Renders the Home screen
 * Responsible for pulling information concerning scores
 * and initiating API requests
 */

import React from 'react';
import {connect} from 'react-redux';

import ScoreList from '../Components/ScoreList'
import Calendar from '../Components/Calendar';

class Home extends React.Component{	

	render(){
		return (
			<div className="page" id="home">
				<h1>MLB Scoreboard</h1>
				<div id="content-container">
					<div className="content">
						<h2>Scores</h2>
						<div id="score-header">
							<span>Home</span>
							<span>Away</span>
						</div>
						<ScoreList/>
					</div>			
					<div>
						<Calendar/>
					</div>												
				</div>
			</div>
		)
	}

}

export default connect()(Home);