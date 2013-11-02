var lang;

// Render translated text
Jsonary.render.register({
    renderHtml: function(data) {
	if (!lang) { lang = 'de'; }

	var jq = $('<div class="translation"><div class="foreign"></div><div class="english"></div></div>');
	jq.find('.foreign').text(data.propertyValue(lang) || "(no translation)");
	jq.find('.english').text(data.propertyValue('en'));
	console.log(jq);
	return jq.html();
    },
    
    filter: function(data, schemas, uiState) {
	return data.readOnly() && schemas.containsUrl("question.json#/definitions/message");
    }
});


// Render a question

Jsonary.render.register({
    renderHtml: function(data, cx) {
	result = '<div class="question">'+cx.renderHtml(data.property("questionText"))+'</div>';

	var answers = data.property("answers");
	for(var i=0; i<answers.length(); i++) {
	    result += '<div class="answer">'+cx.renderHtml(answers.item(i))+'</div>';
	}

	return result;
    },
    filter: function(data, schemas, uiState) {
	return data.readOnly() && schemas.containsUrl("question.json");
    }
});
