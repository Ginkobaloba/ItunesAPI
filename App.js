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

function handleReturnedData(results){
	console.log(results)
	table ="";
	for (var i = 0; i< results.results.length; i++){
		
	table = table+'<tr>';	
	table = table +'<td>'+ results.results[i].trackName+'</td>';
	table = table +'<td>'+ results.results[i].artistName+'</td>';
	table = table +'<td><audio src='+results.results[i].previewUrl +' preload="none" controls></audio></td>';
	table = table +'<td><img src='+ results.results[i].artworkUrl30+'></img></td>';
	table = table +'</td>';
	}
	jQuery('#myTableBody').html(table);;
	$('#myTableBody').pageMe({pagerSelector:'#myPager',showPrevNext:true,hidePageNumbers:false,perPage:10});
}

//Bootply v1.2.1 

    $.fn.pageMe = function(opts){
    var $this = this,
        defaults = {
            perPage: 7,
            showPrevNext: false,
            hidePageNumbers: false
        },
        settings = $.extend(defaults, opts);

    var listElement = $this;
    var perPage = settings.perPage; 
    var children = listElement.children();
    var pager = $('.pager');

    if (typeof settings.childSelector!="undefined") {
        children = listElement.find(settings.childSelector);
    }

    if (typeof settings.pagerSelector!="undefined") {
        pager = $(settings.pagerSelector);
    }

    var numItems = children.size();
    var numPages = Math.ceil(numItems/perPage);

    pager.data("curr",0);

    if (settings.showPrevNext){
        $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
    }

    var curr = 0;
    while(numPages > curr && (settings.hidePageNumbers==false)){
        $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
        curr++;
    }

    if (settings.showPrevNext){
        $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
    }

    pager.find('.page_link:first').addClass('active');
    pager.find('.prev_link').hide();
    if (numPages<=1) {
        pager.find('.next_link').hide();
    }
    pager.children().eq(1).addClass("active");

    children.hide();
    children.slice(0, perPage).show();

    pager.find('li .page_link').click(function(){
        var clickedPage = $(this).html().valueOf()-1;
        goTo(clickedPage,perPage);
        return false;
    });
    pager.find('li .prev_link').click(function(){
        previous();
        return false;
    });
    pager.find('li .next_link').click(function(){
        next();
        return false;
    });

    function previous(){
        var goToPage = parseInt(pager.data("curr")) - 1;
        goTo(goToPage);
    }

    function next(){
        goToPage = parseInt(pager.data("curr")) + 1;
        goTo(goToPage);
    }

    function goTo(page){
        var startAt = page * perPage,
            endOn = startAt + perPage;

        children.css('display','none').slice(startAt, endOn).show();

        if (page>=1) {
            pager.find('.prev_link').show();
        }
        else {
            pager.find('.prev_link').hide();
        }

        if (page<(numPages-1)) {
            pager.find('.next_link').show();
        }
        else {
            pager.find('.next_link').hide();
        }

        pager.data("curr",page);
        pager.children().removeClass("active");
        pager.children().eq(page+1).addClass("active");

    }
};


