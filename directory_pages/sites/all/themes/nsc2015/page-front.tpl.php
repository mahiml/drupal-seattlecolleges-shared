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
  <div id="container">
    <div id="header" class="region region-header">
      <div id="logo"><img src="<?php print _path_to_theme_asset('/imgs/logo-main.png') ?>" alt="North Seattle Community College" /></div>
    <?php print $header; ?>
    </div>

    <div id="navigation">
      <?php print $global_navigation; ?>
    </div>

  <?php if ($campus_alert): ?>
    <div id="campus-alert" class="region region-campus_alert">
      <?php print $campus_alert; ?>
    </div>
  <?php endif; ?>

  <?php if ($service_alert): ?>
  	<div class="container-12 service-alert">
  <?php print $service_alert; ?>
  	</div>
  <?php endif; ?>
  	  			 
  <?php if ($featured_promos): ?>
    <div class="region region-featured_promos container-12">
	  <div class="grid-9">	
      <?php print $featured_promos; ?>
      </div>
      <?php print $featured_promos_end; ?>
      <div class="clearfix">&nbsp;</div>
    </div>
  <?php endif; ?>
  	  			 
  <?php if ($highlight_message): ?>
    <div class="region region-highlight_message container-12">
      <?php print $highlight_message; ?>
      <div class="clearfix">&nbsp;</div>
    </div>
  <?php endif; ?>

  <?php if ($frontpage_callouts): ?>
    <div class="container-12">
      <?php print $frontpage_callouts; ?>
      <div class="clearfix">&nbsp;</div>
    </div>
  <?php endif; ?>
  <?php if ($news_headlines): ?>
    <div class="region region-news_headlines container-12">
      <?php print $news_headlines; ?>
      <div class="clearfix">&nbsp;</div>
    </div>
  <?php endif; ?>

    <div id="footer" class="region region-footer container-12">
    <?php if ($footer || $footer_left || $footer_mid_left || $footer_mid_right || $footer_right): ?>
    <?php if ($footer_left): ?>
      <div class="grid-4 region region-footer-left">
        <?php print $footer_left; ?>
      </div>
    <?php endif; ?>
    <?php if ($footer_mid_left): ?>
      <div class="grid-3 region region-footer-mid-left">
        <?php print $footer_mid_left; ?>
      </div>
    <?php endif; ?>
    <?php if ($footer_mid_right): ?>
      <div class="grid-3 region region-footer-mid-right">
        <?php print $footer_mid_right; ?>
      </div>
    <?php endif; ?>
    <?php if ($footer_right): ?>
      <div class="grid-2 region region-footer-right">
        <?php print $footer_right; ?>
      </div>
    <?php endif; ?>
      <div class="clearfix">&nbsp;</div>
      <?php print $footer; ?>
  <?php endif; ?>
      <div class="clearfix">&nbsp;</div>
    </div>
    
    <?php if ($toolbox): ?>
      <div id="toolbox" class="region region-toolbox">
        <?php print $toolbox; ?>
      </div>
    <?php endif; ?>
  <?php if ($messages): ?>
    <div class="region-main">
      <div class="content-header">
        <?php print $messages; ?>
      </div>
    </div>
  <?php endif; ?>

		<?php if ($navigation_panels): ?>
			<div id="navigation-panels" class="region navigation-panels container-12">
				<?php print $navigation_panels; ?>
			</div>
		<?php endif; ?>

  </div>
<?php print $closure ?>
<?php //print '<!-- Dump: '.$dump.' -->';?>
</body>
</html>