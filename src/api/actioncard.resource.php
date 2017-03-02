<?php
#
# Den här klassen ska köras om vi anropat resursen game i vårt API genom /?/game
#

class _actioncard extends Resource{ // Klassen ärver egenskaper från den generella klassen Resource som finns i resource.class.php

	function GET($input,$db){//$input is empty
	
	$gameid = $this->request[1];
		// Selects an actioncard that has not already been used in the game
		$query = "SELECT * FROM actioncards WHERE id IN
				(SELECT cardid FROM actioncards_status WHERE in_play = 0 AND used = 0 AND gameid = $gameid)
				ORDER BY RAND() LIMIT 1";
		$result = mysqli_query($db, $query);
		$row = mysqli_fetch_assoc($result);
		echo json_encode($row);
	}
	function PUT($input, $db) {
		$gameid = $this->request[1];
		if ($this->id){
			$inplay = mysqli_real_escape_string($db, $input['in_play']);
			$used = mysqli_real_escape_string($db, $input['used']);
			$query = "UPDATE actioncards_status SET in_play = $inplay, used = $used
			WHERE cardid = {$this->id} AND gameid = $gameid";
			mysqli_query ($db, $query);
		}
	}
}
