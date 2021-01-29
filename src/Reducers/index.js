/**
 * Contains the reducers to be used by the application for the redux store
 */

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'; // the reducer for navigation
import {constants} from '../Actions';

// Reducer for game inning scoreboard
const details = (
	state = {
		data: {},
		fetching: false,
		error: false
	},
	action
)=>{
	switch(action.type){
		case constants.REQUEST_DETAILS:
		return {
			...state,
			fetching: true,
			error: false
		}		
		case constants.DETAILS_GET_FAILURE:
		return {
			...state,
			fetching: false,
			error: true
		}
		case constants.DETAILS_GET_SUCCESS:
		return {
			...state,
			fetching: false,
			data: action.payload
		}
		default:
		return state;
	}
}

// Reducer for game date, and list of games that occured on that date
const scores = (
	state = {
		date:new Date(),
		games:{
			game:[]
		},
		fetching: false,
		error: false
	},
	action
)=>{
	switch(action.type){		
		case constants.DATE_CHANGED:
		return {
			...state,
			error: false,
			date: action.payload
		}		
		case constants.REQUEST_SCORES:
		return {
			...state,
			error: false,
			fetching: true
		}
		case constants.SCORES_GET_SUCCESS:
		return {
			...state,
			fetching: false,
			error: false,
			games: action.payload
		}
		case constants.SCORES_GET_FAILURE:
		return {
			...state,
			error: true
		}
		default: 
		return state;
	}
}

export default combineReducers({scores, details, routing: routerReducer});