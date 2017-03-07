<?php
#
# Den här klassen ska köras om vi anropat resursen game i vårt API genom /?/game
#

class _game extends Resource{ // Klassen ärver egenskaper från den generella klassen Resource som finns i resource.class.php
    
    function GET($input, $db){
        #GET /game/<id>
        if(count($this->request)>0) {
            
            $query = "SELECT * FROM {$this->request[0]} WHERE game_id = '$this->id'";
            if(count($this->request)>1) {
                $query.= " AND location = {$this->request[1]}";
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
        //komplitera koden; gör skillnad på om man gör /game eller /game/id (ny tabel rad)
        //creat and insert new game with a teamname
        $teamname = mysqli_real_escape_string($db, $input['teamname']);
        $game_id = $this->generate_id();
        $query = "INSERT INTO games
        (game_id, teamname, sprint, currentday, highscore, startdate, enddate)
        VALUES ('$game_id', '$teamname', 1, 1, 0, NOW(), NULL)
        ";
        
        if (mysqli_query($db, $query)) {
            echo json_encode ($game_id);
        }
        else {
            printf( "Something went terribly wrong! Try again later.");
            echo mysqli_error($db);
        }
        
        //create actioncards
        $query = "SELECT id FROM actioncards";
        $result = mysqli_query($db, $query);
        $pairing = [];
        // get all existing actioncards
        while ($card = mysqli_fetch_assoc($result)) {
            $cardid = $card['id'];
            array_push($pairing,"($cardid, '$game_id')");
        }
        //save to DB
        $pairing = implode(",", $pairing);
        echo $pairing;
        $query = "INSERT INTO actioncards_status (cardid, game_id) VALUES " .$pairing;
        mysqli_query($db, $query);
    }
}