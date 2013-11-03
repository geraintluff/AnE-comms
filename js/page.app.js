var questionDisplay = function() {
    var lang = 'zh';

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

	// How far are we through nav? Just hack this
	function disp(fname, enable) {
	    var r='';
	    if (enable) {
		r += '<a href="#" onclick="questionDisplay.'+fname+'Flow()">';
	    }

	    r += '<img class="btn" src="img/btn-'+fname+(enable?'':'-disabled')+'.png">';

	    if (enable) {
		r += '</a>';
	    }
	    return r;
	}

	bnav = disp('prev', idx != 0);
	for (var i=0; i<getNFlow(); i++) {
	    bnav += '<img class="dot" src="img/nav-dot-'+((i<=idx)?'on':'off')+'.png">';
	}
	bnav += disp('next', idx < getNFlow()-1);
	$('#bottomNav').html(bnav);
    }


    function getFlowIdx() { return navIdx; }
    function getNFlow() { return nav ? (nav.property('questions').length()) : 0; }

    function nextFlow() {
	navIdx++;
	if (navIdx >= getNFlow()) { navIdx = getNFlow()-1; }
	loadFlowIdx(navIdx);
    }

    function prevFlow() {
	navIdx--;
	if (navIdx <= 0) { navIdx = 0; }
	loadFlowIdx(navIdx);
    }

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

	var navVisible = false;


	$('#navContainer .showHide').click(function(evt) {
	    navVisible = !navVisible;
	   
	    $('#navContainer').animate({left: navVisible ? 0 : -250});

	    evt.preventDefault();
	    return false;
	});
    });

    return {loadUri: loadUri, loadFlowIdx: loadFlowIdx, getFlowIdx: getFlowIdx,
	    getNFlow: getNFlow(), getLang: function() { return lang; },
	    nextFlow: nextFlow, prevFlow: prevFlow};
}();
