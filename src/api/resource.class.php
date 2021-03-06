<?php
#
# Det här är den generells klassen Resource som våra olika resurser ärver från så att de får med alla de funktioner och variabler som denna klass har så vi inte behöver deklarera dem i varje resurs vi skapar
#

class Resource{

	#protected variables are visible for the current class and classes inheriting from it
	protected $id, $request;

	# En generell konstruktor som gör samma sak som vår konstruktor i _user klassen
	function __construct($resource_id, $request){

		if(is_string($resource_id))
			$this->id = $resource_id;

		$this->request = $request;
	}
	function GET($input,  $db) {
		echo('Not valid');
	}

	function PUT($input,  $db) {
		echo('Not valid');
	}

	function DELETE($input, $db) {
		echo('Not valid');
	}

	function POST($input, $db) {
		echo('Not valid');
	}

	# En generell output() funktion som skriver ut det egna objektet som JSON
	function output(){
		echo json_encode($this);
	}

}
