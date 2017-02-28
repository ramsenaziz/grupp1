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
		
		#GET /game/<id>/<collection>
		
	}

	function POST(){
		echo "post game";
	}

	function PUT(){
		echo "put game";
	}

	function DELETE(){
		echo "DELETE game";
	}
}