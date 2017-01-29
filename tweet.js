"use strict";

class Tweet {
  constructor( entry ) {
    let media = Tweet.toMedia( entry );
    this.userName = Tweet.toUserName( entry );
    this.screenName = entry.user.screen_name;
    this.text = Tweet.toText( entry );
    this.photo = media.photo;
    this.hashTags = Tweet.toHashTags( entry );
  }

  hasPhoto() {
    return this.photo && this.photo[ 0 ];
  };

  shortText( limit ) {
    const suffix = "...",
          spliceLimit = limit - suffix.length;

    if ( this.text.length < limit ) {
      return this.text;
    }
    else {
      return this.text.split( "" ).splice( 0, spliceLimit ).join( "" ) + suffix;
    }
  }

  accountURL() {
    return `https://twitter.com/${ this.screenName }`;
  }

  static toUserName( entry ) {
    return `${ entry.user.name } @${ entry.user.screen_name }`;
  }

  static toText( entry ) {
    let text = entry.text;

    if ( Tweet.hasMedia( entry ) ) {
      entry.entities.media.forEach( ( media ) => {
        text = text.replace( media.url, "" );
      });
    }

    return text.trim();
  }

  static toMedia( entry ) {
    let set = {};

    if ( Tweet.hasMedia( entry ) ) {
      entry.entities.media.forEach( ( media ) => {
        set[ media.type ] = set[ media.type ] || [];
        set[ media.type ].push( media.media_url_https );
      });
    }

    return set;
  };

  static hasMedia( entry ) {
    return entry.entities.media && entry.entities.media.length > 0;
  }

  static toHashTags( entry ) {
    if ( entry.entities.hashtags.length > 0 ) {
      return {
        hashtags: entry.entities.hashtags.map( ( hashtag ) => {
          return `#${ hashtag.text }`;
        })
      };
    }
    else {
      return {}
    }
  };
}

module.exports = Tweet;
