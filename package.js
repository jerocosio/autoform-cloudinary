Package.describe({
  name: 'autoform-cloudinary',
  version: '0.0.1'
});

Package.onUse(function (api) {
  Npm.depends({
    cloudinary: '1.2.1'
  });

  api.use([
    'templating',
    'reactive-var',
    'underscore',
    'nekojira:cloudinary-jquery-upload',
    'aldeed:autoform@5.3.0'
  ], 'client');

  api.addFiles([
    'autoform-cloudinary.html',
    'autoform-cloudinary.js'
  ], 'client');

  api.addFiles([
    'autoform-cloudinary-server.js'
  ], 'server');
});
