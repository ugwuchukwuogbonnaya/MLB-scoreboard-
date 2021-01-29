/**
 * Manages the date's shown
 */

import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {changeDate} from '../Actions';

import './components.css';

const Arrow = require('../images/arrow.svg');

var months = [
	'January','February','March','April','May',
	'June','July','August','September','October',
	'November','December'
];

class Calendar extends React.Component{
	
	constructor(props){
		super(props);
		this.populateDays = this.populateDays.bind(this);
		this.changeMonth = this.changeMonth.bind(this);
	}

	componentDidMount(){
		this.props.changeDate(this.props.date);
	}

	changeMonth(delta){
		var nDate = new Date(this.props.date);
		nDate.setDate(15); // set it to the middle so javascript changes the month instead of jumping the date back
		//nDate.setMonth(nDate.getMonth()+delta);		
		if(delta > 0){ 
			nDate.setMonth(nDate.getMonth()+delta);
			nDate.setDate(1);
		}
		else if(delta < 0)nDate.setDate(0);				
		this.props.changeDate(nDate);				
	}

	// render the days onto the square, matching each date to their appropriate
	// days (e.g. Sun, Mon, Tues)
	populateDays(index,date){		
		if(index >= 42) return [];
		var content = "";
		var handler = null;
		var prevDate = new Date(date);
		if(date.getDate() === 1 && date.getDay() !== index){
			// still checking for first date
		}else{			
			date.setDate(date.getDate() + 1);			
			if(prevDate.getMonth() === this.props.date.getMonth()){ // if the month hasn't changed, keep adding
				let d = new Date(prevDate);
				content = prevDate.getDate() + "";								
				handler = ()=>{										
					this.props.changeDate(d);
				}
			}
		}			
		var cnames = classNames('day',{
			disabled: content === "", // if there is no date for this square, gray it out
			selected: this.props.date.getDate() === prevDate.getDate() // if it's selected, blue it
		})
		return [
			<div key={index} className={cnames} onClick={handler}>{content}</div>,
			...this.populateDays(index+1,date)
		]
	}

	render(){
		const month = months[this.props.date.getMonth()];
		const year = this.props.date.getFullYear();		
		const firstDayRef = new Date(this.props.date);
		firstDayRef.setDate(1);	 // get the first day of the month for building the calendar
		return (
			<div id="calendar-container">
				<div id="calendar-header">
					<img src={Arrow} alt="previous month" onClick={()=>{this.changeMonth(-1);}}/>				
					<span className="month-year">{month + " " + year}</span>
					<img src={Arrow} alt="next month" className="forward" onClick={()=>{this.changeMonth(1);}}/>				
				</div>
				<div id="calendar-days">
					<span>Sun.</span>
					<span>Mon.</span>
					<span>Tues.</span>
					<span>Wed.</span>
					<span>Thurs.</span>
					<span>Fri.</span>
					<span>Sat.</span>
				</div>
				<div id="calendar">
					{						
						this.populateDays(0,firstDayRef)
					}
				</div>
				<div style={{textAlign:'center',marginTop:'10px'}}>
					<button className="action" onClick={()=>{this.props.changeDate(new Date())}}>Today</button>
				</div>					
			</div>
		)
	}

}

const mstp = state =>({
	date: new Date(state.scores.date)
});
const mdtp = dispatch => ({
	changeDate:changeDate(dispatch)
})

export default connect(mstp,mdtp)(Calendar);