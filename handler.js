"use strict";
const fetcher = require( "./fetcher" );

module.exports.twitter = ( event, context, callback ) => {
  fetcher( "Rakuten_Panda" )
    .then( ( results ) => {
      callback( null, { statusCode: 200, body: JSON.stringify( { results: results, input: event } ) } );
    })
    .catch( ( errors ) => {
      callback( null, { statusCode: 500, body: JSON.stringify( { errors: errors, input: event } ) } );
    });
};
