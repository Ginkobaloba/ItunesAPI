$('#submit').click(function(){
    var inputTerm = $("#command_line").val();
	var inputMedia =  $("#command_filter").val();
		if (inputTerm == "?"){inputTerm = "?!"}
		setupUrl(inputTerm, inputMedia);
	$("#command_line").val("")
});
$("form").submit(function () {
        window.navigator.vibrate([100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100]);
        var inputTerm = $("#command_line").val();
		var inputMedia =  $("#command_filter").val();
		if (inputTerm == "?"){inputTerm = "?!"}
		setupUrl(inputTerm, inputMedia);
	$("#command_line").val("")
 });
 

function setupUrl(inputTerm, inputMedia){

	var toBeEncoded = {
		
		term:inputTerm,
		media:inputMedia,
		callback:'handleReturnedData'
	};
EncodeUrl(toBeEncoded)
}
	
	
	
function EncodeUrl(toBeEncoded){
	var encoded = "";
	
	for (var item in toBeEncoded){
	encoded = encoded + encodeURIComponent(item) + '=' + encodeURIComponent(toBeEncoded[item]) + '&';
	}
	
	encoded = encoded.substring(0, encoded.length-1);
	
	var api = 'https://itunes.apple.com/search?'
	var apiRequest = api + encoded
	var toBeAppened = '<script src=' + apiRequest +'><\/script>'
	jQuery('body').append(toBeAppened);
}

function handleReturnedData(results){
	console.log(results)
	var table ="";
	jQuery('#myTableBody').html(table);
	jQuery('#myPager').html(table);
	for (var i = 0; i< results.results.length; i++){
		
	table = table+'<tr>';	
	table = table +'<td>'+ results.results[i].trackName+'</td>';
	table = table +'<td><a href='+ results.results[i].artistViewUrl +'>'+results.results[i].artistName+'</a></td>';
	table = table +'<td><audio src='+results.results[i].previewUrl +' preload="none" controls></audio></td>';
	table = table +'<td align="center"><img src='+ results.results[i].artworkUrl100+'></img></td>';
	table = table +'</td>';
	}
	jQuery('#myTableBody').html(table);
	$('#myTableBody').pageMe({pagerSelector:'#myPager',showPrevNext:true,hidePageNumbers:false,perPage:10});
}


   