var runningRequest = false;
var request;

//Create HTML structure for the results and insert it on the result div
function showResults(data){
  var resultHtml = data.matches + ' results in ' + data.search_time + ' seconds<p/>';
  $.each(data.results, function(i,item){
      resultHtml+='<div class="result">';
      resultHtml+='<h2><a href="http://freebase.com/view' + item.docid + '">'+item.name+'</a></h2>';
      resultHtml+='<p>'+item.snippet_text+'</p>';
      resultHtml+='</div>';
      });

  $('div#results').html(resultHtml);
}

//Identify the typing action
$('input#query').keyup(function(e){
    e.preventDefault();
    var $q = $(this);

    if($q.val() == ''){
    $('div#results').html('');
    return false;
    }

    //Abort opened requests to speed it up
    if(runningRequest){
    request.abort();
    }

    runningRequest=true;
    request = $.getJSON('search',{ query:$q.val() },function(data){ showResults(data);
    runningRequest=false;
});


$('form').submit(function(e){
    e.preventDefault();
    });
});

google.setOnLoadCallback(function() {
$(function() {

var sourceCallback = function( request, responseCallback ) {
  $.ajax( {
    url: remoteSource,
    dataType: "jsonp",
    data: { query: request.term },
    success: function( data ) { responseCallback( data.suggestions ); 
    request = $.getJSON('search',{ query:data.suggestions[0] },function(data){ showResults(data); }); 
  } });
};

var selectCallback = function(event, ui) { 
  $('input#query').value = ui.item.value;
  request = $.getJSON('search',{ query:ui.item.value },function(data){ showResults(data); });
};

$( elementId ).autocomplete( {
  source: sourceCallback,
  minLength: 2,
  delay: 100,
  select: selectCallback
} );

}); // $ fun
}); // g callback
