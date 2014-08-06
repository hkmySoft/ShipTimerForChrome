OAuth2.adapter('google', {
  authorizationCodeURL: function(config) {
    return ('https://accounts.google.com/o/oauth2/auth?' +
      'approval_prompt=auto&' +
      'client_id=596857451248-ink6lpctnh0h6h2ttkoljvp7punvij1n.apps.googleusercontent.com&' +
      'redirect_uri={{REDIRECT_URI}}&' +
      'scope=https://www.googleapis.com/auth/userinfo.profile&' +
      'response_type=code')
        .replace('{{REDIRECT_URI}}', this.redirectURL(config));
  },

  redirectURL: function(config) {
    return 'http://www.google.com/robots.txt';
  },

  parseAuthorizationCode: function(url) {
    var error = url.match(/[&\?]error=([^&]+)/);
    if (error) {
      throw 'Error getting authorization code: ' + error[1];
    }
    return url.match(/[&\?]code=([\w\/\-]+)/)[1];
  },

  accessTokenURL: function() {
    return 'https://accounts.google.com/o/oauth2/token';
  },

  accessTokenMethod: function() {
    return 'POST';
  },

  accessTokenParams: function(authorizationCode, config) {
    return {
      code: authorizationCode,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: this.redirectURL(config),
      grant_type: 'authorization_code'
    };
  },

  parseAccessToken: function(response) {
    var parsedResponse = JSON.parse(response);
    return {
      accessToken: parsedResponse.id_token,
      refreshToken: parsedResponse.refresh_token,
      expiresIn: parsedResponse.expires_in
    };
  }
});
