if (Meteor.isClient) {

  MyMp = new Mongo.Collection('mymp');

  Session.setDefault('searching', false);

  Tracker.autorun(function(){
    if(Session.get('postcode')){
      var twfyHandle = Meteor.subscribe('twfySearch', Session.get('postcode'));
      Session.set('searching', ! twfyHandle.ready());
    }
  });



  Template.searchForm.events({
    'submit form': function(event, template) {
      event.preventDefault();
      var postcode = template.$('input[type=text]').val();

      if (postcode) {
        Session.set('postcode', postcode);
      }
    }
  });

  Template.body.helpers({
    mymp: function() {
      return MyMp.find();
    },
    searching: function() {
      return Session.get('searching');
    }
  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish('twfySearch', function(postcode){

    console.log(postcode);
    var self = this;
    var APIKEY = '';

    try {
      var resp = HTTP.get('http://www.theyworkforyou.com/api/getMP', {
        params: {
          'postcode': postcode,
          'output': 'js',
          'key': APIKEY
        }
      });
      console.log(resp);

      self.added('mymp', Random.id(), resp);
      self.ready();

    } catch (error) {
      console.log(error);
    }
  });
}
