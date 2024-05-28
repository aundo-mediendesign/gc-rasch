<?php
/**
 * Plugin Name:       Aundo Svg-Compiler
 * Description:       Aundo Svg-Block.
 * Version:           0.1.0
 * Author:            a&o mediendesign
 * Text Domain:       aundo-saveassvg
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

class iconimg {
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
        ob_start(); 
        
        $attachmentId = $attributes['imageId'];
        $attachment = get_post($attachmentId);
        $position = $attributes['position'] ? $attributes['position'] : 'moveRight';
        $stretch = $attributes['stretch'] ? 'false' : 'true';
        
        if ($attachment && 'image/svg+xml' === $attachment->post_mime_type) {
            $imagePath = get_attached_file($attachmentId);
            $svgCode = file_get_contents($imagePath);
            $stretch = $attributes["stretch"] ? 'true' : 'false';
            $modifiedSvgCode = preg_replace('/\sid="[^"]+"/', '', $svgCode);
            $modifiedSvgCode = str_replace('<?xml version="1.0" encoding="UTF-8"?>', '', $svgCode);
            $modifiedSvgCode = str_replace('<svg', '<svg role="presentation" style="display: none;" class="imageIcon aundo-icons blockIcon ' . $attributes['bgColor'] . ' ' . $attributes['className'] . '"', $modifiedSvgCode);
            
            echo '<div class="iconImg" data-position="' . $position . '" data-stretch="' . $stretch . '" >';
            echo $modifiedSvgCode;
            echo $content;
            echo '</div>';

        }
        ?>

        <?php return ob_get_clean();
    }
}

$saveassvg = new iconimg();

