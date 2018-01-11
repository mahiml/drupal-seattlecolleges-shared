<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="text/html; charset={CHARSET}" />
	<title>{DISPLAY_DATE} | Calendars | NSC</title>
	<link type="image/x-icon" href="{DEFAULT_PATH}/templates/{TEMPLATE}/images/branding/favicon.ico" rel="shortcut icon" />
	<link rel="stylesheet" type="text/css" href="{DEFAULT_PATH}/templates/{TEMPLATE}/960.css" media="all" />
	<link rel="stylesheet" type="text/css" href="{DEFAULT_PATH}/templates/{TEMPLATE}/global.css" media="all" />
	<link rel="stylesheet" type="text/css" href="{DEFAULT_PATH}/templates/{TEMPLATE}/default.css" media="all" />
 	<link rel="stylesheet" type="text/css" href="{DEFAULT_PATH}/templates/{TEMPLATE}/global_print.css" media="print" />
	<!--[if IE]>
			<link rel="stylesheet" type="text/css" href="{DEFAULT_PATH}/templates/{TEMPLATE}/ie.css" />
	<![endif]-->
	<!--[if lt IE 8]>
		<link rel="stylesheet" type="text/css" href="{DEFAULT_PATH}/templates/{TEMPLATE}/global_fixie.css" />
	<![endif]-->
	<!--[if IE 8]>
		<link rel="stylesheet" type="text/css" href="{DEFAULT_PATH}/templates/{TEMPLATE}/global_fixie8.css" />
	<![endif]-->
	<script id="nicetitle" type="text/javascript" src="{DEFAULT_PATH}/nicetitle/nicetitle.js"></script>
	<link rel="stylesheet" type="text/css" href="{DEFAULT_PATH}/nicetitle/nicetitle.css" />
	<!-- switch rss_available on -->
	<link rel="alternate" type="application/rss+xml" title="RSS" href="{DEFAULT_PATH}/rss/rss.php?cal={CAL}&amp;rssview={CURRENT_VIEW}" />
	<!-- switch rss_available off -->
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
	<script type="text/javascript" src="{DEFAULT_PATH}/templates/{TEMPLATE}/jquery.hoverIntent.minified.js"></script>
	<script type="text/javascript" src="{DEFAULT_PATH}/templates/{TEMPLATE}/nav_menu.js"></script>
	{EVENT_JS}
</head>
<body>
<div id="container">
	<div id="header">
		<div id="logo">
			<a href="https://northseattle.edu/" title="College Homepage"><img src="{DEFAULT_PATH}/templates/{TEMPLATE}/images/branding/logo-main.png" alt="North Seattle College" /></a>
		</div>
	</div>
	<div id="navigation"></div>
	<div class="container-12 region region-quicklinks">
		<div class="grid-12">
			<div id="breadcrumbs">
				<p><a href="https://northseattle.edu/" title="NSC Homepage">NSC</a></p>	
			</div>
		</div>
		<div class="clearfix">&nbsp;</div>
	</div>
	<div class="container-12">
	<form name="eventPopupForm" id="eventPopupForm" method="post" action="includes/event.php" style="display: none;">
		<input type="hidden" name="date" id="date" value="" />
		<input type="hidden" name="time" id="time" value="" />
		<input type="hidden" name="uid" id="uid" value="" />
		<input type="hidden" name="cpath" id="cpath" value="" />
		<input type="hidden" name="event_data" id="event_data" value="" />
	</form>
	<form name="todoPopupForm" id="todoPopupForm" method="post" action="includes/todo.php" style="display: none;">
		<input type="hidden" name="todo_data" id="todo_data" value="" />
		<input type="hidden" name="todo_text" id="todo_text" value="" />
	</form>
	<!-- NSCC_ALERTS -->