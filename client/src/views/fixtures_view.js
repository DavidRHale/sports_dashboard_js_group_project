var FavouritesQuery

var FixturesView = function(favouritesList, mapWrapper) {
  this.element = document.querySelector('#fixtures')
  this.favouritesList = favouritesList
  this.mapWrapper = mapWrapper
  this.scheduledFixtures = null
}

FixturesView.prototype = {

  render: function(fixtures) {
    var fixturesArray = fixtures.fixtures
    this.findUpcomingGames(fixturesArray)

    for (var i = 0; i < this.scheduledFixtures.length; i++) {
      var li = document.createElement('li')
      li.className = 'fixture-list-item'
      this.populateList(this.scheduledFixtures[i], li)
      var button = this.createAddButton(i)
      li.appendChild(button)
      this.element.appendChild(li)
    }

    var coordsRetrieval = this.favouritesList.allCoordinates(function(coordinates){
      this.mapWrapper.render(coordinates)
      return coordinates
    }.bind(this))

  },

  createPtag: function(id, li, label, text) {
    var pTag = document.createElement('p')
    pTag.id = id
    pTag.innerText = label + text
    li.appendChild(pTag)
    return pTag
  },

  populateList: function(fixture, li) {
    var result = this.formatResult(fixture)
    this.createPtag('date', li, 'Date: ', fixture.date)
    this.createPtag('home-team', li, 'Home: ', fixture.homeTeamName)
    this.createPtag('away-team', li, 'Away: ', fixture.awayTeamName)
    this.createPtag('result', li, 'Result: ', result)
  },

  formatResult: function(fixture) {
    if (fixture.result.goalsHomeTeam === null) {
      return "Unplayed"
    }
    resultString = fixture.result.goalsHomeTeam + " - " + fixture.result.goalsAwayTeam
    return resultString
  },

  findUpcomingGames: function(allFixtures) {
    var dateToday = new Date()
    var nextWeek = new Date(dateToday.getTime() + 7 * 24 * 60 * 60 * 1000)
    this.scheduledFixtures = allFixtures.filter(function(fixture) {
      return (new Date(fixture.date) > dateToday) && (new Date(fixture.date) < nextWeek)
    })

    var upcomingGamesStorage = window.JSON.stringify(this.scheduledFixtures)
    localStorage.setItem("storedUpcomingGames", upcomingGamesStorage)

    var visibleUpcomingGamesStorage = JSON.parse(localStorage.getItem('storedUpcomingGames')) || []
  },

  createAddButton: function(index) {
    var button = document.createElement('button')
    button.innerText = 'Add to favourites'
    button.addEventListener('click', function(e) {
      console.log(this.scheduledFixtures[index])
      this.favouritesList.addData(this.scheduledFixtures[index],function(){
        // This function doesn't need to do anything, only here because addData needs a callback
      }.bind(this))
    }.bind(this))
    return button
  }

}


module.exports = FixturesView