// Instantiate the wrapper
var spotifyApi = new SpotifyWebApi();

// Set the variables

var trackId ='';
var genre ='';
var artist ='';
var artist_id ='';
var album_art ='';
var preview_url ='';

// Array of trackIds
var trackIdArray = ['6lEIjrQNwJPecJ7mMXjhjo', '6pjtY01rXw5UMuZvqyFIa5', '2ySKRXKN58cbIlY1cxd80y'];


// Run on start of game
function spotifyUpdate() {

    // Select track
      var randomTrack = locArray[i].trackId;


      var albumCover = $("<img>");
    // Call to Spotify Api
      spotifyApi.getTrack(randomTrack, {}, function(err, data) {

    // If error returned
        if
          (err) console.error(err);
    // If return is successful
        else

    // Console log data and display paths to objects
          //console.log(data);
          artist = data.artists[0].name;
          //console.log('Artist: ' + artist);
          // Insert artist name into Hint
          $('#hint').text('Artist: ' + artist);
          artist_id = data.artists[0].id;
          //console.log('Artist ID: ' + artist_id);
          album_art = data.album.images[0].url;
          albumCover.attr("src", data.album.images[0].url);
          //console.log('Album Art: ' + album_art);
          preview_url = data.preview_url;
          //console.log('Mp3 Preview: ' + preview_url);
          // Insert mp3 URL into <audio>
          $('#audio-player').attr('src', preview_url);
      });

    $('#album').html(albumCover);
    // The following needs to run asynchronous
      spotifyApi.getArtist(artist_id, {limit: 1}, function(err, data) {
        if
          (err) console.error(err);
        else
          genre = data.genres;
          console.log('Genre: ' + genre);
          $('#genre').text('Genre: ' + genre);
      });
}
