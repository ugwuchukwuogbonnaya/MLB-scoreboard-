/**
 * Displays the scoreboard
 */

import React from 'react';
import {connect} from 'react-redux';

import './components.css';

class ScoreBoard extends React.Component{
	
	render(){		
		if(this.props.details['status_ind'] === 'P') return null;
		if(!this.props.details['linescore'])return null;
		const createBoard = (team)=>{		
			// if there is no score information available, display N/A
			if(!(this.props.details['linescore']['inning_line_score'] instanceof Array)) return (
				<React.Fragment>					
					<td>N/A</td>
					<td>N/A</td>
					<td>N/A</td>
				</React.Fragment>
			);
			var re = this.props.details['linescore']['inning_line_score'].map(
				(item,index)=><td key={index}>{item[team]}</td>
			);
			return (
				<React.Fragment>
					{re}
					<td>{this.props.details['linescore'][team+'_team_runs']}</td>
					<td>{this.props.details['linescore'][team+'_team_hits']}</td>					
					<td>{this.props.details['linescore'][team+'_team_errors']}</td>
				</React.Fragment>
			)
		}				

		return (
			<div id="score-board">
				<table>
					<thead>
						<tr>
							<th>Team Name</th>
							{									
								this.props.details['linescore']['inning_line_score'] instanceof Array? // safe-guard in case there is no score information
								this.props.details['linescore']['inning_line_score'].map((item,index)=><th key={index}>{index+1}</th>)
								:null
							}
							<th>R</th>
							<th>H</th>
							<th>E</th>
						</tr>
					</thead>					
					<tbody>	
						<tr>
							<th>{this.props.details['home_fname']}</th>
							{createBoard('home') /*Score for home team*/}
						</tr>			
						<tr>
							<th>{this.props.details['away_fname']}</th>
							{createBoard('away') /*Score for away team*/}							
						</tr>		

					</tbody>
				</table>
			</div>
		)
	}

}

const mstp = state =>({
	details: state.details.data,
	fetching: state.details.fetching
})

export default connect(mstp)(ScoreBoard);