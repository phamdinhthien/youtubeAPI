// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms
// Called automatically when JavaScript client library is loaded.


var API_key = 'AIzaSyCCvjJpZNHMvzSBEs_z84ikqBSZzqvetp8';

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    gapi.client.setApiKey(API_key);
}
var results;
 
// Called when the search button is clicked in the html code
function search() {
    var query = document.getElementById('query').value;
    var lisOfVideos = document.getElementById('list-of-videos');
    var output = "";
    var number = 0;
   
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: query,
        maxResults: 20,
        order: "viewCount"
    });
    // Send the request to the API server, call the onSearchResponse function when the data is returned
    request.execute(function (response) {
        results = response.result;
        console.log(results);
        $.each(results.items, function (i, item) {
           // result.append(item.id.videoId + " " + item.snippet.title + "<br>"
          // item.snippet.thumbnails.default.url
         //);
            console.log(item.snippet.thumbnails.default);
            output += '<div nth="' + number + '" class="one-video"><img class="img-video" src="' + item.snippet.thumbnails.medium.url + '"></img><p>' + item.snippet.title +' </p> </div>';
            number++;
        });
        lisOfVideos.innerHTML = output;


        var video = $('.one-video');
        var iframeVideo = $('#bigFrame');
        var containerShowVideo = $('#container-show-video');
        var showVideo = $('.show-video');

        var showInfo = $('button.show-info');
        var headingVideo = $('.info-video h2');
        var info = $('.info-video .info');
        var bntShowInfo = $('button.show-info h3');
        var brand = $('#container-show-video .brand');

        $(document).ready(function (e) {
            video.click(function (e) {
                chooseVideo($(this));
            });

            showInfo.click(function (e) {
                if (bntShowInfo.html() == 'Info') {
                    bntShowInfo.html('Hide');
                    info.css('display', 'block');
                }
                else {
                    bntShowInfo.html('Info');
                    info.css('display', 'none');
                }
            });
        });


        function chooseVideo(n) {
            showVideo.css('display', 'block');
            var number = n.attr('nth');
            containerShowVideo.css('background', 'white');
            iframeVideo.attr("src", 'https://www.youtube.com/embed/' + results.items[number].id.videoId + '?autoplay=1');
            brand.css('display', 'none');
            headingVideo.html(results.items[number].snippet.title);
            info.html(results.items[number].snippet.description);
        }


    });
}
// Triggered by this line: request.execute(onSearchResponse);
