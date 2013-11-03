var lang;

// Render a question
Jsonary.render.register({
	renderHtml: function (data, context) {
		result = '<div class="question">' + context.renderHtml(data.property("questionText"))+'</div>';

		result += '<div class="answers">';
		result += context.renderHtml(data.property('answers'));
		result += '</div>';
		return result;
	},
	filter: {
		schema: "question.json"
	}
});

// Render translated text
Jsonary.render.register({
	renderHtml: function (data, context) {
		lang = lang || 'de';
		var result = '<div class="translation">';
		result += '<div class="english">' + context.renderHtml(data.property('en')) + '</div>';
		if (data.property('image').defined()) {
			result += '<div class="translation-image">';
			result += '<img src="' + Jsonary.escapeHtml("data:;base64," + data.get('/image')) + '">'
			result += '</div>';
		}
		data.properties(['en', 'image'], false, function (key, subData) {
			result += '<div class="foreign">'
				+ '<span class="foreign-key">' + Jsonary.escapeHtml(key) + '</span>&nbsp;'
				+ context.renderHtml(subData)
			+ '</div>';
		});
		return result + '</div>';
	},

	filter: {
		readOnly: true,
		schema: "question.json#/definitions/message"
	}
});

// Render date-picker question
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
	render: function (element, data, context) {
		
	},
	filter: {
		readOnly: true,
		type: 'string',
		schema: "question.json#/definitions/date-time"
	}
});