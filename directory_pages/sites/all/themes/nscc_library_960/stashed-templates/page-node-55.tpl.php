<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language; ?>" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>">

<head>
  <title><?php print $head_title ?></title>
  <?php print $head; ?>
  <?php print $styles; ?>
  <?php print $scripts; ?>
	<script type="text/javascript">
	//<![CDATA[
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-20951475-1']);
  _gaq.push(['_setDomainName', '.northseattle.edu']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); 
    ga.type = 'text/javascript'; 
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(ga, s);
  })();
  //]]>
	</script>
</head>

<body class="<?php print $body_classes; ?>">
  <div id="container" style="width: auto;">
    <div id="header" class="region region-header" style="width: auto;">
      <div id="logo">
				<img src="<?php print _path_to_theme_asset('/imgs/logo-main.png') ?>" alt="North Seattle Community College" />
      </div>
    <?php print $header; ?>
    </div>

  
    <div class="container-12 content-area" style="width: auto;">
      <div id="main-column" class="grid-9" style="width: auto;">
        <div class="region region-main">
        <?php if ($content_top): ?>
          <div id="content-kicker">
            <?php print $content_top; ?>
          </div>
        <?php endif; ?>
        <?php if ($title): ?>
          <div id="content-title">
            <h1><?php print $title; ?></h1>
          </div>
        <?php endif; ?>
        <?php if ($tabs || $help || $messages): ?>
          <div class="content-header">
            <?php print $messages; ?>
          <?php if ($tabs): ?>
            <div class="tabs"><?php print $tabs; ?></div>
          <?php endif; ?>
            <?php print $help; ?>
          </div>
        <?php endif; ?>
          <?php print $content; ?>
        <?php if ($content_bottom): ?>
          <div id="content-footer">
            <?php print $content_bottom; ?>
          </div>
        <?php endif; ?>
        </div>
      <?php if ($content_follower): ?>
        <div id="content-follower" class="region region-content-follower">
          <?php print $content_follower; ?>
        </div>
      <?php endif; ?>
      </div>      
      <div class="clearfix">&nbsp;</div>
    </div>
  </div><!-- close page-wrapper -->
<?php //print '<!-- Vars Dump: '.$dump.' -->';?>
<?php print $closure ?>
</body>
</html>