"use strict";

const Twitter = require( "twitter" ),
      CONFIG  = require( "./config" ),
      Tweet   = require( "./tweet" );

const client = new Twitter( {
  consumer_key:        CONFIG.TWITTER.ConsumerKey,
  consumer_secret:     CONFIG.TWITTER.ConsumerSecret,
  access_token_key:    CONFIG.TWITTER.AccessTokenKey,
  access_token_secret: CONFIG.TWITTER.AccessTokenSecret
});

const fetcher = ( screenName ) => {
  let params = { screen_name: screenName };

  return client
    .get( "statuses/user_timeline", params )
    .then( ( tweets ) => {
      return new Promise( ( resolve ) => {
        let results = tweets.map( ( tweet ) => {
          return {
            userName: Tweet.userName( tweet ),
            text:     Tweet.text( tweet ),
            extra:    Tweet.extra( tweet )
          }
        });

        resolve( results );
      });
    })
    .catch( ( error ) => {
      return new Promise( ( _, reject ) => {
        let errors;

        if ( typeof error.forEach === "function" ) {
          errors = error;
        }
        else {
          errors = [ error ];
        }

        reject( errors );
      });
    });
};

module.exports = fetcher;
