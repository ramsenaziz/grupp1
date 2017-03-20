<?php
class _cards extends Resource{
    
    function post($input, $db) { // Klassen ärver egenskaper från den generella klassen Resource som finns i resource.class.php
        $cards = json_decode($input['cards']);
        $game_id = escape($input["game_id"]);
        $query = "INSERT INTO cards(type, `number`, `money`, apoint, dpoint, tpoint, location, game_id) VALUES";
        
        foreach($cards AS $c){
            
            $type       = check_number(escape($c->type));
            $number     = check_number(escape($c->number));
            $money      = check_number(escape($c->money));
            $apoint     = check_number(escape($c->apoint));
            $dpoint     = check_number(escape($c->dpoint));
            $tpoint     = check_number(escape($c->tpoint));
            $location   = check_number(escape($c->location));
            $queryrow[] = "('$type', '$number', '$money', '$apoint', '$dpoint', '$tpoint', '$location', '$game_id')";
        }
        $query .= implode(",", $queryrow);
        
        if(!mysqli_query($db, $query)){
            echo (mysqli_error($db));
        }
    }
    
    function put($input, $db) {
        $array = [];
        foreach($input as $key => $value) {
            $key = escape($key);
            $value = check_number(escape($value));
            if($key != "id" and $key != "game_id") {
                 array_push($array, "$key=$value");
            }   
        }
        $string = implode(",", $array);
        $game_id = escape($input["game_id"]);
        $id = check_number(escape($input["id"]));

        $query = "UPDATE cards SET $string
			WHERE id = $id AND game_id = '$game_id'";
			mysqli_query ($db, $query);
    } 

}