var FixturesView = function() {
  this.element = document.querySelector('#fixtures')
}

FixturesView.prototype = {

  render: function(fixtures) {
    console.log('favs: ', fixtures)
    var fixturesArray = fixtures.fixtures
    for (var fixture of fixturesArray) {
      var li = document.createElement('li')
      this.populateList(fixture, li)
      this.element.appendChild(li)
    }
  },

  createPtag: function(id, li, label, text) {
    var pTag = document.createElement('p')
    pTag.id = id
    pTag.innerText = label + text
    li.appendChild(pTag)
    return pTag
  },

  populateList: function(fixture, li) {
    var pDate = this.createPtag('date', li, 'Date: ', fixture.date)
    var pHomeTeam = this.createPtag('home-team', li, 'Home: ', fixture.homeTeamName)
    var pAwayTeam = this.createPtag('away-team', li, 'Away: ', fixture.awayTeamName)
    var result = this.formatResult(fixture)
    var pResult = this.createPtag('result', li, 'Result: ', result)
  },

  formatResult: function(fixture) {
    if (fixture.result.goalsHomeTeam === null) {
      return "Unplayed"
    }
    resultString = fixture.result.goalsHomeTeam + " - " + fixture.result.goalsAwayTeam
    return resultString
  }
}


module.exports = FixturesView