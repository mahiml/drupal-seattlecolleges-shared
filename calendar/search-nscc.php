<?php
/**
 *	Handler for global NSCC search form on Calendar site
 *
 *	URL-encodes submitted search terms and redirects to global NSCC search engine.
 *	For some reason (Drupal FAPI?) encoded ampersands need to be re-encoded using a peculiar syntax,
 *	hence the odd string replacement.
 */
 
$params = isset($_POST['search_text']) ? str_replace('%26', '%2526', rawurlencode($_POST['search_text'])) : '';

header("Location: https://northseattle.edu/nsccsearch/$params");

echo "Params = $params";
exit;	// ensure clean exit and nothing else is done.
?>