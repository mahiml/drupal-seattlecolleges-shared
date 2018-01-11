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
			<div id="logo">
				<a href="https://northseattle.edu" title="North Seattle College">
					<img src="<?php print base_path().path_to_theme().'/imgs/logo-main.png' ?>" alt="North Seattle College" />
				</a>
			</div>
			<?php if ($site_slogan) : ?>
				<p class="byline"><?php print $site_slogan; ?></p>
			<?php endif; ?>
			<?php print $header; ?>
		</div>
		<?php if ($campus_alert): ?>
			<div id="campus-alert" class="region region-campus_alert">
				<?php print $campus_alert; ?>
			</div>
		<?php endif; ?>

		<div id="breadcrumbs"><p><a href="https://northseattle.edu/" title="NSC Homepage">NSC</a></div>
		<a class="container-16 content_image" href="/" title="North Seattle College Continuing Education">Continuing Education</a>

		<div class="container-16 content-area">
			<div id="front-page-promos" class="grid-12 push-4">
				<?php if ($tabs || $help || $messages): ?>
					<div class="content-header">
						<?php print $messages; ?>
						<?php if ($tabs): ?>
							<div class="tabs"><?php print $tabs; ?></div>
						<?php endif; ?>
						<?php print $help; ?>
					</div>
				<?php endif; ?>
			
				<!-- Slideshow -->
				<div id="slideshow" class="grid-9 alpha">
					<?php print $slideshow; ?>
				</div>
				
				<!-- Promo -->
				<div id="schedule-promo" class="grid-3 omega">
					<?php print $sched_promo; ?>
				</div>
			</div>      

			<!-- Navigation Sidebar -->
			<div id="side-nav" class="region region-left grid-4 pull-12">
				<?php print $left; ?>
			</div>
			
			<div class="clearfix">&nbsp;</div>
		</div>
		
		<?php if ($content_follower): ?>
			<!-- Course Categories -->
			<div id="course-categories" class="region region-content_follower container-16">
				<?php print $content_follower; ?>
				<!-- <div class="clearfix">&nbsp;</div> -->
			</div>
		<?php endif; ?>
		
		<div id="ce-info" class="container-16">
			<!-- News -->
			<div id="news-headlines" class="grid-12 push-4">
				<div id="latest-articles" class="grid-12 alpha omega">
					<h2>What's New in Continuing Education</h2>
					<?php print $latest_articles; ?>
				</div>
			</div>
			
			<div id="college-info" class="grid-4 pull-12">
				<!-- Address -->
				<div id="ce-contacts" class="vcard grid-4 alpha omega">
					<span class="org">
						<span class="organization-name"><abbr title="North Seattle College">NSC</abbr></span> <span class="organization-unit fn">Continuing Education</span>
					</span>
					<span class="adr">
						<span class="street-address">9600 College Way North</span>
						<span class="locality">Seattle</span>,
						<abbr class="region" title="Washington">WA</abbr>
						<span class="postal-code">98103</span>
					</span>
					<span class="tel">(206) 934-3705</span>
					<a href="https://northseattle.edu/locator">Map</a> &amp; <a href="https://northseattle.edu/directions">Directions</a>
				</div>
				<?php if ($social_net_links): ?>
					<!-- Social Networks-->
					<div id="social-networks" class="grid-4 alpha omega">
						<?php print $social_net_links; ?>
					</div>
				<?php endif; ?>
				<?php if ($newsletter): ?>
					<!-- Newsletter -->
					<div id="newsletter" class="grid-4 alpha omega">
						<?php print $newsletter; ?>
					</div>
				<?php endif; ?>
				<!-- NSCC Indicia -->
				<a href="https://northseattle.edu/" title="Discover more at NSC" id="nscc-indicia"><span class="glir"></span>Discover more opportunities at <abbr title="North Seattle College">NSC</abbr></a>
			</div>
			
			<div class="clearfix">&nbsp;</div>
		</div>

		<!-- Footer -->
		<div id="footer" class="region region-footer container-16">
			<?php print $footer; ?>
			<!-- <div class="clearfix">&nbsp;</div> -->
		</div>

		<?php if ($toolbox): ?>
			<!-- Toolbox -->
			<div id="toolbox" class="region region-toolbox">
				<?php print $toolbox; ?>
			</div>
		<?php endif; ?>

	</div>
<?php print $closure ?>
</body>
</html>