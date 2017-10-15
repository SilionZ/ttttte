<?php
$page = $_GET["page"];
$num = $_GET["num"];

switch( $page )
{
	case 1 :
		echo "{ \"code\" : \"1\", \"list\" : { \"src\" : [ \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\" ], \"title\": } }";
	break;	
	
	case 2 :
		echo "{ \"code\" : \"1\", \"list\" : { \"src\" : [ \"images/1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\" ], \"title\" } }";
	break;	
	
	case 3 :
		echo "{ \"code\" : \"1\", \"list\" : { \"src\" : [ \"images/example1.jpg\", \"img/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\", \"images/example1.jpg\" ], \"title\" ] } }";
	break;
	
	default : 
		echo "{\"code\":\"0\"}";
}

?>