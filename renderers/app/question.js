var lang;

// Render translated text
Jsonary.render.register({
    renderHtml: function(data, ctx) {
	lang = lang || 'de';
	var result = '<div class="translation">';

	var img = data.propertyValue('image');
	if (img) { result += '<img src="data:;base64,' + img+ '"/>'; }

	result += '<div class="foreign">' + ctx.renderHtml(data.property(lang)) + '</div>';
	result += '<div class="english">' + ctx.renderHtml(data.property('en')) + '</div></div>';
	return result;
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

	for (var i=0; i<answers.length(); i++) {
	    result += '<div class="answer">' + context.renderHtml(answers.item(i)) + '</div>';
	}
	result += '</div>';
	return result;
    },
    filter: {
	schema: "question.json"
    }
});

$(function() {
    $('body').on('click', '.answer', null, function (evt) {
	$('.answer').removeClass('selected');
	$(this).addClass('selected');
    });
});

