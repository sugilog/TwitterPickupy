"use strict";

const fetcher = require( "./fetcher" ),
      line    = require( "./line" );

module.exports.twitter = ( event, context, callback ) => {
  fetcher( "Rakuten_Panda" )
    .then( ( results ) => {
      callback( null, { statusCode: 200, body: JSON.stringify( { results: results, input: event } ) } );
    })
    .catch( ( errors ) => {
      callback( null, { statusCode: 500, body: JSON.stringify( { errors: errors, input: event } ) } );
    });
};

module.exports.line = ( event, context, callback ) => {
  const account = "Rakuten_Panda",
        body = JSON.parse( event.body );

  fetcher( account )
    .then( ( results ) => {
      const message = line.carousel( results );
      line.reply( message, body.events[0].replyToken )
        .then( ( results ) => {
          callback( null, { statusCode: 200, body: JSON.stringify( { results: results, messages: message, input: event } ) } );
        })
        .catch( ( errors ) => {
          console.log( errors );
          callback( null, { statusCode: 500, body: JSON.sttingify( { errors: errors, input: event } ) } );
        });
    })
    .catch( ( errors ) => {
      console.log( errors );
      callback( null, { statusCode: 500, body: JSON.sttingify( { errors: errors, input: event } ) } );
    });
};
