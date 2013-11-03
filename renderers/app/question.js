// Render translated text
Jsonary.render.register({
    renderHtml: function(data, ctx) {
	lang = questionDisplay.getLang();

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

// Render date-picker answer
Jsonary.render.register({
	renderHtml: function (data, context) {
		var result = '';

		var today = new Date();
		var month = (today.getMonth() + 1 > 10) ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1);
		var day = (today.getDate() > 10) ? today.getDate() : "0" + today.getDate();
		var todayString = today.getFullYear() + "-" + month + '-' + day;
		
		var hour = (today.getHours() > 10) ? today.getHours() : "0" + today.getHours();
		var minutes = (today.getHours() > 10) ? today.getMinutes() : "0" + today.getMinutes();
		var timeString = hour + ":" + minutes;

		context.uiState.date = context.uiState.date || todayString;
		context.uiState.time = context.uiState.time || timeString;
		result += '<input name="' + context.inputNameForAction('select-date') + '" type="date" value="' + Jsonary.escapeHtml(context.uiState.date) + '" max="' + Jsonary.escapeHtml(context.uiState.date) + '">';
		result += '<input name="' + context.inputNameForAction('select-time') + '" type="time" value="' + Jsonary.escapeHtml(context.uiState.time) + '" step="60">';
		return result;
	},
	action: {
		'select-date': function (data, context, value) {
			context.uiState.date = value;
			console.log(value);
		},
		'select-time': function (data, context, value) {
			context.uiState.time = value;
			console.log(value);
		}
	},
	filter: {
		readOnly: true,
		type: 'string',
		schema: "question.json#/definitions/date-time"
	}
});

// Render a question
Jsonary.render.register({
    renderHtml: function(data, context) {
	result = '<div class="question">' + context.renderHtml(data.property("questionText"))+'</div>';
	
	result += '<div class="answers">';
	var answers = data.property('answers');

	var imageAnswer = data.propertyValue('imageAnswer');
	if (imageAnswer) {
	    result += '<div class="imageAnswer"><img src="data:;base64,'+imageAnswer.img+'"></div>"';
	}

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

    $('body').on('click', '.imageAnswer', null, function(evt) {
	var jq = $(this);
	var ch = $(this).find('.crossHair');
	if (ch.length==0) {
	    ch = $('<img class="crossHair" src="img/crosshair.png">');
	    jq.append(ch);
	}
	var p = jq.offset();
	ch.css({position: "absolute",
		"left": evt.pageX - p.left - 50,
		"top":evt.pageY - p.top - 50
	       });
    });
});
