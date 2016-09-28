$('#submit').click(function(){
    var input = $("#command_line").val();
		if (input == "?"){input = "?!"}
		sendRequest(input)
		console.log(input)
	$("#command_line").val("")
});
 $("form").submit(function() {
        var input = $("#command_line").val();
		if (input == "?"){input = "?!"}
		sendRequest(input)
		console.log(input)
	$("#command_line").val("")
 });
 
 
 
 function handleResponse(data){
	 
	 console.log(data)
	 console.log(data)
	 
 }
 
 
 
 
 
 
 function sendRequest(input){
	 var unencoded = "http://itunes.apple.com/search?term="+input+"&callback=handleResponse";
	 var encoded = encodeURI(unencoded);
	 $('head').append('<script src="' + encoded +'"></script>');
    //$.ajax({
        //url: encoded,
       // dataType: 'JSONP'
    //})
    //.done(function(data) { console.log(data); })
    //.fail(function(data) { console.log(data); })
 };

