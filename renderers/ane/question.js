var lang;

// Render a question
Jsonary.render.register({
	renderHtml: function (data, context) {
		result = '<div class="question-block">';
		result += '<div class="question">' + context.renderHtml(data.property("questionText"))+'</div>';

		data.properties(['questionText', 'answers'], false, function (key, subData) {
			result += '<div class="other other-' + Jsonary.escapeHtml(key) + '">';
			result += '<span class="other-key">' + Jsonary.escapeHtml(key) + ': </span>';
			result += context.renderHtml(subData);
			result += '</div>';
		});
		if (!data.readOnly()) {
			var definedProperties = data.schemas().definedProperties();
			data.properties(definedProperties, function (key, subData) {
				if (!subData.defined()) {
					result += '<div class="other other-' + Jsonary.escapeHtml(key) + '">';
					result += '<span class="other-key">' + Jsonary.escapeHtml(key) + ': </span>';
					result += context.renderHtml(subData);
					result += '</div>';
				}
			});
		}
		result += '<div class="answers">';
		result += context.renderHtml(data.property('answers'));
		result += '</div>';
		return result + '</div>';
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
