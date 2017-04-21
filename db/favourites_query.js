var MongoClient = require('mongodb').MongoClient

var FavouritesQuery = function(){
  this.url = 'mongodb://localhost:27017/sports_dashboard'
}

FavouritesQuery.prototype = {

  all: function(onQueryFinished) {
    MongoClient.connect(this.url, function(err, db) {
      if(db) {
        var collection = db.collection('favourites')
        collection.find().toArray(function(err, data) {
          onQueryFinished(data)
        })
      }
    })
  },

  // add: function(newFavourite, onQueryFinished) {
  //   MongoClient.connect(this.url, function(err, db) {
  //     if(db) {
  //       var collection = db.collection('favourites')
  //       collection.insert(newFavourite)
  //     }
  //   })
  // }

  }


module.exports = FavouritesQuery