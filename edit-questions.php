<?php

if ($_GET['f']) {
	$fnam = $_GET['f'];
	
	if (preg_match('/^[A-Za-z0-9+-\.]+$/', $fnam)) {

		if ($_SERVER['REQUEST_METHOD']=='GET') {
			$v = file_get_contents("questions/$fnam.json");
			echo $v;
		} else {
	
			$v = file_get_contents("php://input");
	
			$x = fopen("questions/$fnam.json", "w");
			fwrite($x, $v);
			fclose($x);
		}
	} else {
		header("403 Permission Denied");
		exit();
	}
} else {
	header("Content-type: application/json;profile=/~meredydd/ane/schemas/question.json#/definitions/editableList");
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

