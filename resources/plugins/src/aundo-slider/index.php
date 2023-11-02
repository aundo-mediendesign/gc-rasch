<?php
/**
 * Plugin Name:       Aundo Slider
 * Description:       Custom Gutenberg-Blöcke.
 * Version:           0.1.0
 * Author:            a&o mediendesign
 * Text Domain:       aundo-slider
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

class aundoslider {
  function __construct() {
    add_action('init', array($this, 'adminAssets'));
  }

    function adminAssets() {
        register_block_type(__DIR__ . '', array(
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
        $content_style;
        $child_content;
        $child_content;
        if ($attributes['child_content_active']) { 
            $dom = new DOMDocument();
            $dom->loadHTML($content);
            
            $cleanDom = $dom->cloneNode(true);
            $xpath = new DOMXPath($cleanDom);
            $element = $xpath->query('//div[contains(@class, "slideTemplateFirst")]')->item(0);
            if ($element) {
                // Entferne das gefundene Element
                $element->parentNode->removeChild($element);
            }
            // $cleanedDom = $cleanDom->cloneNode(true);

            $current_page_id = get_the_ID(); 
            $args = array(
                'child_of' => $current_page_id, 
            );
            $child_pages = get_pages($args);
            foreach ($child_pages as $index => $child_page) {
                $slide_template;
                // if ($index == 0) {
                    $slide_template = $dom->cloneNode(true);
                // } else {
                //     $slide_template = $cleanDom->cloneNode(true);
                // }
                $xpath = new DOMXPath($slide_template);

                $images = $slide_template->getElementsByTagName('img');
                if ($images) {
                    $child_img = get_the_post_thumbnail_url($child_page->ID, array( 430, 430));
                    $images[0]->setAttribute('src', $child_img);
                }

                $title = $xpath->query('//*[contains(text(), "title")]');
                if ($title) {
                    $child_title = get_the_title($child_page->ID);
                    $title[0]->nodeValue = $child_title;
                }
                $excerpt = $xpath->query('//*[contains(text(), "excerpt")]');
                if ($excerpt) {
                    $child_excerpt = get_the_excerpt($child_page->ID);
                    $excerpt[0]->nodeValue = $child_excerpt;
                }
                $matchingLinks = $xpath->query('//a[contains(@href, "link")]');
                if ($matchingLinks && $matchingLinks->length > 0) {
                    foreach ($matchingLinks as $link) {
                        $child_link = get_the_permalink($child_page->ID); // Überprüfe, ob $child_page definiert ist
                        if ($child_link) {
                            $link->setAttribute('href', $child_link);
                        }
                    }
                }

                $child_content .= $slide_template->saveHTML();
            }
        }
        if (!$attributes['justmobile']) {
            $content_style = 'display: none';
        }
        $animation_type = $attributes['animation'] ? $attributes['animation'] : 'scroll';
        ?>
        <div class="aundo-slider">
            <div class="sliderJS <?php echo $animation_type; ?>"></div>
            <pre style="display: none"><?php echo wp_json_encode($attributes); ?></pre>

            <div style="<?php echo $content_style; ?>" class="sliderContent">
                <?php 
                if ($attributes['child_content_active']) {
                    echo '<div class="wp-block-create-block-aundo-slider">' . $child_content . '</div>'; 
                } else {
                    echo $content; 
                }
                ?>
            </div>
        </div>

        <?php return ob_get_clean();
    }
    
}

$aundoslider = new aundoslider();

