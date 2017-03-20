<?php

class _instructions extends Resource{ // Klassen ärver egenskaper från den generella klassen Resource som finns i resource.class.php

function get($input, $db) {
    $query = "SELECT * FROM instructions";
    $result = mysqli_query($db, $query);
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        echo json_encode($rows);
    }
}