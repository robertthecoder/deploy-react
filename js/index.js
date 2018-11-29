var authKey = "0701279aa1ce4d48850426a4a74c7b28";

// These variables will hold the results we get from the user's inputs via HTML
var queryURLBase = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&apiKey=' + authKey;

var searchUrl = 'https://newsapi.org/v2/everything?' +
          'q={query}&' +
          'sortBy=popularity&' +
          'apiKey='+authKey;
var articleCounter = 0;

function getData(queryURL, numArticles){
  $.ajax({url:queryURL, method: "GET"})
    .done(function(response){
//      console.log(response.articles)

      for (var i=0; i<numArticles; i++) {

            // Add to the Article Counter (to make sure we show the right number)
            articleCounter++;
            var article = $("<div>");
            article.attr('id', 'article-data')
            article.addClass("well")
            if(response.articles[i].title !="null"){
              article.append('<h2><span class="label label-primary">'+articleCounter+'</span><strong><a href="'+response.articles[i].url+'" target="_blank">' + response.articles[i].title + '</a></strong></h2>');
            }
            var content = $("<div>")
            var articledesc = $("<div>")
            content.addClass('row justify-content-between')
            articledesc.addClass("col-sm-8")
            if(response.articles[i].description != "null"){
              articledesc.append("<h3>"+response.articles[i].description+"</h3>");
            }
            if(response.articles[i].source !="null"){
              articledesc.append("<p><strong>Source:</strong> "+response.articles[i].source.name+"</p>")
            }

            if(response.articles[i].content != null){
              articledesc.append("<p>"+response.articles[i].content.slice(0,response.articles[i].content.length - 13)+'<a href="'+response.articles[i].url+'" target="_blank"> Read more</a></p>')
            }
            content.append(articledesc);
            if(response.articles[i].urlToImage != "null"){
              content.append('<div class="col-sm-4"><img src="'+response.articles[i].urlToImage+'"/></div>')
            }
            article.append(content)
            $("#data").append(article)
       }

    })
}

$('#runQuery').on('click',function(){
  articleCounter = 0;
  $('#data').empty();
  var numArticles = $("#numArticles").val()
  var searchQuery = $('#searchTerm').val()
  if(searchQuery != ""){
    getData(searchUrl.replace("{query}",searchQuery),numArticles)
  }else{
    getData(queryURLBase,numArticles);
  }
  return false;
})

$('#clearAll').on('click', function(){
  articleCounter = 0;
  $("#data").empty();
})
