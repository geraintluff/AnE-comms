var questionDisplay = function() {
    var lang = 'de';

    var nav, navIdx = 0;

    var req;

    function loadUri(url) {
	req = Jsonary.getData(url);
	$('#question').empty().addClass("loading");
	window.scrollTo(0, 0);
	req.getData(function(data, request) {
	    $('#question').removeClass("loading").empty().renderJson(data);
	});
    }

    function loadFlow(url) {
	req = Jsonary.getData(url);
	$('#nav').empty().addClass("loading");
	req.getData(function(data) {
	    nav = data;
	    $('#nav').removeClass("loading").empty().renderJson(data);
	    loadFlowIdx(0);
	});
    }

    function loadFlowIdx(idx) {
	navIdx = idx;
	$('#nav').empty().renderJson(nav);
	loadUri(nav.property('questions').item(idx).getLink('full').href);
    }

    function getFlowIdx() { return navIdx; }

    $(document).bind('mobileinit', function() {
	$.mobile.ajaxEnabled=false;
	$.mobile.hashListeningEnabled=false;
    });

    $(function() {
	//loadUri("questions/sample.json");

	loadFlow (window.location.href.match(/.*localhost.*/) ? 'flows/test.json' : 'flows/chestpain.json');

	$('#langSelect').change(function() {
	    lang = $(this).val();
	    loadFlowIdx(navIdx);
	});
	//$('#langSelect').change();
    });

    return {loadUri: loadUri, loadFlowIdx: loadFlowIdx, getFlowIdx: getFlowIdx,
	    getLang: function() { return lang; }};
}();
