var assert = require('assert')
var Fixture = require('../fixture.js')
var ObjectId = require('mongodb').ObjectId

describe('Fixture', function() {

  var fixture

  beforeEach(function() {
    fixture = new Fixture({
      "_id" : ObjectId("58fa209f94a9e26b3fb1897c"),
      "_links": {
        "self": {
          "href": "http://api.football-data.org/v1/fixtures/150841"
        },
        "competition": {
          "href": "http://api.football-data.org/v1/competitions/426"
        },
        "homeTeam": {
          "href": "http://api.football-data.org/v1/teams/322"
        },
        "awayTeam": {
          "href": "http://api.football-data.org/v1/teams/338"
        }
      },
      "date": "2016-08-13T11:30:00Z",
      "status": "FINISHED",
      "matchday": 1,
      "homeTeamName": "Hull City FC",
      "awayTeamName": "Leicester City FC",
      "result": {
        "goalsHomeTeam": 2,
        "goalsAwayTeam": 1
      },
      "odds": {
        "homeWin": 3.25,
        "draw": 3.25,
        "awayWin": 2.2
      }
    })
  })


    it('should have a links object', function() {
      assert.deepEqual({
        "self": {
          "href": "http://api.football-data.org/v1/fixtures/150841"
        },
        "competition": {
          "href": "http://api.football-data.org/v1/competitions/426"
        },
        "homeTeam": {
          "href": "http://api.football-data.org/v1/teams/322"
        },
        "awayTeam": {
          "href": "http://api.football-data.org/v1/teams/338"
        }}, fixture["_links"])
    })

    it('should have a date', function() {
      assert.strictEqual("2016-08-13T11:30:00Z", fixture.date)
    })

    it('should have a status', function() {
      assert.strictEqual("FINISHED", fixture.status)
    })

    it('should have a matchday', function() {
      assert.strictEqual(1, fixture.matchday)
    })

    it('should have a homeTeamName', function() {
      assert.strictEqual("Hull City FC", fixture.homeTeamName)
    })

    it('should have an awayTeamName', function() {
      assert.strictEqual("Leicester City FC", fixture.awayTeamName)
    })

    it('should have a result', function() {
      assert.deepEqual({
        "goalsHomeTeam": 2,
        "goalsAwayTeam": 1
      }, fixture.result)
    })

    it('should have odds', function() {
      assert.deepEqual({
        "homeWin": 3.25,
        "draw": 3.25,
        "awayWin": 2.2
      }, fixture.odds)
    })

    it('has an objectID', function() {
      assert.deepEqual(ObjectId("58fa209f94a9e26b3fb1897c"), fixture._id)
    })

})