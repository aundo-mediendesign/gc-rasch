<?php
/**
 * Plugin Name:       Aundo Accordion
 * Description:       Custom Gutenberg-Blöcke.
 * Version:           0.1.0
 * Author:            a&o mediendesign
 * Text Domain:       aundo-accordion
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

class aundoaccordion {
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
        <div data-active="false" class="aundo-accordion <?php echo $attributes['className']; ?> " data-style="<?php echo $attributes['style']; ?>" style="--margin: <?php echo $attributes['margin']; ?>%" data-ref="accWrapRef">
            <div class="accHead <?php echo $attributes['headClass']; ?>" role="button">
                <?php 
                if (isset($attributes['titleType']) && $attributes['titleType']) {
                    echo '<' . $attributes['titleType'];
                }
                else {
                    echo '<p';
                }
                if (!isset($attributes['titleClass']) || !$attributes['titleClass']) {
                    echo ' class="mt-none mb-none font-mediumRegular">';
                }
                else {
                    echo ' class="' . $attributes['titleClass'] . '">';
                }
                if (isset($attributes['titleActive']) && $attributes['titleActive']) {
                    echo '<span class="titleClosed">';
                    echo $attributes['title'];
                    echo '</span>';
                    echo '<span class="titleOpen">';
                    echo $attributes['titleActive'];
                    echo '</span>';
                }
                else {
                    echo $attributes['title'];
                }
                if (isset($attributes['titleType']) && $attributes['titleType']) {
                    echo '</' . $attributes['titleType'] . '>';
                }
                else {
                    echo '</p>';
                }
                ?>
                <?php if (isset($attributes['imageCode']) && $attributes['imageCode']) { ?>
                    <img class="openicon" alt="accordion-icon" src=<?php echo $attributes['image']; ?> />
                <?php } 
                else { ?>
                    <svg role="button" class="openicon" xmlns="http://www.w3.org/2000/svg" width="18.16" height="26.42" viewBox="0 0 18.16 26.42"><path d="m4.13,26.42L.01,22.05l9.39-8.85L0,4.37,4.11,0l14.05,13.2-14.03,13.22Z"/></svg>
                <?php } ?>
            </div>
            <div class="accContent font-smallLight <?php echo $attributes['contentClass']; ?>">
                <?php echo $content; ?>
            </div>
        </div>
        <?php return ob_get_clean();
    }
}

$aundoaccordion = new aundoaccordion();

