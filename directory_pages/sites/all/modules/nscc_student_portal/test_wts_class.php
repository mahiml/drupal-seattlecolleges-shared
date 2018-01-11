#!/usr/bin/php -q
<?php
//Commandline tool to test wts_wrapper.inc

require_once("wts_class.inc");

$sid = '980310062';
$pin = '010175';
$yrq = 'B232';
$items = array('8400','8401','8402','9430','1006');
//$entry_codes = array('67867','15364','38721');
$entry_codes = array('67868','15364','38721','99999','99999');
$items = array(9428); 


$request = new wts_request;
$request->sid = $sid.'908';
$request->pin = $pin.'908';
if ( isset($request->error_msg) ){
	print $request->error_msg."\n";
	exit;
};



print "dump:\n\n ".print_r($request, true)."\n";

?>