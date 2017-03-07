<?php
#
# Den här klassen ska köras om vi anropat resursen game i vårt API genom /?/game
#

class _highscore extends Resource{ // Klassen ärver egenskaper från den generella klassen Resource som finns i resource.class.php
    
    function GET($input, $db){
        
        #GET /game/<id>
        $query = "SELECT highscore, teamname FROM games
        ORDER BY highscore DESC LIMIT 10";
        $result = mysqli_query($db, $query);
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        echo json_encode($rows);
        
        #GET /game/<id>/<collection>.js
    }
}