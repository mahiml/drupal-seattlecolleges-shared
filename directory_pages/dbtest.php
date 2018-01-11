<?php
    print("dbtest: ");
    
    $dbconn = pg_connect('host=localhost dbname=nscsites user=websites_user password=n74f29c6pk7nm') or die('Could not connect: ' . pg_last_error($dbconn));
   /*  $dbconn = @pg_connect("dbname=webbies user=websites_user password=n74f29c6pk7nm") or die('Could not connect: ' . pg_last_error($dbconn)); */

    echo "<p>connected! </p>";

    echo pg_last_error($dbconn);
    
    echo $dbconn;
?>
