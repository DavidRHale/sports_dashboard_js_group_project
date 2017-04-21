
// var MapWrapper = require('./map_wrapper.js')
var UpcomingGames = require('./upcoming_games.js')

var UpcomingGamesView = require('./upcoming_games_view.js')

window.onload = function(){

  var upcomingGames = new UpcomingGames('http://api.football-data.org/v1/competitions/426/fixtures')


  upcomingGames.getData(function(games){
    console.log(games)
    var list = document.querySelector('ul')
    var upcomingGamesView = new UpcomingGamesView(list, games)
    upcomingGamesView.populate();
  })

}

var LeagueTable = require("./models/league_table")
var LeagueTableView = require("./views/league_table_view")

var app = function(){
  console.log("working in app.js")

  // var leagueTable = new LeagueTable()
  // var leagueTableView = new LeagueTableView()

  var leagueTable = new LeagueTable()
  var leagueTableView = new LeagueTableView()

  leagueTable.getData(function(table){
    leagueTableView.render(table)
  })

}

window.onload = app

