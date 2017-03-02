<?php
#
# Den här klassen ska köras om vi anropat resursen game i vårt API genom /?/game
#

class _game extends Resource{ // Klassen ärver egenskaper från den generella klassen Resource som finns i resource.class.php

	function GET(){
		global $db;

		#GET /game/<id>
		$query = "SELECT * FROM games WHERE id = $this->id";
		$result = mysqli_query($db, $query);
		while ($row = mysqli_fetch_assoc($result)) {
			$rows[] = $row;
		}
		echo json_encode($rows);

		#GET /game/<id>/<collection>.js

	}

	function POST($input, $db){
		//komplitera koden; gör skillnad på om man gör /game eller /game/id (ny tabel rad)
		//creat and insert new game with a teamname
		$teamname = mysqli_real_escape_string($db, $input['teamname']);
		$query = "INSERT INTO games
							(teamname, sprint, currentday, highscore, startdate, enddate)
							VALUES ('$teamname', 1, 1, 0, NOW(), NULL)
						";
		
		if (mysqli_query($db, $query)) {
			echo "New game created!";
		}
		else {
			printf( "Something went terribly wrong! Try again later.");
		}

		//create actioncards 		
		$gameid = mysqli_insert_id($db);

		$query = "SELECT id FROM actioncards";
		$result = mysqli_query($db, $query);
		$pairing = [];
		// get all existing actioncards
		while ($card = mysqli_fetch_assoc($result)) {
			$cardid = $card['id'];
			array_push($pairing,"($cardid, $gameid)");
		}
		//save to DB
		$pairing = implode(",", $pairing);
		$query = "INSERT INTO actioncards_status (cardid, gameid) VALUES " .$pairing;
		mysqli_query($db, $query);
	}
}
