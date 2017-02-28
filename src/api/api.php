<?php
include_once('config.php');
include("functions.php");

$existing_resources = array(
	"game",
	"cards",
	"employees",
	"action-cards"
);

$fullurl = $_SERVER['REQUEST_URI'];
//echo "Full url: $url <br>";

$url_and_vars = explode('?', $fullurl);
print_r( $url_and_vars);
$url = $url_and_vars[1];
$url_parts = explode('/', $url);
var_dump($url_parts);

$method = $_SERVER['REQUEST_METHOD'];
if (array_key_exists('method', $_REQUEST)) {
	$method = $_REQUEST['method'];
}
echo "Method: $method <br>\n";


if (array_key_exists(1, $url_parts)) {
	$resource = $url_parts[1];
}
if (array_key_exists(2, $url_parts)) {
	$id = $url_parts[2];
}
if (array_key_exists(3, $ulr_parts)) {
	$collection = $url_parts[3];
}

$error = NULL;
$id_col = "";
if (empty($resource)) {
	echo "Existing resources: " . implode(", ", $existing_resources) . "\n";
	exit(0);
}

	switch($resource) {
		case 'games':
			$id_col = "ID"; break;
		case 'cards':
			$id_col = "game_id"; break;
		case 'employees':
			$id_col = "game_id"; break;
		default:
			$error = "Not a valid resource '$resource'";
	}
	$query = "SELECT * FROM $resource";
	if (!empty($id)) {
		$query .= " WHERE $id_col = '$id'";
	}


if (!empty($error)) {
	echo "ERROR: $error\n";
	exit(1);
}

$link = db_connect();
$result = db_query($link, $query);
$num_rows = db_print_result($result);
if ($num_rows==0) {
	echo "No resource found with id '$id'\n";
}