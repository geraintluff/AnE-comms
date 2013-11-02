var lang;

// Render translated text
Jsonary.render.register({
    renderHtml: function(data, ctx) {
	lang = lang || 'de';
	var result = '<div class="translation">';
	result += '<div class="foreign">' + ctx.renderHtml(data.property(lang)) + '</div>';
	result += '<div class="english">' + ctx.renderHtml(data.property('en')) + '</div>';
    },
    
    filter: {
	readOnly: true,
	schema: "question.json#/definitions/message"
    }
});


// Render a question
Jsonary.render.register({
    renderHtml: function(data, context) {
	result = '<div class="question">' + context.renderHtml(data.property("questionText"))+'</div>';
	
	result += '<div class="answers">';
	var answers = data.property('answers');

	for (var i=0; i<answers.length; i++) {
	    result += '<div class="answer">' + context.renderHtml(answers.item(i)) + '</div>';
	}
	result += '</div>';
	return result;
    },
    filter: {
	schema: "question.json"
    }
});
