<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
header('Content-Type: application/json');

$db = mysqli_connect('localhost', 'root', '', 'boardgame');
mysqli_query($db, "SET NAMES utf8");