Package.describe({
  name: 'cosio55:autoform-cloudinary',
  git: 'https://github.com/cosio55/autoform-cloudinary.git',
  summary: 'This package lets you use Cloudinary with autoform/simpleschema to easily upload an image to your Cloudinary account, and it automatically saves the url for the image using autoform.',
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
    'autoform-cloudinary.css',
    'autoform-cloudinary.js'
  ], 'client');

  api.addFiles([
    'autoform-cloudinary-server.js'
  ], 'server');
});
