/**
 * Displays the batting stats for the game
 */

import React from 'react';
import {connect} from 'react-redux';

import ToggleButton from './ToggleButton';
import ToggleGroup from './ToggleGroup';

class BattingBoard extends React.Component{

	constructor(props){
		super(props);
		this.switchTeams = this.switchTeams.bind(this);
	}

	componentWillMount(){
		this.setState({
			team: 0 // 0 => home, 1 => away
		});
	}

	switchTeams(team){
		this.setState({
			team: team === "home" ? 0 : 1
		});
	}

	render(){
		if(!this.props.details.batting)return null;
		// render the information per player
		const fetchData = this.props.details.batting[this.state.team].batter.map((item,index)=>{
			return (
				<tr key={index}>
					<td>{item['name_display_first_last']}</td>
					<td>{item['ab']}</td>
					<td>{item['r']}</td>
					<td>{item['h']}</td>
					<td>{item['rbi']}</td>
					<td>{item['bb']}</td>
					<td>{item['so']}</td>
					<td>{item['avg']}</td>
				</tr>
			)
		})

		return (
			<div id="batting-board">
				{/* Toggle Button Group for teams */}
				<ToggleGroup onToggle={this.switchTeams}>				
					<ToggleButton name="home">{this.props.details['home_fname']}</ToggleButton>
					<ToggleButton name="away">{this.props.details['away_fname']}</ToggleButton>
				</ToggleGroup>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>AB</th>
							<th>R</th>
							<th>H</th>
							<th>RBI</th>
							<th>BB</th>
							<th>SO</th>
							<th>AVG</th>
						</tr>
					</thead>
					<tbody>
						{fetchData}
					</tbody>
				</table>
			</div>
		)
	}
}

const mstp = state =>({
	details: state.details.data
})

export default connect(mstp)(BattingBoard);