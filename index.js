"use strict";
const fetcher = require( "./fetcher" );

exports.handler = function( event, context, callback ) {
  console.log( event );

  fetcher( "Rakuten_Panda" )
    .then( ( results ) => {
      callback( null, { results: results } );
    })
    .catch( ( errors ) => {
      callback( null, { errors: errors } );
    });
};
