if (Meteor.isClient) {

  Session.setDefault('searching', false);
  Session.setDefault('postcode', false);

  Tracker.autorun(function(){
    if(Session.get('postcode')){
      var twfyHandle = Meteor.subscribe('twfySearch', Session.get('postcode'));
      Session.set('searching', !twfyHandle.ready());
    }
  });

  /**
   * Event handlers for the search form
   */
  Template.searchForm.events({
    'submit form': function(event, template) {
      event.preventDefault();
      var postcode = template.$('input[type=text]').val();

      if (postcode) {
        Session.set('postcode', postcode);
      }
    }
  });

  /**
   * Body helper methods
   */
  Template.body.helpers({
    searching: function() {
      return Session.get('searching');
    },
    postcode: function() {
      return Session.get('postcode');
    }
  });

  /**
   * Helpers for the twfySummary template
   */
  Template.twfySummary.helpers({
    mymp: function() {
      return MyMp.findOne({}, {fields: {'full_name': 1, 'party': 1, 'constituency': 1}});
    }
  });

  /**
   * Helper methods for the twfyResults template
   */
  Template.twfyResults.helpers({
    mymp: function() {
      return MyMp.findOne();
    }
  });

  Template.twfyDetails.helpers({
    mymp: function() {
      return MyMp.findOne({personId: Session.get('personId')});
    },
    personId: function() {
      return Session.get('details');
    }
  });
}