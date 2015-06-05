var cloudinary = Npm.require('cloudinary');

Meteor.methods({
  afCloudinarySign: function (params) {
    check(params, Match.Optional(Object));

    params = params || {};
    params.timestamp = (new Date).getTime();

    return cloudinary.utils.sign_request(params, {
      api_key: Meteor.settings.public.CLOUDINARY_API_KEY,
      api_secret: Meteor.settings.CLOUDINARY_API_SECRET
    });
  }
});
