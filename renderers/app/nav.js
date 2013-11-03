Jsonary.render.register({
    renderHtml: function(data,ctx) {
	var result='<ul data-role="listview">';
	result += '<li data-role="list-divider">'+Jsonary.escapeHtml(data.propertyValue("title"))+'</li>';
	var l = data.property('questions');
	for (var i=0; i<l.length(); i++) {
	    var item = l.item(i);

	    var theme = (i==questionDisplay.getFlowIdx())?'data-theme="a"':'';

	    result += '<li '+theme+' id="nav_'+i+'"><a href="#" data-idx="'+i+'">';
	    result += Jsonary.escapeHtml(item.propertyValue("questionText").en);
	    result += '</a></li>';
	}

	return result;
    },
    enhance: function(elt, data, ctx) {
	$(elt).trigger('create');
	$(elt).on('click', 'a', null, function(evt) {
	    questionDisplay.loadFlowIdx($(this).attr('data-idx'));
	    evt.preventDefault();
	    return false;
	});
    },
    filter: {
	schema: "flow.json"
    }
});
