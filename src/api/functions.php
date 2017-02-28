<?php

function db_connect() {
	// komma åt variablerna från config.php
	GLOBAL $host, $user, $pass, $db;
	$link = mysqli_connect($host, $user, $pass, $db);
	/* check connection */
	if (mysqli_connect_errno()) {
    	printf("Connect failed: %s\n", mysqli_connect_error());
    	exit();
	}
	return $link;
}

function db_query($link, $query) {
	$result = mysqli_query($link, $query);
	/* check result */
	if ($result==NULL) {
    	printf("Query '$query' failed:<br> %s\n", mysqli_error($link));
    	exit();
	}
	return $result;
}

function db_print_result($result) {
	$i = 0;
	while ($row = mysqli_fetch_assoc($result)) {
   		$i++;
   		if ($i==1) {
   			foreach ($row as $index => $value) {
   				echo "$index, ";
   			}
   			echo "<br>\n";
   		}
   		foreach ($row as $value) {
   			echo "$value, ";
   		}
   		echo "<br>\n";
	}
	return $i;
}

function db_close($link) {
	mysqli_close($link);
}

?>