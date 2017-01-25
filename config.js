const TWITTER = {
  ConsumerKey:       process.env.TWITTER_CONSUMER_KEY,
  ConsumerSecret:    process.env.TWITTER_CONSUMER_SECRET,
  AccessTokenKey:    process.env.TWITTER_ACCESS_TOKEN_KEY,
  AccessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

const LINE = {
  ChannelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
}

module.exports = {
  TWITTER: TWITTER,
  LINE: LINE
}
