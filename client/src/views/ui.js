var LeagueTable = require("../models/league_table")
var LeagueTableView = require("./league_table_view")
var UpcomingGames = require('../models/upcoming_games.js')
var UpcomingGamesView = require('./upcoming_games_view.js')
var FavouritesList = require('../models/favourites_list.js')
var FavouritesView = require('./favourites_view.js')
var FixturesView = require('./fixtures_view.js')
var FixturesList = require('../models/fixtures_list.js')

var UI = function(link){
  if (object === "favourites"){
    this.object = new Favourites()
    this.objectView = new FavouritesView()
  }

  this.object = null
  this.objectView = null

  if (link === "favourites") {
    this.object = new FavouritesList()
    this.objectView = new FavouritesView()
  } else if (link === "table"){
    this.object = new LeagueTable()
    this.objectView = new LeagueTableView()
  } else if (link === "map") {
    this.object = new FixturesList()
    this.objectView = new FixturesView()
  } else if (link === "upcoming_games")
    this.object = new UpcomingGamesList()
    this.object = new upcoming_games_view()
  }


  this.object.getData(function(objectParam){
    this.objectView.render(objectParam)
  }.bind(this))
}

module.exports = UI