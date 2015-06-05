AutoForm.addInputType('cloudinary', {
  template: 'afCloudinary',

  valueOut: function () {
    return this.val();
  }
});

Meteor.startup(function () {
  $.cloudinary.config({
    cloud_name: Meteor.settings.public.CLOUDINARY_CLOUD_NAME,
    api_key: Meteor.settings.public.CLOUDINARY_API_KEY
  });
});

var templates = ['afCloudinary', 'afCloudinary_bootstrap3'];

_.each(templates, function (tmpl) {
  Template[tmpl].onCreated(function () {
    this.url = new ReactiveVar();
    this.filenames = new ReactiveVar();
  });

  Template[tmpl].onRendered(function () {
    var self = this;

    Meteor.call('afCloudinarySign', function (err, res) {
      if (err) {
        return console.log(err);
      }

      self.$('input[name=file]').cloudinary_fileupload({
        formData: res
      });
    });

    self.$('input[name=file]').on('fileuploaddone', function (e, data) {
      self.url.set(data.result.secure_url);
    });

    self.$('input[name=file]').on('fileuploadchange', function (e, data) {
      var filenames = _.map(data.files, function (file) {
        return file.name;
      }).join(', ');
      self.filenames.set(filenames);
    });
  });

  Template[tmpl].helpers({
    url: function () {
      return Template.instance().url.get();
    },

    filenames: function () {
      return Template.instance().filenames.get();
    }
  });

  Template[tmpl].events({
    'click button': function (e, t) {
      t.$('input[name=file]').click();
    }
  });
});
