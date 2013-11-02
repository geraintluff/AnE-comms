var renderQ = function() {
    
    var log = console.log;

    function renderText(lang) {
	
    }

    function renderObject(qObj) {
	log("Got an object: ", qObj);

	switch(qObj.type) {
	case "basic":
	    
	}
    }

    function renderURL(url) {
	return $.getJSON(url).done(renderObject);
    }

    return {renderObject: renderObject, renderURL: renderURL};
}();

