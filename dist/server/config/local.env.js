'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "axismaker-secret",

  TWITTER_ID: 'app-id',
  TWITTER_SECRET: 'secret',

  GITHUB_ID: '2bc078f24aa1e32e124a',
  GITHUB_SECRET: '40ae696ed3e8e684737c57616524725c571137f0',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
