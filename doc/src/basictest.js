$(function() {
    // The basic demo page

    var currentQ;
    var lang="en";
    
    $('#lang').change(function(evt) {
	if (currentQ) {
	    renderQ.renderURL();
	}
    });
});
