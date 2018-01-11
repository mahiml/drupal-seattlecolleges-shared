<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
  <title><?php print $head_title ?></title>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  <meta http-equiv="Content-Style-Type" content="text/css" />
  <?php print $styles ?>
</head>

<body class="cols3">

<div class="accessibility-links">
  <ul>
    <li>Jump to <a href="#content">content</a></li>
    <li>Jump to <a href="#navigation">navigation</a></li>
    <li>Jump to <a href="#">login form</a></li>
  </ul>
</div>

<div id="container">
  <div id="branding" class="region region-header">
    <h1><?php print $site_name ?></h1>
    <?php print $header ?>
  </div>
  
  <div id="navigation">
    Navigation (static)
  </div>

  <div id="content">
    <div id="primary-content" class="region region-main">
      <?php print $breadcrumb ?>
      <h2><?php print $title ?></h2>
      <?php print $content ?>
    </div>
    
    <div id="secondary-content" class="region region-left">
      <?php print $left ?>
    </div>
    
    <div  id="tertiary-content" class="region region-right">
      <?php print $right ?>
    </div>
  </div>


  <div id="site-info" class="region region-footer">
    <?php print $footer_message ?>
    <?php print $footer ?>
  </div>
</div>
<?php print $closure ?>
</body>
</html>