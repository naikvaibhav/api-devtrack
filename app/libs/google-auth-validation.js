const GOOGLE_CLIENT_ID =
  "19394797597-btfag72i88oidesh6aujhmr748i26qrb.apps.googleusercontent.com";
const { OAuth2Client } = require("google-auth-library");
var client = new OAuth2Client(GOOGLE_CLIENT_ID, "", "");

//return a promise with user informations
module.exports.getGoogleUser = (code) => {
  //verify the token using google client
  return client
    .verifyIdToken({ idToken: code, audience: GOOGLE_CLIENT_ID })
    .then((login) => {
      //if verification is ok, google returns a jwt
      var payload = login.getPayload();
      var userid = payload["sub"];

      //check if the jwt is issued for our client
      var audience = payload.aud;
      if (audience !== GOOGLE_CLIENT_ID) {
        throw new Error(
          "error while authenticating google user: audience mismatch: wanted [" +
            GOOGLE_CLIENT_ID +
            "] but was [" +
            audience +
            "]"
        );
      }
      //promise the creation of a user
      return {
        name: payload["name"], //profile name
        pic: payload["picture"], //profile pic
        id: payload["sub"], //google id
        email_verified: payload["email_verified"],
        email: payload["email"],
      };
    })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      //throw an error if something gos wrong
      console.log(err.message);
      throw new Error(
        "error while authenticating google user: " + JSON.stringify(err)
      );
    });
};
