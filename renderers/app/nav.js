Jsonary.render.register({
    renderHtml: function(data,ctx) {
	var result='<ul data-role="listview">';
	result += '<li data-role="list-divider">'+Jsonary.escapeHtml(data.propertyValue("title"))+'</li>';
	var l = data.property('questions');
	for (var i=0; i<l.length(); i++) {
	    var item = l.item(i);
	    var eu = Jsonary.escapeHtml(item.getLink('full').href);
	    result += '<li><a href="#" data-uri="'+eu+'">';
	    result += Jsonary.escapeHtml(item.propertyValue("questionText").en);
	    result += '</a></li>';
	}
	result += '</ul>';
	return result;
    },
    enhance: function(elt, data, ctx) {
	$(elt).trigger('create');
	$(elt).on('click', 'a', null, function(evt) {
	    console.log("Loading "+$(this).attr('data-uri'));
	    questionDisplay.loadUri($(this).attr('data-uri'));
	    evt.preventDefault();
	    return false;
	});
    },
    filter: {
	schema: "flow.json"
    }
});
