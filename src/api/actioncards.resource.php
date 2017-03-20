<?php
#
# Den här klassen ska köras om vi anropat resursen game i vårt API genom /?/game
#

class _actioncards extends Resource{ // Klassen ärver egenskaper från den generella klassen Resource som finns i resource.class.php

	function GET($input,$db){//$input is empty
	
	$gameid = escape ($this->request[1]);
		// Selects an actioncard that has not already been used in the game
		$query = "SELECT * FROM actioncards WHERE id IN
				(SELECT cardid FROM actioncards_status WHERE in_play = 0 AND used = 0 AND game_id = '$gameid')
				ORDER BY RAND() LIMIT 1";
		$result = mysqli_query($db, $query);
		$row = mysqli_fetch_assoc($result);
		echo json_encode($row);
	}
	
	function POST($input, $db) {
		$game_id = escape($input['game_id']);
		//create actioncards
        $query = "SELECT id FROM actioncards";
        $result = mysqli_query($db, $query);
        $pairing = [];
        // get all existing actioncards
        while ($card = mysqli_fetch_assoc($result)) {
            $cardid = $card['id'];
			if (is_numeric($cardid)) {
            	array_push($pairing,"($cardid, '$game_id')");
			}
        }
        //save to DB
        $pairing = implode(",", $pairing);
        $query = "INSERT INTO actioncards_status (cardid, game_id) VALUES " .$pairing;
        mysqli_query($db, $query);
	}
	
	function PUT($input, $db) {
		$gameid = escape($this->request[1]);
		if ($this->id){
			$inplay = check_number(escape($input['in_play']));
			$used = check_number(escape($input['used']));
			$query = "UPDATE actioncards_status SET in_play = $inplay, used = $used
			WHERE cardid = {$this->id} AND game_id = '$gameid'";
			mysqli_query ($db, $query);
		}
	}
}
