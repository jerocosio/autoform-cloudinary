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
    var self = this;

    self.url = new ReactiveVar();

    self.initialValueChecked = false;
    self.checkInitialValue = function () {
      Tracker.nonreactive(function () {
        if (! self.initialValueChecked && ! self.url.get() && self.data.value) {
          self.url.set(self.data.value);
          self.initialValueChecked = true;
        }
      });
    };
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
      Tracker.flush();
    });

    self.$(self.firstNode).closest('form').on('reset', function () {
      self.url.set(null);
    });
  });

  Template[tmpl].helpers({
    url: function () {
      var t = Template.instance();

      t.checkInitialValue();
      return t.url.get();
    },

    accept: function () {
      return this.atts.accept || 'image/*';
    }
  });

  Template[tmpl].events({
    'click button': function (e, t) {
      t.$('input[name=file]').click();
    },

    'click .js-remove': function (e, t) {
      e.preventDefault();
      t.url.set(null);
    }
  });
});
