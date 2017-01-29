"use strict";

const https       = require( "https" ),
      CONFIG      = require( "./config" ),
      CAROUSEL_LIMIT = 5,
      TEXT_LIMIT     = 60;

const reply = ( message, replyToken ) => {
  const postData = JSON.stringify( {
          replyToken: replyToken,
          messages:   [ message ]
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
      let body = ""

      response.on( "data", ( data ) => {
        body += data;
      });

      response.on( "end", () => {
        if ( response.statusCode === 200 ) {
          resolve( {
            success:    true,
            statusCode: response.statusCode,
            headers:    response.headers,
            body:       body
          });
        }
        else {
          reject( {
            success:    false,
            statusCode: response.statusCode,
            headers:    response.headers,
            body:       body
          });
        }
      });
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

const carousel = ( tweets ) => {
  let columns = [];

  tweets.forEach( ( tweet, index ) => {
    if ( index < CAROUSEL_LIMIT ) {
      let message = {
        thumbnailImageUrl: ( tweet.hasPhoto() ? tweet.photo[ 0 ] : "https://s3-ap-northeast-1.amazonaws.com/sugilog/serverless-resources/Twitter_Logo_White_On_Blue.png" ),
        title:   tweet.userName,
        text:    tweet.shortText( TEXT_LIMIT ),
        actions: [ {
          type:  "uri",
          label: "View detail",
          uri:   tweet.accountURL()
        }]
      };

      console.dir( message, { depth: null } );
      columns.push( message );
    }
  });

  return {
    type:     "template",
    altText:  "Twitter Tweets",
    template: {
      type:    "carousel",
      columns: columns
    }
  };
};

module.exports = {
  reply:    reply,
  carousel: carousel
}
