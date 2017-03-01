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
		// $input = array_keys($input);
		// $input = json_decode($input[0]);

		// $teamname = mysqli_real_escape_string($db, $input->teamname);
		$query = "INSERT INTO games
							(teamname, sprint, currentday, highscore, startdate, enddate)
							VALUES ('laget', 1, 1, 0, NOW(), NULL)
						";
		if (mysqli_query($db, $query)) {
			echo "New game created!";
		}
		else {
			printf( "Something went terribly wrong! Try again later.", mysqli_error($db));
			
		}
	}
}
