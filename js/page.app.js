var questionDisplay = function() {
    var req;

    function loadUri(url) {
	req = Jsonary.getData(url);
	$('#question').empty().addClass("loading");
	window.scrollTo(0, 0);
	req.getData(function(data, request) {
	    console.log(data.value());
	    $('#question').removeClass("loading").empty().renderJson(data);
	});
    }

    function loadFlow(url) {
	req = Jsonary.getData(url);
	$('#nav').empty().addClass("loading");
	req.getData(function(data) {
	    $('#nav').removeClass("loading").empty().renderJson(data);
	});
    }

    $(function() {
	//loadUri("questions/sample.json");
	loadFlow("flows/chestpain.json");
    });

    return {loadUri: loadUri};
}();
