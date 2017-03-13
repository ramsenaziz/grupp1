<?php
class _employees extends Resource{

    function post($input, $db) { // Klassen ärver egenskaper från den generella klassen Resource som finns i resource.class.php
        
        $game_id = escape($input["game_id"]);
        $query = "INSERT INTO employees(role, currentrole, game_id) values
        (1,1,'$game_id'), (2,2,'$game_id'), (2,2,'$game_id'), (2,2,'$game_id'), (2,2,'$game_id'), (3,3,'$game_id')
        ";

        if(!mysqli_query($db, $query)){
            echo (mysqli_error($db));
        } 
    }

    function put($input, $db) {
        $game_id = escape($input["game_id"]);
        $id = check_number(escape($input["id"]));
        $currentrole = escape($input["currentrole"]);
        $query = "UPDATE employees SET currentrole = $currentrole
			WHERE id = $id AND game_id = '$game_id'";
			mysqli_query ($db, $query);
    } 
}