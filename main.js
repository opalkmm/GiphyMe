$(document).ready(function() {
  console.log("document loaded");

  //function to append button to each string
  var topics = [
    "Halsey",
    "Beyonce",
    "BTS",
    "Taylor Swift",
    "Kanye",
    "Black Pink",
    "Miley Cyrus"
  ];

  function buttonText() {
    //empty  before adding new, otherwise repeat
    $("#buttons").empty();

    //Loop through the array
    for (var i = 0; i < topics.length; i++) {
      var buttons = document.getElementById("buttons");
      var a = document.createElement("BUTTON");
      a.classList.add("myStyle");
      a.innerHTML = topics[i];
      buttons.appendChild(a);
    }
  }
  buttonText();

  //When buttons clicked, grab 10 gif images from the GIPHY API

  $(document).on("click", ".myStyle", function() {
    var clearme = document.getElementById("searchResult");
    clearme.innerHTML = "";
    var artistName = $(this)[0].innerHTML;
    console.log(artistName);
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      artistName +
      "&api_key=zQ6M6BpGKY0Ezqj9I0RBICnbox4HX22T&limit=12";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var result = response.data;

      for (var j = 0; j < result.length; j++) {
        var images = $("<img>");
        images.attr("src", result[j].images.original_still.url); // start at still

        images.attr("data-animate", result[j].images.original.url);
        images.attr("data-still", result[j].images.original_still.url);

        images.attr("data-state", "still");
        images.attr("width", "30%");
        images.addClass("artistGiphy");

        // showDiv.append(images);
        $("#searchResult").append(images);
      }
    });
  });
  // $(document).on("click", ".animal-image"
  $(document).on("click", ".artistGiphy", function() {
    
    var state = $(this).attr("data-state");
    

    if (state == "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else if (state == "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  //take users' input to generate new buttons and ajax calls
  $("#add-artist").on("click", function() {
    //grab the input from the textbox
    var input = $("#artist-input")
      .val()
      .trim();

    // input added to array
    topics.push(input);

    //call the function to generate buttons
    buttonText();
    // to make sure that users can hit "enter" and not move to the next page
    return false;
  });

  //call function to display when hit enter or click submit
});
