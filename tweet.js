"use strict";

const userName = ( tweet ) => {
  return `${ tweet.user.name } @${ tweet.user.screen_name }`;
};

const text = ( tweet ) => {
  let text = tweet.text;

  if ( hasMedia( tweet ) ) {
    tweet.entities.media.forEach( ( media ) => {
      text = text.replace( media.url, "" );
    });
  }

  return text.trim();
};

const extra = ( tweet ) => {
  return Object.assign(
    {},
    media( tweet ),
    hashtags( tweet )
  );
};
const media = ( tweet ) => {
  let set = {};

  if ( hasMedia( tweet ) ) {
    tweet.entities.media.forEach( ( media ) => {
      set[ media.type ] = set[ media.type ] || [];
      set[ media.type ].push( media.media_url_https );
    });
  }

  return set;
};

const hasMedia = ( tweet ) => {
  return tweet.entities.media && tweet.entities.media.length > 0;
};

const hashtags = ( tweet ) => {
  if ( tweet.entities.hashtags.length > 0 ) {
    return {
      hashtags: tweet.entities.hashtags.map( ( hashtag ) => {
        return `#${ hashtag.text }`;
      })
    };
  }
  else {
    return {}
  }
};

module.exports = {
  userName: userName,
  text:     text,
  extra:    extra
}
