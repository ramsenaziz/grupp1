<?php
class _card extends Resource{
    
    function post($input, $db) { // Klassen ärver egenskaper från den generella klassen Resource som finns i resource.class.php
        $cards = json_decode($input['cards']);
        print_r($cards);
        
        $game_id = $input["game_id"];
        $query = "INSERT INTO cards(type, `number`, `money`, apoint, dpoint, tpoint, location, game_id) VALUES";
        
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
        
        
        
        
        
        echo ($query);
        if(!mysqli_query($db, $query)){
            echo (mysqli_error($db));
        }
    }
    
    function get($input, $db) {
        $query = "SELECT * FROM games WHERE game_id = '$this->id' ORDER BY id desc LIMIT 1";
        $result = mysqli_query($db, $query);
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        echo json_encode($rows);
    }
}