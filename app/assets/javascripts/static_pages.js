// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

jQuery(document).ready(function ($) {

  $('#playlist-list').hide();

  $("#add-to-playlist-link").on('click', function(){
   $('#playlist-list').show();
  });

  $('#search-button').on('click',function () {
    $('#results').empty();

    var q = $('#top-bar-search').val().trim() + " karaoke";

    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1"

    var api_key = "AIzaSyDX1TrCX_GkuuCFBaQHvVDRc24Rq3HL-Sk"
    var type = "video"

    $.getJSON(url + "&q=" + q + "&type=" + type +"&key=" + api_key, function (json) {

      if (json.items.length === 0) {
        $('#results').text('No video found')
      }

      else {

        var items = json.items;
        var html = "";

        items.forEach(function (item) {

          var id = item.id.videoId
          var title = item.snippet.title
          var content = "contentDetails,statistics"
          var video = '<iframe width="640" height="390" src="http://youtube.com/embed/' + item.id.videoId + '"/>'

          $.getJSON("https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + api_key + "&part=" + content, function(json){

              var duration = (json.items[0].contentDetails.duration).replace("PT","").replace("H",":").replace("M",":").replace("S","")
              var viewCount = json.items[0].statistics.viewCount;
              var likeCount = json.items[0].statistics.likeCount;

              var source = $('#trackTemplate').html();
              var template = Handlebars.compile(source);
              var context = {
                title: title,
                duration: duration,
                video: video,
                viewCount: viewCount,
                likeCount: likeCount
              };

              $('#results').append(template(context));

            })
        });

      }
    });

  
  });



});
