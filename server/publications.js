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

    if (mp.basicMpResp) {
      mp.has_office = true;
      mp.position = mp.office[0].position;
    }

    mp.person_id = basicMpResp.data.person_id;

    var existing = MyMp.findOne({person_id: basicMpResp.data.person_id.toString()});

    console.log(basicMpResp.data.person_id.toString());
    console.log('EXISTING: ');
    console.log(existing);
    
    if (!existing) {

      mp.basic = basicMpResp.data;


      var detailMpResp = HTTP.get('http://www.theyworkforyou.com/api/getMPInfo', {
        params: {
        'id': mp.basic.person_id,
        'output': 'js',
        'key': TWFYAPIKEY
        }
      });

      mp.detail = detailMpResp.data;

      //console.log(mp);
      console.log('Adding: ' + basicMpResp.data.person_id);
      self.added('mp', basicMpResp.data.person_id.toString(), mp);
    } else {
      console.log('EXISTS!!!!!');
    }

    self.ready();

  } catch (error) {
    console.log(error);
  }
});

Meteor.publish('constituency', function(){

});

Meteor.publish('twfySummary', function(){

});