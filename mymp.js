MyMp = new Mongo.Collection('mp');

if (Meteor.isClient) {

  Session.setDefault('searching', false);

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

if (Meteor.isServer) {
  Meteor.publish('twfySearch', function(postcode){
    var self = this;

    try {
      var resp = HTTP.get('http://www.theyworkforyou.com/api/getMP', {
        params: {
          'postcode': postcode,
          'output': 'js',
          'key': TWFYAPIKEY
        }
      });

      var mp = {
        member_id: resp.data.member_id,
        name: resp.data.first_name + ' '  + resp.data.last_name,
        constituency: resp.data.constituency,
        party: resp.data.party,
        twfy: {
          'person-id': resp.data.person_id
        }
      };

      self.added('mp', Random.id(), mp);
      self.ready();

    } catch (error) {
      console.log(error);
    }
  });
}
