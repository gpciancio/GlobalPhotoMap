$("#search").on("click", function() {
  var searchTerm = $("#searchTerm").val();
var url = ""+ searchTerm +"&format=json&callback=?";
$.ajax({
  url: url,
  type: 'GET',
  contentType: "application/json; charset=utf-8",
  async: false,
      dataType: "json",
      // plop data
      success: function(data, status, jqXHR) {
        //console.log(data);
        $("#output").html();
        for(var i=0;i<data[1].length;i++){
          $("#output").prepend("<div><div class='well'><a href="+data[3][i]+"><h2>" + data[1][i]+ "</h2>" + "<p>" + data[2][i] + "</p></a></div></div>");
        }

      }
})
