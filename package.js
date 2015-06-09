Package.describe({
  name: 'cosio55:autoform-cloudinary',
  git: 'https://github.com/cosio55/autoform-cloudinary.git',
  summary: 'Use Cloudinary with autoform/simpleschema to upload an image, and save the url on the collection.',
  version: '0.0.1'
});

Package.onUse(function (api) {
  Npm.depends({
    cloudinary: '1.2.1'
  });
  
  api.versionsFrom( '1.0' );

  api.use([
    'templating',
    'reactive-var',
    'underscore',
    'nekojira:cloudinary-jquery-upload',
    'aldeed:autoform@5.3.0'
  ], 'client');

  api.addFiles([
    'autoform-cloudinary.html',
    'autoform-cloudinary.css',
    'autoform-cloudinary.js'
  ], 'client');

  api.addFiles([
    'autoform-cloudinary-server.js'
  ], 'server');
});
