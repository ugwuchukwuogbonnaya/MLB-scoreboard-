/**
 * Contains the redux actions used to fetch data from the mlb api
 */

import {createAction} from 'redux-actions';
import * as Constants from './constants';

let modifyDate = createAction(Constants.DATE_CHANGED,(date)=>date); // update the date 
let modifyScores = createAction(Constants.SCORES_GET_SUCCESS); // got the scores from the server, update it
let requestScores = createAction(Constants.REQUEST_SCORES); // request the scores from the server
let requestScoresFailure = createAction(Constants.SCORES_GET_FAILURE); // there was an issue retrieving the scores from the server
export let changeDate = dispatch => (nDate) =>{	
	dispatch(modifyDate(nDate)); // change the date

	var url = "http://gd2.mlb.com/components/game/mlb";
	url = url + "/year_" + nDate.getFullYear();
	url = url + "/month_" + (nDate.getMonth() + 1 < 10? "0" :"") + (nDate.getMonth() + 1);
	url = url + "/day_" + (nDate.getDate() < 10 ? "0" : "") + nDate.getDate();
	url += "/master_scoreboard.json"; // build the url
	dispatch(requestScores()); // let the user know that the data is being fetched
	fetch(url)
	.then((response)=>response.json()) // convert to json
	.then((json)=>{
		dispatch(modifyScores(json.data.games)); // update the data
	})
	.catch((error)=>{
		dispatch(requestScoresFailure()); // there was an issue, let the user know
		console.log(error); // print the error
	});
	
}

let requestDetails = createAction(Constants.REQUEST_DETAILS); // used when we're requesting details
let requestDetailsSuccess = createAction(Constants.DETAILS_GET_SUCCESS); // got the information from the server, update it
let requestDetailsFailure = createAction(Constants.DETAILS_GET_FAILURE); // there was an information retrieving the details from the server
export let getDetails = dispatch => (dataDirectory)=>{
	dispatch(requestDetails());
	 var url = "http://gd2.mlb.com" + dataDirectory + "/boxscore.json"; // build the url
	//var url = "http://gd2.mlb.com" + dataDirectory + "/master_scoreboard.json"; // build the url
	fetch(url)
	.then((response)=>response.json()) // convert to json
	.then((json)=>{
		dispatch(requestDetailsSuccess(json.data.boxscore)); // got the details, update the redux store
	})
	.catch((error)=>{
		dispatch(requestDetailsFailure()); // failed to get the details, update the store
		console.log(error);
	})
}

export let constants = Constants;