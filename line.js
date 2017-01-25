"use strict";

const https       = require( "https" ),
      querystring = require( "querystring" ),
      CONFIG      = require( "./config" );

const reply = ( message, replyToken ) => {
  const postData = querystring.stringify( {
          replyToken: replyToken,
          messages:   message
        }),
        options = {
          hostname: "api.line.me",
          port:     443,
          path:     "/v2/bot/message/reply",
          method:   "POST",
          headers:  {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + CONFIG.LINE.ChannelAccessToken,
            "Content-Length": Buffer.byteLength( postData )
          }
        };

  return new Promise( ( resolve, reject ) => {
    let request = https.request( options, ( response ) => {
      if ( response.statusCode === 200 ) {
        resolve( {
          success:    true,
          statusCode: response.statusCode,
          headers:    response.headers
        });
      }
      else {
        reject( {
          success:    false,
          statusCode: response.statusCode,
          headers:    response.headers
        });
      }
    });

    request.on( "error", ( error ) => {
      reject( {
        success: false,
        message: error.message
      });
    });

    request.write( postData );
    request.end();
  });
};

module.exports = {
  reply: reply
}
