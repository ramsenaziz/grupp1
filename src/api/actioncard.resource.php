<?php
#
# Den här klassen ska köras om vi anropat resursen game i vårt API genom /?/game
#

class _actioncard extends Resource{ // Klassen ärver egenskaper från den generella klassen Resource som finns i resource.class.php

	function GET(){
		global $db;

		// Selects an actioncard that has not already been used in the game
		$query = "SELECT * FROM actioncards
							WHERE id IN
								(SELECT cardid FROM actioncards_status
								WHERE in_play = 0 AND used = 0 AND gameid = 3)
							ORDER BY RAND() LIMIT 1";
		$result = mysqli_query($db, $query);
		$row = mysqli_fetch_assoc($result);
		echo json_encode($row);
	}
}
