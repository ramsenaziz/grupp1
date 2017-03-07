<?php
class _card extends Resource{

    function post($input, $db) { // Klassen ärver egenskaper från den generella klassen Resource som finns i resource.class.php
        $cards = json_decode($input['cards']);
        $game_id = $input["game_id"];
        $query = "INSERT INTO cards(type, `number`, money, apoint, dpoint, tpoint, location, game_id) VALUES";
        
        foreach($cards AS $c){
                    
            $type       = $c->type;
            $number     = $c->number;
            $money      = $c->money;
            $apoint     = $c->apoint;
            $dpoint     = $c->dpoint;
            $tpoint     = $c->tpoint;
            $location   = $c->location;
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
            array_push($array, "$key=$value")
        }
        $string = implode(",", $array);
        $game_id = $input["game_id"];
        $query = "UPDATE cards SET '$string'
			WHERE id = $id AND game_id = '$game_id'";
			mysqli_query ($db, $query);
    } 
}