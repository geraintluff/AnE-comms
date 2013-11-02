<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>JSON browser</title>
		<link rel="stylesheet" href="css/page.index.css" />
		<link rel="stylesheet" href="renderers/basic.jsonary.css" />
		<link rel="stylesheet" href="renderers/common.css" />
	</head>
	<body>
	  <h1>Available questions</h1>

	  <h1>Add new question</h1>
	  
		<table width=100%>
			<tr>
				<td width=80%>
					<input id="url-bar" value="example-schema.json"/>
				</td>
				<td>
					<input id="go" type="submit" value="Go" />
				</td>
			</tr>
		</table>
		<div id="main">
		<script src="js/jquery.js"></script>
		<script src="jsonary.js"></script>
		<script src="plugins/jsonary.undo.js"></script>
		<script src="renderers/basic.jsonary.js"></script>
		<script src="renderers/list-schemas.js"></script>
		<script src="renderers/list-links.js"></script>
		<script src="renderers/ane/question.js"></script>
		<script src="js/page.index.js"></script>
		<script>
			if (window.location.hash == "#" || window.location.hash == "") {
				window.location.replace("#" + $('#url-bar').val());
			} else {
				var url = window.location.hash.substring(1);
				$('#url-bar').val(url);
			}
			$('#go').click();
		</script>
	</body>
</html>
