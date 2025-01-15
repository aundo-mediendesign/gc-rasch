<?php
/**
 * Plugin Name:       Aundo Custom-Styles
 * Description:       Custom Gutenberg-Blöcke.
 * Version:           0.1.0
 * Author:            a&o mediendesign
 * Text Domain:       aundo-customstyles
 *
 * @package           create-block
 */
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class aundocustomstyles {

  function __construct() {
    add_action('init', array($this, 'adminAssets'));
  }

    function adminAssets() {
        register_block_type(__DIR__ . '/', array(
        'render_callback' => array($this, 'theHTML')
        ));
    }

    function theHTMLSave($attributes, $content) {
        //   return $attributes;
        $setAttributes = wp_json_encode($content);
        $getContent = [$setAttributes, $content];
    }

    function theHTML($attributes, $content) {  
        ob_start(); ?>
        <div class="aundo-customstyles"><pre style="display: none;"><?php echo wp_json_encode($attributes) ?></pre><?php echo $content; ?></div>
        <?php return ob_get_clean();
    }
}

$aundocustomstyles = new aundocustomstyles();

