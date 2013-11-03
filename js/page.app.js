var questionDisplay = function() {
    var nav, navIdx = 0;

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
	    nav = data;
	    $('#nav').removeClass("loading").empty().renderJson(data);
	});
    }

    function loadFlowIdx(idx) {
	navIdx = idx;
	$('#nav').empty().renderJson(nav);
	loadUri(nav.property('questions').item(idx).getLink('full').href);
    }

    function getFlowIdx() { return navIdx; }

    $(function() {
	//loadUri("questions/sample.json");
	loadFlow("flows/chestpain.json");
    });

    return {loadUri: loadUri, loadFlowIdx: loadFlowIdx, getFlowIdx: getFlowIdx};
}();
