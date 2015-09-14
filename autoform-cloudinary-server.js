var cloudinary = Npm.require('cloudinary');

if (process.env.CLOUDINARY_URL) {
  var cloudinaryURL = new URI(process.env.CLOUDINARY_URL);
}

Meteor.methods({
  afCloudinarySign: function (params) {
    check(params, Match.Optional(Object));

    params = params || {};
    params.timestamp = (new Date).getTime();

    return cloudinary.utils.sign_request(params, {
      api_key: apiKey(),
      api_secret: apiSecret()
    });
  },
  publicCredentials: function() {
    if (cloudinaryURL) {
      return {
        cloudName: apiHost(),
        apiKey: apiKey()
      }
    }
  }
});

apiHost = function() {
  if (cloudinaryURL) {
    return cloudinaryURL.hostname();
  }
};

apiKey = function () {
  if (cloudinaryURL) {
    return cloudinaryURL.username();
  }

  if (! Meteor.settings ||
      ! Meteor.settings.public ||
      ! Meteor.settings.public.CLOUDINARY_API_KEY) {
    throw new Error('Meteor.settings.public.CLOUDINARY_API_KEY is undefined');
  }

  return Meteor.settings.public.CLOUDINARY_API_KEY;
};

apiSecret = function () {
  if (cloudinaryURL) {
    return cloudinaryURL.password();
  }

  if (! Meteor.settings ||
      ! Meteor.settings.CLOUDINARY_API_SECRET) {
    throw new Error('Meteor.settings.CLOUDINARY_API_SECRET is undefined');
  }

  return Meteor.settings.CLOUDINARY_API_SECRET;
};
