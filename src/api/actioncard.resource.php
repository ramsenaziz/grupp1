<?php
#
# Den här klassen ska köras om vi anropat resursen game i vårt API genom /?/game
#

class _actioncard extends Resource{ // Klassen ärver egenskaper från den generella klassen Resource som finns i resource.class.php

	function GET(){
		global $db;

		#GET /game/<id>
		$query = "SELECT * FROM actioncards
		ORDER BY rand() LIMIT 1";
		$result = mysqli_query($db, $query);
		$row = mysqli_fetch_assoc($result);
		echo json_encode($row);
	}
}
