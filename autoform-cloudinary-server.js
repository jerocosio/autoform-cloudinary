var cloudinary = Npm.require('cloudinary');

Meteor.methods({
  afCloudinarySign: function (params) {
    check(params, Match.Optional(Object));

    params = params || {};
    params.timestamp = (new Date).getTime();

    return cloudinary.utils.sign_request(params, {
      api_key: apiKey(),
      api_secret: apiSecret()
    });
  }
});

apiKey = function () {
  if (! Meteor.settings ||
      ! Meteor.settings.public ||
      ! Meteor.settings.public.CLOUDINARY_API_KEY) {
    throw new Error('Meteor.settings.public.CLOUDINARY_API_KEY is undefined');
  }

  return Meteor.settings.public.CLOUDINARY_API_KEY;
};

apiSecret = function () {
  if (! Meteor.settings ||
      ! Meteor.settings.CLOUDINARY_API_SECRET) {
    throw new Error('Meteor.settings.CLOUDINARY_API_SECRET is undefined');
  }

  return Meteor.settings.CLOUDINARY_API_SECRET;
};
