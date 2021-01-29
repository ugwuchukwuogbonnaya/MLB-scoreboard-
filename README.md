# MLB Scoreboard

IDEAMASN Test
Given the following JSON API feed...

http://gd2.mlb.com/components/game/mlb/year_2015/month_07/day_28/master_scoreboard.json
Create a simple MLB scoreboard that displays the team names and scores for each of the games on a given day.

You can use vanilla JavaScript, Angular, Backbone, or whatever you feel most comfortable with.

API Documentation
The data comes back in the following format: [payload] -> "data" -> "games" - > "game"

The "game" object can either be an array if there are multiple games played on a single day or it can be a regular object if there is only 1 game played on that day

The inner game object will contain a variety of fields but the most relevant being...

"home_team_name" - String - Name of the home team

"away_team_name" - String - Name of the away team

"status" - Object - Status of the game example ("Final", "Postponed", "Cancelled")

"linescore" - Object - Score of the game ("linescore" -> "r" -> "home" or "away" is how you get the runs for the game)

Requirements
Screen 1. List View - Games
A list of baseball games is displayed for a given day, with home/away team names and scores + statuses, allows user to toggle between dates (next day, previous day) or select a day
Because the Toronto Blue Jays is our favourite team, we want them to show up first in the list view every time
If there are no games on that date make sure to display a message ("No games today")
Bold or highlight the winning team (team with more runs)
Screen 2. Detail View - Game
Using the data from "{game_data_directory}/boxscore.json" populate a detail screen for the game when you click the game
The detail screen should display a linescore of the game (inning by inning)
It should also display a list of batters and stats for each team, and allow you to toggle between viewing either team's batters
When you're done viewing the details of the game, you should be able to go back to the list of games where you last left off
Pro Tips
Take a look at this example for reference on how to layout the first screen of the app
Take a look at this example for reference on how to layout the detail screen
Bonus Points
Allow for a different team, other than the Blue Jays to be selected as the favourite
Dig through the MLB API figure out what other kinds of features you can add (ex. scoreboard, or stats)
Test Cases
Make sure your app can handle these dates

October 29th, 2014
March 29th, 2014
July 15th, 2014
July 14th, 2014

![Screenshot of MBL Scoreboard Web App](./project_screenshots)

Major league baseball scoreboard created using React

## Running the App

Use ``npm install`` to install the dependencies followed by ``npm start`` to run the web app. 