var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope) {

    $scope.results = [];

    var testQuery = "starcraft";

    $(document).ready(function() {
      search(testQuery);
      $(".se-pre-con").fadeOut(2000);
    });

    $("button").on("click", function() {
      console.log("Worked.");
      if($("#search-input").val().length){
        $(".se-pre-con").show();
        var query = $("#search-input").val();
        $scope.results = [];
        search(query);
        $(".se-pre-con").fadeOut(2000);
      }else{
        console.log("Nothing searched.");
      }
    });

    function search(query){
      var url_query = "https://api.twitch.tv/kraken/search/streams?query=" + encodeURI(query) + "&limit=50&client_id=z54qmsb43vtv9h2i1amfefgpp85rpp";
      $.getJSON(url_query, function(qry) {
        if(qry._total === 0){
          console.log("Query term not found.");
        }
      for(var i = 0; i < qry.streams.length; i++){
          $scope.$apply(function() {
            $scope.results.push(qry._total);
            $scope.results.push({'name' : qry.streams[i].channel.name});
            $scope.results.push({'game' : qry.streams[i].channel.game});
            $scope.results.push({'language' : qry.streams[i].channel.language});
            $scope.results.push({'status' : qry.streams[i].channel.status});
            $scope.results.push({'followers' : qry.streams[i].channel.followers});
            $scope.results.push({'preview' : qry.streams[i].preview.medium});
            $scope.results.push({'viewers' : qry.streams[i].viewers});
            $scope.results.push({'url' : qry.streams[i].channel.url});
            $scope.results.push({'row' : "Stream: " + qry.streams[i].channel.name + " | Game: " + qry.streams[i].channel.game
             + " | Followers: " + qry.streams[i].channel.followers});
          });
        }
      });
    }
});

