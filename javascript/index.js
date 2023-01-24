$(function() {
    const API_ADRESS = "https://spotify-api-wrapper.appspot.com";

    $(".search-button").on("click", getArtist);
    

    function getArtist() {
        let artistQuery = $(".search-field").val();

        fetch(API_ADRESS + "/artist/" + artistQuery)
        .then((response) =>response.json())
        .then((data) => {
            let artist = data.artists.items[0];
            
            
            $(".artist-name").text(artist.name);
            $(".image").attr("src", artist.images[0].url);

            let tracksEndPoint = API_ADRESS + "/artist/" + artist.id + "/top-tracks";
            
            fetch(tracksEndPoint)
            .then((response) =>response.json())
        .then((data) => {
            $(".artist-tracks").empty();
            
            data.tracks.forEach(function(track) {
                let audio = new Audio(track.preview_url);
                audio.setAttribute("controls", true)

                let trackDiv = $("<div class='artist-track'>").text(track.name).appendTo($(".artist-tracks"));
                $(audio).appendTo(trackDiv);
            })
            
        })
        console.log(data);
        })
    }
})