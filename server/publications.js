Meteor.publish('twfySearch', function(postcode){
  var self = this;
  var mp = {};

  try {
    var basicMpResp = HTTP.get('http://www.theyworkforyou.com/api/getMP', {
      params: {
        'postcode': postcode,
        'output': 'js',
        'key': TWFYAPIKEY
      }
    });

    mp.basic = basicMpResp.data;

    if (mp.orespDetailffice) {
      mp.has_office = true;
      mp.position = mp.office[0].position;
    }

    var detailMpResp = HTTP.get('http://www.theyworkforyou.com/api/getMPInfo', {
      params: {
      'id': mp.basic.person_id,
      'output': 'js',
      'key': TWFYAPIKEY
      }
    });

    mp.detail = detailMpResp.data;


    console.log(mp);
    self.added('mp', Random.id(), mp);
    self.ready();

  } catch (error) {
    console.log(error);
  }
});

Meteor.publish('constituency', function(){

});

Meteor.publish('twfySummary', function(){

});