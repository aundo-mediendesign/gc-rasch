<?php
/**
 * Plugin Name:       Aundo Icons
 * Description:       Custom Gutenberg-Blöcke.
 * Version:           0.1.0
 * Author:            a&o mediendesign
 * Text Domain:       aundo-icons
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

class aundoicons {
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
        $class = '';
        $style = '';
        if ($attributes["block"]) {
            $class = 'blockIcon';
        } 
        else {
            $class = 'inlineIcon';
            $style = 'display: none';
        }
        ?>
        <?php 
        $attachmentId = $attributes['imageId'];

        if (!$attachmentId) {
            // Backup für alte Plugin-Version
            $attachmentId = attachment_url_to_postid($attributes['image']);
        }
        $attachment = get_post($attachmentId);
        if ($attachment && 'image/svg+xml' === $attachment->post_mime_type) {
            $imagePath = get_attached_file($attachmentId);
            $svgCode = file_get_contents($imagePath);
            $stretch = $attributes["stretch"] ? 'true' : 'false';
            $modifiedSvgCode = preg_replace('/\sid="[^"]+"/', '', $svgCode);
            $modifiedSvgCode = str_replace(
            '<svg', '<svg 
            role="presentation"
            style="' . $style . '"
            class="aundo-icons ' . $class . '"', 
            $modifiedSvgCode
            );
            echo $modifiedSvgCode;
        }
        
        ?>
        <?php return ob_get_clean();
    }
}

$aundoicons = new aundoicons();

