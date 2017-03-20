<?php
#
# Den här klassen ska köras om vi anropat resursen game i vårt API genom /?/game
#

class _games extends Resource{ // Klassen ärver egenskaper från den generella klassen Resource som finns i resource.class.php
    
    function GET($input, $db){
        #GET /game/<id>
        if(count($this->request)>0) {
            
            $query = "SELECT * FROM {$this->request[0]} WHERE game_id = '$this->id'";
            if(count($this->request)>1) {
                $location = check_number($this->request[1]);
                $query.= " AND location = '$location'"; 
            }
            $result = mysqli_query($db, $query);
            while ($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
                
                
            }
            echo json_encode($rows);
        } else {
            $query = "SELECT * FROM games WHERE game_id = '$this->id' ORDER BY id desc LIMIT 1";
            $result = mysqli_query($db, $query);
            while ($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
            echo json_encode($rows);
        }
        
    }
    function generate_id () {
        $seed = str_split('abcdefghijklmnopqrstuvwxyz'
        .'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        .'0123456789'); // and any other characters
        shuffle($seed); // probably optional since array_is randomized; this may be redundant
        $id = '';
        $randomarray = array_rand($seed, 5);
        foreach ($randomarray as $k) $id .= $seed[$k];
        return $id;
        
    }
    
    function POST($input, $db){
		$teamname = escape($input['teamname']);
		if (!$this->id) {
			//komplitera koden; gör skillnad på om man gör /game eller /game/id (ny tabel rad)
        	//creat and insert new game with a teamname
        	$game_id = $this->generate_id();
        	$query = "INSERT INTO games
        		(game_id, teamname, sprint, currentday, highscore, startdate, enddate)
        		VALUES ('$game_id', '$teamname', 1, 0, 0, NOW(), NULL)
        	";
        
        	if (mysqli_query($db, $query)) {
            	echo json_encode ($game_id);
        	}
        	else {
            	printf( "Something went terribly wrong! Try again later.");
            	echo mysqli_error($db);
        	}
		}
		else {
		  	$sprint     = check_number(escape($input['sprint']));
		  	$currentday = check_number(escape($input['currentday']));
		  	$highscore  = check_number(escape($input['highscore']));
		  	$startdate  = escape($input['startdate']);
		  	$enddate    = escape($input['enddate']);
		
			$query =  "INSERT INTO games
				(game_id, teamname, sprint, currentday, highscore, startdate, enddate)
				VALUES ('{$this->id}', '$teamname', '$sprint', '$currentday', '$highscore', '$startdate', $enddate);
			";
		  	if (!mysqli_query($db, $query)) {
			  echo mysqli_error($db);
			}
		}
    }
}