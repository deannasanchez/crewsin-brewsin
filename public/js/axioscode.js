var queryString = "https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries?by_state=California"
$.ajax({
  method: "GET",
  url: queryString,
  headers: {
    "x-rapidapi-host": "brianiswu-open-brewery-db-v1.p.rapidapi.com",
    "x-rapidapi-key": "4c2c648dcfmsh26fbd934be4b150p1a0be1jsn56e7feae726d"
  },
}).then(
  function (response) {
    console.log(response)
  });


var apiUrl = "https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries?by_city="



function getBreweryData(input) {
  $.ajax(apiUrl + input, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "brianiswu-open-brewery-db-v1.p.rapidapi.com",
      "x-rapidapi-key": "4c2c648dcfmsh26fbd934be4b150p1a0be1jsn56e7feae726d"
    }
  })
    .then(function (response) {
      var sideBar = $("#search-results");
      sideBar.empty();
      var obj = {
        name: response[0].name,
        addy: response[0].street,
        city: response[0].city,
        state: response[0].state,
        web: response[0].website_url
      }
      console.log(obj)
      $.post("/api/saved", obj)
      for (var i = 0; i < response.length; i++) {
        var sideBarChild = $("<div id = 'sidebar-div'>" + (parseInt(i) + 1) + "." + " Name: " + response[i].name + "<br>" + "Address: " + response[i].street + "<br>" + response[i].city + "<br>" + response[i].state + "<br>" + "Website: " + "<a href=" + response[i].website_url + ">" + response[i].website_url + "</a>" + "</div> <br>");
        sideBarChild.css('display', 'none');
        sideBar.append(sideBarChild);
        sideBarChild.show('slow');
        /////////////////////
        var tLocaton = new google.maps.LatLng(parseFloat(response[i].latitude), parseFloat(response[i].longitude));
        var tMarker = new google.maps.Marker({
            position: tLocaton,
            map: map,
            // icon: "./img/beer.png"
        });
        gmarkers.push(tMarker)
      } 
    })
  } 


      // for (var i = 0; i < response.length; i++) {
      //   console.log(response[i].name);
      //   //$("#search-results").append(response.forms[0].city);
      // }
      // .catch(function (error) {
      //   return error
      // });
  // }
