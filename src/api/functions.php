<?php
function escape($string) {
	global $db;
	return mysqli_real_escape_string($db, $string);
}