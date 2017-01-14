"use strict";

const Twitter = require( "twitter" ),
      CONFIG  = require( "./config" ),
      Tweet   = require( "./tweet" );

const client = new Twitter( CONFIG.twitter );
var params = { screen_name: "Rakuten_Panda" };

client
  .get( "statuses/user_timeline", params )
  .then( ( tweets ) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    let index = Math.floor( Math.random() * tweets.length ),
        tweet = tweets[ index ];

    console.log( Tweet.userName( tweet ) );
    console.log( Tweet.text( tweet ) );
    console.log( Tweet.extra( tweet ) );
  })
  .catch( ( errors ) => {
    if ( typeof errors.forEach === "function" ) {
      errors.forEach( ( message ) => {
        console.log( message );
      });
    }
    else {
      console.log( errors );
    }
  });
