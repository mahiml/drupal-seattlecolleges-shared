<?php
/*
	crappy script to convert npcalc data from javascript objects to php object.
	execute as php npcalcconvertdata.php >npcalcdatainclude.php, then paste in data values from district's npcalc.htm
	note that npcalc.htm has garbage POA and TGA lines.
	First line of paste should be var efcDependent = []; 
	last line should be TGA_NFAFSA = ['0','885','0','0'];
*/



$input = stream_get_contents(STDIN);
//convert ";  " to ";\n"
$processed_text = preg_replace('/;  /', ";\n",$input);

//convert []; to array();
$processed_text = preg_replace('/\[\];/', 'array();',$processed_text);
// remove var
$processed_text = preg_replace('/var /', '',$processed_text);

//convert {}; to new stdClass();
$processed_text = preg_replace('/\{\};/', 'new stdClass();',$processed_text);

//convert ]. to ]->
$processed_text = preg_replace('/\]\./', ']->',$processed_text);

//prepend $ to efcDependent, efcIndWithoutDep,efcIndWithDep
$processed_text = preg_replace('/efcDependent/', '$ncalcdata->efcDependent',$processed_text);
$processed_text = preg_replace('/efcIndWithoutDep/', '$ncalcdata->efcIndWithoutDep',$processed_text);
$processed_text = preg_replace('/efcIndWithDep/', '$ncalcdata->efcIndWithDep',$processed_text);

// do POA
$processed_text= preg_replace('/POA_Total = \[(.*)\];/','$ncalcdata->poa=new stdClass();'."\n".' $ncalcdata->poa->total = array($1);',$processed_text);
$processed_text= preg_replace('/POA_TRF = \[(.*)\];/','$ncalcdata->poa->trf = array($1);',$processed_text);
$processed_text= preg_replace('/POA_BS = \[(.*)\];/','$ncalcdata->poa->bs = array($1);',$processed_text);
$processed_text= preg_replace('/POA_RB = \[(.*)\];/','$ncalcdata->poa->rb = array($1);',$processed_text);
$processed_text= preg_replace('/POA_O = \[(.*)\];/','$ncalcdata->poa->o = array($1);',$processed_text);

//do TGA
$processed_text= preg_replace('/TGA_0 = \[(.*)\];/','$ncalcdata->tga=new stdClass();'."\n".' $ncalcdata->tga->_0 = array($1);',$processed_text);
$processed_text= preg_replace('/TGA_1_1000 = \[(.*)\];/','$ncalcdata->tga->_1_1000 = array($1);',$processed_text);
$processed_text= preg_replace('/TGA_1001_2500 = \[(.*)\];/','$ncalcdata->tga->_1001_2500 = array($1);',$processed_text);
$processed_text= preg_replace('/TGA_2501_5000 = \[(.*)\];/','$ncalcdata->tga->_2501_5000 = array($1);',$processed_text);
$processed_text= preg_replace('/TGA_5001_7500 = \[(.*)\];/','$ncalcdata->tga->_5001_7500 = array($1);',$processed_text);
$processed_text= preg_replace('/TGA_7501_10000 = \[(.*)\];/','$ncalcdata->tga->_7501_10000 = array($1);',$processed_text);
$processed_text= preg_replace('/TGA_10001_12500 = \[(.*)\];/','$ncalcdata->tga->_10001_12500 = array($1);',$processed_text);
$processed_text= preg_replace('/TGA_12501_15000 = \[(.*)\];/','$ncalcdata->tga->_12501_15000 = array($1);',$processed_text);
$processed_text= preg_replace('/TGA_15001_20000 = \[(.*)\];/','$ncalcdata->tga->_15001_20000 = array($1);',$processed_text);
$processed_text= preg_replace('/TGA_20001_30000 = \[(.*)\];/','$ncalcdata->tga->_20001_30000 = array($1);',$processed_text);
$processed_text= preg_replace('/TGA_30001_40000 = \[(.*)\];/','$ncalcdata->tga->_30001_40000 = array($1);',$processed_text);
$processed_text= preg_replace('/TGA_40000 = \[(.*)\];/','$ncalcdata->tga->_40000 = array($1);',$processed_text);
$processed_text= preg_replace('/TGA_NFAFSA = \[(.*)\];/','$ncalcdata->tga->nfafsa = array($1);',$processed_text);

$output ="<?php\n\n";
$output .="/* This is a generated data file for the net price calculator abomination */\n";
$output .='function _nscc_ncalc_get_data(){'."\n";
$output .="\n\t".'$ncalcdata = new stdClass();'."\n";
$output .= $processed_text;
$output .="\n\n\t".'return $ncalcdata;';
$output .="\n}\n";

print $output;