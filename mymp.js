if (Meteor.isClient) {

  Session.setDefault('searching', false);
  Session.setDefault('postcode', false);

  Tracker.autorun(function(){
    if(Session.get('postcode')){
      var twfyHandle = Meteor.subscribe('twfySearch', Session.get('postcode'));
      Session.set('searching', !twfyHandle.ready());
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
    searching: function() {
      return Session.get('searching');
    }
  });

  Template.twfyResults.helpers({
    mymp: function() {
      return MyMp.findOne();
    }
  });
}