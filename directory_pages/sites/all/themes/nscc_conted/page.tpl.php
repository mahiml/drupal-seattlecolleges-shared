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
				<p class="byline"><?php //print $site_slogan; ?></p>
			<?php endif; ?>
			<?php print $header; ?>
		</div>
		<?php if ($campus_alert): ?>
			<div id="campus-alert" class="region region-campus_alert">
				<?php print $campus_alert; ?>
			</div>
		<?php endif; ?>
		<?php print $breadcrumb; ?>
	<a class="container-16 content_image" href="/" title="North Seattle College Continuing Education">Continuing Education</a>

		<div class="container-16 content-area">
			<?php if ($left && $right) : ?>
				<div id="main-column" class="grid-9 push-4">
			<?php elseif ($left && !$right) : ?>
				<div id="main-column" class="grid-12 push-4">
			<?php elseif ($right && !$left) : ?>
				<div id="main-column" class="grid-13">
			<?php else: ?>
				<div id="main-column" class="grid-16">
			<?php endif; ?>
				<?php if ($content_leader): ?>
					<div id="content-leader" class="region region-content-leader">
						<?php print $content_leader; ?>
					</div>
				<?php endif; ?>
					<div class="region region-main">
					<?php if ($content_top): ?>
						<div id="content-kicker">
							<?php print $content_top; ?>
						</div>
					<?php endif; ?>
					<?php if ($title || $feed_icons): ?>
						<div id="content-title">
							<?php if ($title): ?>
								<h1><?php print $title; ?></h1>
							<?php endif; ?>
							<?php if ($feed_icons): ?>
								<div class="feeds">
									<?php print $feed_icons; ?>
								</div>
							<?php endif; ?>
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
					<?php if ($feed_icons): ?>
						<div class="feeds">
							<?php if ($title) {
								print "        <p>Subscribe to the <em>$title</em> feed: $feed_icons</p>";
							} else {
								print "        <p>Subscribe to this feed: $feed_icons</p>";
							}
							print '      </div>';
							?>
					<?php endif; ?>
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

			<?php if ($left): ?>
				<!-- Navigation Sidebar -->
				<?php if ($right): ?>
					<div id="side-nav" class="region region-left grid-4 pull-9">
				<?php else: ?>
					<div id="side-nav" class="region region-left grid-4 pull-12">
				<?php endif; ?>
						<?php print $left; ?>
					</div>
			<?php endif; ?>

			<?php if($right): ?>
				<!-- Supplimental Sidebar -->
				<div id="side-column1" class="region region-right grid-3">
					<?php print $right; ?>
				</div>
			<?php endif; ?>

			<div class="clearfix">&nbsp;</div>
		</div>

		<!-- Footer -->
		<div id="footer" class="region region-footer container-16">
			<?php print $footer; ?>
			<div class="clearfix">&nbsp;</div>
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