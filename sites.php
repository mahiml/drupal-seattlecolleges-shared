<?php

/**
 * @file
 * Configuration file for multi-site support and directory aliasing feature.
 *
 * This file is required for multi-site support and also allows you to define a
 * set of aliases that map hostnames, ports, and pathnames to configuration
 * directories in the sites directory. These aliases are loaded prior to
 * scanning for directories, and they are exempt from the normal discovery
 * rules. See default.settings.php to view how Drupal discovers the
 * configuration directory when no alias is found.
 *
 * Aliases are useful on development servers, where the domain name may not be
 * the same as the domain of the live server. Since Drupal stores file paths in
 * the database (files, system table, etc.) this will ensure the paths are
 * correct when the site is deployed to a live server.
 *
 * To activate this feature, copy and rename it such that its path plus
 * filename is 'sites/sites.php'.
 *
 * Aliases are defined in an associative array named $sites. The array is
 * written in the format: '<port>.<domain>.<path>' => 'directory'. As an
 * example, to map https://www.drupal.org:8080/mysite/test to the configuration
 * directory sites/example.com, the array should be defined as:
 * @code
 * $sites = array(
 *   '8080.www.drupal.org.mysite.test' => 'example.com',
 * );
 * @endcode
 * The URL, https://www.drupal.org:8080/mysite/test/, could be a symbolic link
 * or an Apache Alias directive that points to the Drupal root containing
 * index.php. An alias could also be created for a subdomain. See the
 * @link https://www.drupal.org/documentation/install online Drupal installation guide @endlink
 * for more information on setting up domains, subdomains, and subdirectories.
 *
 * The following examples look for a site configuration in sites/example.com:
 * @code
 * URL: http://dev.drupal.org
 * $sites['dev.drupal.org'] = 'example.com';
 *
 * URL: http://localhost/example
 * $sites['localhost.example'] = 'example.com';
 *
 * URL: http://localhost:8080/example
 * $sites['8080.localhost.example'] = 'example.com';
 *
 * URL: https://www.drupal.org:8080/mysite/test/
 * $sites['8080.www.drupal.org.mysite.test'] = 'example.com';
 * @endcode
 *
 * @see default.settings.php
 * @see \Drupal\Core\DrupalKernel::getSitePath()
 * @see https://www.drupal.org/documentation/install/multi-site
 */
$sites = array('dev-50years.seattlecentral.edu' => '50years.seattlecentral.dev',
    'stg-50years.seattlecentral.edu' => '50years.seattlecentral.dev',
    '50years.seattlecentral.edu' => '50years.seattlecentral.dev',

    'dev-maritime.seattlecentral.edu' => 'maritime.seattlecentral.dev',
    'stg-maritime.seattlecentral.edu' => 'maritime.seattlecentral.dev',
    'maritime.seattlecentral.edu' => 'maritime.seattlecentral.dev',

    'dev-bph.seattlecentral.edu' => 'bph.seattlecentral.dev',
    'stg-bph.seattlecentral.edu' => 'bph.seattlecentral.dev',
    'theatres.seattlecentral.edu' => 'bph.seattlecentral.dev',
    'theaters.seattlecentral.edu' => 'bph.seattlecentral.dev',

    'dev-it.seattlecentral.edu' => 'it.seattlecentral.dev',
    'stg-it.seattlecentral.edu' => 'it.seattlecentral.dev',
    'it.seattlecentral.edu' => 'it.seattlecentral.dev',

    'dev-svi.seattlecentral.edu' => 'svi.seattlecentral.dev',
    'stg-svi.seattlecentral.edu' => 'svi.seattlecentral.dev',
    'svi.seattlecolleges.edu' => 'svi.seattlecentral.dev',
    'svi.seattlecentral.edu' => 'svi.seattlecentral.dev',

    'dev-culinary.seattlecentral.edu' => 'culinary.seattlecentral.dev',
    'stg-culinary.seattlecentral.edu' => 'culinary.seattlecentral.dev',
    'culinary.seattlecentral.edu' => 'culinary.seattlecentral.dev',

    'dev-btm.seattlecentral.edu' => 'btm.seattlecentral.dev',
    'stg-btm.seattlecentral.edu' => 'btm.seattlecentral.dev',
    'btm.seattlecentral.edu' => 'btm.seattlecentral.dev',

    'dev-alliedhealth.seattlecentral.edu' => 'alliedhealth.seattlecentral.dev',
    'stg-alliedhealth.seattlecentral.edu' => 'alliedhealth.seattlecentral.dev',
    'alliedhealth.seattlecentral.edu' => 'alliedhealth.seattlecentral.dev',

    'dev-woodtech.seattlecentral.edu' => 'woodtechnology.seattlecentral.dev',
    'stg-woodtech.seattlecentral.edu' => 'woodtechnology.seattlecentral.dev',
    'woodtech.seattlecentral.edu' => 'woodtechnology.seattlecentral.dev',

    'dev-mac.seattlecentral.edu' => 'mac.seattlecentral.dev',
    'stg-mac.seattlecentral.edu' => 'mac.seattlecentral.dev',
    'mac.seattlecentral.edu' => 'mac.seattlecentral.dev',

    'dev-foundation.seattlecentral.edu' => 'foundation.seattlecentral.dev',
    'stg-foundation.seattlecentral.edu' => 'foundation.seattlecentral.dev',
    'foundation.seattlecentral.edu' => 'foundation.seattlecentral.dev',

    'dev-education-and-human.seattlecentral.edu' => 'edu-human-services',
    'stg-education-and-human.seattlecentral.edu' => 'edu-human-services',

    'dev-creative-arts.seattlecentral.edu' => 'visual-design',
    'stg-creative-arts.seattlecentral.edu' => 'visual-design',
    
    'dev-newscenter.seattlecentral.edu' => 'newscenter.seattlecentral.dev',
    'stg-newscenter.seattlecentral.edu' => 'newscenter.seattlecentral.dev',

    'seattlecentral.dev.dd' => 'default');
