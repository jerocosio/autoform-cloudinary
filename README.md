About
=====

This package lets you use Cloudinary with autoform/simpleschema to easily upload an image to your Cloudinary account, and it automatically saves the url for the image using autoform.

Usage
=====

1. `meteor add cosio55:autoform-cloudinary`

2. Set up settings.json file

```json
{
  "public": {
    "CLOUDINARY_API_KEY": "[YOUR API KEY]",
    "CLOUDINARY_CLOUD_NAME": "[YOUR CLOUD NAME]"
  },

  "CLOUDINARY_API_SECRET": "[YOUR API SECRET]"
}
```

3. Create collection and attach simple schema

```javascript
Images = new Mongo.Collection('images');

Images.attachSchema(new SimpleSchema({
  image: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'cloudinary'
      }
    }
  }
}));
```

4. Create quick form

```html
<template name="imageForm">
  {{> quickForm collection="Images" type="insert" id="add-image"}}
</template>
```

5. Run meteor

`meteor --settings settings.json`
