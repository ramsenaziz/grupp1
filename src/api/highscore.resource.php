<?php
#
# Den här klassen ska köras om vi anropat resursen game i vårt API genom /?/game
#

class _highscore extends Resource{ // Klassen ärver egenskaper från den generella klassen Resource som finns i resource.class.php
    
    function GET($input, $db){
        
        #GET /game/<id>
        $query = "SELECT m1.teamname, m1.highscore
			FROM games m1 LEFT JOIN games m2
			ON (m1.game_id = m2.game_id AND m1.id < m2.id)
			WHERE m2.id IS NULL
			ORDER BY highscore DESC
			LIMIT 10";
        $result = mysqli_query($db, $query);
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        echo json_encode($rows);
        
        #GET /game/<id>/<collection>.js
    }
}