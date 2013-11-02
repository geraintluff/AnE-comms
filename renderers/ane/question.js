var lang;

// Render translated text
Jsonary.render.register({
	renderHtml: function(data) {
		lang = lang || 'de';
		var result = '<div class="translation">';

		result += '<div class="foreign">' + Jsonary.escapeHtml(data.propertyValue(lang)) + '</div>';
		result += '<div class="english">' + Jsonary.escapeHtml(data.propertyValue('en')) + '</div>';
		return result + '</div>';
	},

	filter: {
		readOnly: true,
		schema: "question.json#/definitions/message"
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
	filter: {
		readOnly: true,
		schema: "question.json"
	}
});
