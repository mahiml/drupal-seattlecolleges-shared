<?php
/*
 *	$Id: wsdlclient1.php,v 1.3 2007/11/06 14:48:48 snichol Exp $
 *
 *	WSDL client sample.
 *
 *	Service: WSDL
 *	Payload: document/literal
 *	Transport: http
 *	Authentication: none
 */
require_once('../lib/nusoap.php');
$proxyhost = isset($_POST['proxyhost']) ? $_POST['proxyhost'] : '';
$proxyport = isset($_POST['proxyport']) ? $_POST['proxyport'] : '';
$proxyusername = isset($_POST['proxyusername']) ? $_POST['proxyusername'] : '';
$proxypassword = isset($_POST['proxypassword']) ? $_POST['proxypassword'] : '';
$client = new nusoap_client('https://prod.northseattle.edu/services/soap?wsdl', 'wsdl',
						$proxyhost, $proxyport, $proxyusername, $proxypassword);
$err = $client->getError();
if ($err) {
	echo '<h2>Constructor error</h2>'."\n".'<pre>' . $err . '</pre>'."\n";
}
// Doc/lit parameters get wrapped
$param = array('message' => 'Flibble');
$result = $client->call('echo.echo', array('parameters' => $param), '', '', false, true);
// Check for a fault
if ($client->fault) {
	echo "\n".'<h2>Fault</h2>'."\n".'<pre>';
	print_r($result);
	echo '</pre>'."\n";
} else {
	// Check for errors
	$err = $client->getError();
	if ($err) {
		// Display the error
		echo "\n".'<h2>Error</h2>'."\n".'<pre>' . $err . '</pre>'."\n";
	} else {
		// Display the result
		echo "\n".'<h2>Result</h2>'."\n".'<pre>';
		print_r($result);
		echo '</pre>'."\n";
	}
}
//echo '<h2>Request</h2><pre>' . htmlspecialchars($client->request, ENT_QUOTES) . '</pre>';
//echo '<h2>Response</h2><pre>' . htmlspecialchars($client->response, ENT_QUOTES) . '</pre>';
//echo '<h2>Debug</h2><pre>' . htmlspecialchars($client->debug_str, ENT_QUOTES) . '</pre>';
?>
