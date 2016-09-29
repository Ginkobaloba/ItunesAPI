$('#submit').click(function(){
    var inputTerm = $("#command_line").val();
	var inputMedia =  $("#command_filter").val();
		if (inputTerm == "?"){inputTerm = "?!"}
		setupUrl(inputTerm, inputMedia);
	$("#command_line").val("")
});
 $("form").submit(function() {
        var inputTerm = $("#command_line").val();
		var inputMedia =  $("#command_filter").val();
		if (inputTerm == "?"){inputTerm = "?!"}
		setupUrl(inputTerm, inputMedia);
	$("#command_line").val("")
 });
 

function setupUrl(inputTerm, inputMedia){
	
	toBeEncoded = {
		
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
	
	api = 'https://itunes.apple.com/search?'
	apiRequest = api + encoded
	toBeAppened = '<script src=' + apiRequest +'><\/script>'
	jQuery('body').append(toBeAppened);
}

function handleReturnedData(Results){
	console.log(Results)
	for (var item in Results){
		
	$('Song: ' + Results[item].trackName).clone().insertBefore("#placeholder").fadeIn(1000)
	}
	
}
