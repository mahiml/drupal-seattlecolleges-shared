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
        <a href="<?php print base_path(); ?>">
          <img src="<?php print base_path().path_to_theme().'/imgs/logo-main.png' ?>" alt="North Seattle Community College Cooperative Preschools" />
        </a>
      </div>
    <?php print $header; ?>
    </div>    

    <?php print $breadcrumb; ?>

    <div class="container-16 school-content content-area">
		<?php if ($left && $right) : ?>
			<?php if ($banner): ?>
				<div class="content-group grid-12 push-4">
					<div id="header-banner" class="grid-12 alpha omega">
						<?php print $banner; ?>
					</div>
					<div id="program-nav" class="region region-program-nav grid-12 alpha omega"><?php print $program_nav; ?></div>
					<div id="main-column" class="grid-8 alpha">
			<?php else : ?>
				<?php if ($program_nav) : ?>
					<div id="program-nav" class="region region-program-nav grid-12"><?php print $program_nav; ?></div>
				<?php endif; ?>
				<div id="main-column" class="grid-8 push-4">
			<?php endif; ?>
		<?php elseif ($left && !$right) : ?>
			<?php if ($banner): ?>
				<div class="content-group grid-12 push-4">
				<div id="header-banner" class="grid-12 alpha omega">
					<?php print $banner; ?>
				</div>
			<?php endif; ?>
			<?php if ($program_nav) : ?>
				<div id="program-nav" class="region region-program-nav grid-12 alpha omega"><?php print $program_nav; ?></div>
			<?php endif; ?>
			<div id="main-column" class="grid-12 alpha omega">
		<?php elseif ($right && !$left) : ?>
			<?php if ($banner): ?>
				<div id="header-banner" class="grid-16">
					<?php print $banner; ?>
				</div>
			<?php endif; ?>
			<?php if ($program_nav) : ?>
				<div id="program-nav" class="region region-program-nav grid-16"><?php print $program_nav; ?></div>
			<?php endif; ?>
			<div id="main-column" class="grid-12">
		<?php else: ?>
			<?php if ($banner): ?>
				<div id="header-banner" class="grid-16">
					<?php print $banner; ?>
				</div>
			<?php endif; ?>
			<?php if ($program_nav) : ?>
				<div id="program-nav" class="region region-program-nav grid-16"><?php print $program_nav; ?></div>
			<?php endif; ?>
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
							<?php if ($title) : ?>
								<h1><?php print $title; ?></h1>
							<?php endif; ?>
							<?php if ($feed_icons) : ?>
								<div class="feeds"><?php print $feed_icons; ?></div>
							<?php endif; ?>
						</div>
					<?php endif; ?>
					<?php if ($tabs || $help || $messages): ?>
						<div class="content-header">
							<?php print $messages; ?>
							<?php if ($tabs) : ?>
								<div class="tabs"><?php print $tabs; ?></div>
							<?php endif; ?>
							<?php print $help; ?>
						</div>
					<?php endif; ?>
					<?php print $content; ?>
					<?php if ($feed_icons): ?>
						<div class="feeds">
							<?php if ($title) : ?>
								<p>Subscribe to the <em><?php print $title; ?></em> feed: <?php print $feed_icons; ?></p>
							<?php else : ?>
								<p>Subscribe to this feed: <?php print $feed_icons; ?></p>
							<?php endif; ?>
						</div>
					<?php endif; ?>
					<?php if ($content_bottom): ?>
						<div id="content-footer">
							<?php print $content_bottom; ?>
						</div>
					<?php endif; ?>
				</div><!-- /region-main -->
			<?php if ($content_follower): ?>
				<div id="content-follower" class="region region-content-follower">
					<?php print $content_follower; ?>
				</div>
			<?php endif; ?>
			</div><!-- /main-col -->

		<?php if ($right) : ?>
			<!-- Supplimental Sidebar -->
			<div id="side-column1" class="region region-right grid-4<?php if ($banner) { print " omega"; } ?>">
				<?php print $right; ?>
			</div>
		<?php endif; ?>

	<?php if ($left && $banner) : ?>
		</div>
	<?php endif; ?>

	<?php if ($left): ?>
		<!-- Navigation Sidebar -->
		<div id="side-nav" class="region region-left grid-4 pull-12">
			<?php print $left; ?>
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
<?php print $closure; ?>
</body>
</html>