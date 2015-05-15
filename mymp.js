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
}
