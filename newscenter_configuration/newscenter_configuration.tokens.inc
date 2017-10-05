<?php

use Drupal\Core\Render\BubbleableMetadata;
use Symfony\Cmf\Component\Routing\RouteObjectInterface;
use Drupal\Core\Url;

/**
 * Implements hook_token_info().
 */
function newscenter_configuration_token_info()
{
    $types['newscenter_tokens'] = array(
        'name' => t("NewsCenter Tokens"),
        'description' => t("Tokens for Year, month and date information"),
    );
// Site-wide global tokens.
    $newscenter_tokens['news_year'] = array(
        'name' => t("Year of the News Article"),
        'description' => t("The year news article was created"),
    );
    $newscenter_tokens['news_month'] = array(
        'name' => t("Month of the News Article"),
        'description' => t("The month news article was created"),
    );
    $newscenter_tokens['news_date'] = array(
        'name' => t("Date of the News Article"),
        'description' => t("The date news article was created"),
    );
    return array(
        'types' => $types,
        'tokens' => array(
            'newscenter_tokens' => $newscenter_tokens,
        ),
    );
}

/**
 * Implements hook_tokens().
 */
function newscenter_configuration_tokens($type, $tokens, array $data, array $options, BubbleableMetadata $bubbleable_metadata)
{
    $request = \Drupal::request();
    $replacements = array();
    if ($type == 'newscenter_tokens') {
        foreach ($tokens as $name => $original) {
            switch ($name) {
                case 'news_year':
                    $bubbleable_metadata->addCacheableDependency( date("Y"));
                    $replacements[$original] = date("Y");
                    break;
                case 'news_month':
                    $bubbleable_metadata->addCacheableDependency(date("m"));
                    $replacements[$original] = date("m");
                    break;
                case 'news_date':
                    $bubbleable_metadata->addCacheableDependency(date("d"));
                    $replacements[$original] = date("d");
                    break;
            }
        }
    }
    return $replacements;
}