<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language; ?>" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>">

<head>
  <title><?php print $head_title ?></title>
  <?php print $head; ?>
  <?php print $styles; ?>
  <?php print $scripts; ?>
  <!--[if lt IE 8]>
    <link type="text/css" rel="stylesheet" media="all" href="<?php print base_path() . path_to_theme() ?>/news-fixie.css" />
  <![endif]-->
</head>

<body class="<?php print $body_classes; ?>">

<div class="accessibility-links">
  <ul>
    <li>Jump to <a href="#content"><?php print t('content'); ?></a></li>
    <li>Jump to <a href="#navigation"><?php print t('navigation'); ?></a></li>
  <?php if($search_box): ?>
    <li>Jump to <a href="#search-block-form"><?php print t('search form'); ?></a></li>
  <?php endif; ?>
  <?php if (! $logged_in): ?>
    <li>Jump to <a href="#user-login-form"><?php print t('login form'); ?></a></li>
  <?php endif; ?>
  </ul>
</div>

<div id="container">

  <div id="college-branding">
    <p class="college-name"><a href="http://www.northseattle.edu" title="College homepage"><span></span>North Seattle Community College</a></p>
  <?php if ($college_slogan): ?>
    <p class="college-slogan"><?php print $college_slogan; ?></p>
  <?php endif; ?>
  <?php if ($search_box) { print $search_box; } ?>
  </div>

<?php if ($college_navigation): ?>
  <div id="navigation">
    <?php print $college_navigation; ?>
  </div>
<?php endif; ?>

  <div id="site-masthead" class="region region-header">
  <?php
  if ($site_name) {
    if ($is_front) {
      print "    <h1>$site_name</h1>\n";
    } else {
      print "    <p>$site_name</p>\n";
    }
  }
  ?>
  <?php if($site_slogan): ?>
    <p class="site-slogan"><?php print $site_slogan; ?></p>
  <?php endif; ?>
    <div id="masthead-photo">
      <a href="<?php print $front_page; ?>" title="News homepage">
        <img src="/<?php print $directory; ?>/imgs/news-masthead.jpg" alt="Commuters reading newspapers" />
      </a>
      <p class="photo-attribution" title="photo attribution">
        Photo ©2004 <a href="http://www.flickr.com/people/mildlydiverting/">Kim P</a>
      </p>
    </div>
  <?php if ($mission): ?>
  <div id="site-mission">
    <?php print $mission; ?>
  </div>
  <?php endif; ?>
    <?php print $header; ?>
  </div>
  <?php print $breadcrumb; ?>

  <div id="content-regions">
    <div id="primary-content-group" class="column">
    <?php if ($campus_alert): ?>
      <div id="campus-alert" class="region region-campus_alert">
        <?php print $campus_alert; ?>
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
          <h1><?php print $title; ?></h1>
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
    </div>

    <?php if ($left): ?>
    <div class="region region-left column">
      <?php print $left; ?>
    </div>
    <?php endif; ?>

    <?php if ($right): ?>
    <div class="region region-right column">
      <?php print $right; ?>
    </div>
    <?php endif; ?>
  </div>

  <div id="site-info" class="region region-footer">
    <p class="college-address vcard">
      <span class="fn org">North Seattle Community College</span>
      <span class="adr">
        <span class="street-address">9600 College Way North</span>
        <span class="locality">Seattle</span>,
        <abbr class="region" title="Washington">WA</abbr>
        <span class="postal-code">98103-3599</span>
      </span>
    </p>
  <?php if ($site_info_links): ?>
    <div class="site-info-links">
      <?php print $site_info_links; ?>
    </div>
  <?php endif; ?>
    <p class="copyright">©<?php print date('Y'); ?> North Seattle Community College</p>
  </div>

</div>
<?php print $closure ?>
</body>
</html>
