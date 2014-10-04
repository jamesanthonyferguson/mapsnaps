var insta = {
  init: function(lat, lon){
    this.lat = lat | 37.7835478;
    this.lon = lon | -122.408953;
  },
  fetch: function() {
    $.ajax({
      url: 'https://api.instagram.com/v1/media/search?lat=' + this.lat + '&lng=' + this.lon + '&access_token=ACCESS_TOKEN',
      type: 'GET',
      dataType: 'jsonp',
      success: function(data){
        console.log("Got some snaps yo" + data);
        var output = []
        for (var i = 0; i < data.data.length; i++) {
          var temp = {}
          temp.loc = data.data[i].location;
          temp.url = data.data[i].images.standard_resolution.url
          // temp.user = data.data[i].caption
          output.push(temp)
        };
        var text = JSON.stringify(output);
        var data = JSON.stringify(data.data[0].caption)
        var $snap = ""
        for (var i = 0; i < output.length; i++) {
          $snap += '<img src=' + output[i].url + ' height="640" width="640">'
        };
        $('#instaFeed').html($snap);

      },
      error: function(data){
        console.error('fetch failed, aww snap');
      }
    })
  }
};

insta.init()
insta.fetch();




