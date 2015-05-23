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

    console.log(resp);
    var mp = resp.data;
    if (mp.office[0].position) {
      mp.has_office = true;
      mp.position = mp.office[0].position;
    }
    console.log(mp);
    self.added('mp', Random.id(), mp);
    self.ready();

  } catch (error) {
    console.log(error);
  }
});