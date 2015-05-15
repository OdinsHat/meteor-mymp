if (Meteor.isClient) {

  MyMp = new Mongo.Collection('mymp');
  
  Session.setDefault('searching', false);

  Meteor.subscribe('mymp');

  Template.searchForm.events({
    'submit form': function(event, template) {
      event.preventDefault();
      var postcode = template.$('input[type=text]').val();
      if (postcode) {
        Session.set('postcode', postcode);
      }
    }
  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
