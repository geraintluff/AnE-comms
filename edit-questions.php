<?php

$fnam = substr($_SERVER['PATH_INFO'], 1);;
if ($fnam) {
	
	if (preg_match('/^[A-Za-z0-9+-\.]+$/', $fnam)) {
		header("Content-type: application/json;profile=/AnE-comms/schemas/question.json#/definitions/editableQuestion");

		if ($_SERVER['REQUEST_METHOD']=='GET') {
			$v = file_get_contents("questions/$fnam.json");
			if ($v) { echo $v; } else { echo '{"questionText":{"en":""},"answers":[]}'; }
		} else {
	
			$v = file_get_contents("php://input");
	
			$x = fopen("questions/$fnam.json", "w");
			fwrite($x, $v);
			fclose($x);
			echo $v;
		}
	} else {
		header("403 Permission Denied");
		exit();
	}
} else {
	header("Content-type: application/json;profile=/AnE-comms/schemas/question.json#/definitions/editableList");
	echo '[';

	// List available schemas
	$files = scandir('questions/');

	$first = true;
	foreach ($files as $f) {
		if (strpos($f, ".json") != strlen($f)-5) {
			continue;
		}
	
		if ($first) { $first=false; } else { echo ','; }
		echo '"'.preg_replace('/\.json$/', '', $f).'"';
	}
	echo ']';
}

?>

