var runningRequest = false;
var request;
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
    request = $.getJSON('search',{ query:$q.val(), fmt:"json" },function(data){ showResults(data,$q.val());
    runningRequest=false;
});

//Create HTML structure for the results and insert it on the result div
function showResults(data, highlight){
  var resultHtml = '';
  $.each(data.results, function(i,item){
      resultHtml+='<div class="result">';
      resultHtml+='<h2><a href="#">'+item.name+'</a></h2>';
      resultHtml+='<p>'+item.snippet_text+'</p>';
      resultHtml+='</div>';
      });

  $('div#results').html(resultHtml);
}

$('form').submit(function(e){
    e.preventDefault();
    });
});
