var FavouritesView = function() {
  this.element = document.querySelector('#favourites')
}

FavouritesView.prototype = {

  render: function(fixtures) {
    for (var fixture of fixtures) {
      console.log(fixture)
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
}


module.exports = FavouritesView