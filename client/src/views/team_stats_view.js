// Requirements
var PlayerList = require("../models/player_list")
var PlayerListView = require("./player_list_view")
var FormList = require("../models/form_list")
var FormListView = require("./form_list_view")


// Constructor
var TeamStatsView = function(){
  this.playerElement = document.querySelector("#player-div")
  this.formElement = document.querySelector("#form-div")
  this.matchElement = document.querySelector("#match-div")
  this.formOption = document.querySelector("#form-selector").value
}

TeamStatsView.prototype = {

  render: function(league){

    // Matches elements to variables
    this.teamSelector = document.querySelector("#team-selector")
    var matchElement = this.matchElement
    var pChooseTeam = document.createElement('p')
    var teams = league.teams.sort()

    var formOption = this.formOption
    // Gets name of team clicked on league table view
    var teamNameLinkedFrom = window.name

    var teamIndexLinkedTo = teams.findIndex(function(team){
      return team.name === teamNameLinkedFrom
    })

    var teamName = teams[teamIndexLinkedTo].name

    this.addChooseTeamText('Select a team:')
    this.generateOptions(teams, teamName)
    this.renderSquadList(teams[teamIndexLinkedTo]._links.players.href, this.playerElement)
    this.renderTeamForm(this.formElement, teams[teamIndexLinkedTo].name, this.formOption, teams[teamIndexLinkedTo]._links.fixtures.href)
    

    this.teamSelector.addEventListener("change",function(){
      
      this.renderSquadList(teams[this.teamSelector.value]._links.players.href, this.playerElement)

      this.renderTeamForm(this.formElement, teams[this.teamSelector.value].name, this.formOption, teams[this.teamSelector.value]._links.fixtures.href)

      while (matchElement.hasChildNodes()) {
        matchElement.removeChild(matchElement.lastChild);
      }
    }.bind(this))

  },

  addChooseTeamText: function(fillerText) {
    var body = document.querySelector('body')
    var pChooseTeam = document.createElement('p')
    pChooseTeam.innerText = fillerText
    body.appendChild(pChooseTeam)
  },

  generateOptions: function(teams, teamName) {
    teams.forEach(function(team,index){
      var teamOption = document.createElement("option")
      teamOption.innerText = team.name
      teamOption.value = index
      if (team.name === teamName) teamOption.selected = "selected"
      this.teamSelector.appendChild(teamOption)
    }.bind(this))
  },

  renderSquadList: function(teamPlayerURL, playerElement, squadList) {
    var teamPlayers = new PlayerList(teamPlayerURL)
    var teamPlayerView = new PlayerListView()
    teamPlayers.getData(function(squadList){
      teamPlayerView.render(squadList,playerElement)
    })
  },

  renderTeamForm: function(formElement, teamName, formOption, fixtures) {
    var teamForm = new FormList(fixtures)
    var teamFormView = new FormListView()
    teamForm.getData(function(fixtures){
      teamFormView.render(fixtures, formElement, teamName, formOption)
    }.bind(this))
  }
}

module.exports = TeamStatsView