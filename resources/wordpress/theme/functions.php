<?php
/*
 * Theme
*/

$disable_gutenberg = false;

if ( ! function_exists( 'underscore_setup' ) ) :
	function underscore_setup() {
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
        add_theme_support( 'menus' );
	}
endif;
add_action( 'after_setup_theme', 'underscore_setup' );

/**
 * Register widget area
 */
function underscore_widgets_init() {
	register_sidebar( array(
        'name'          => __( 'Footer Widgets', 'aundo' ),
        'id'            => 'footer-widgets',
        'description'   => __( 'Widget Area für den Footer.', 'aundo' ),
        'before_widget' => '',
        'after_widget'  => '',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
	) );	
	register_sidebar( array(
        'name'          => __( 'Header Widgets', 'aundo' ),
        'id'            => 'header-widgets',
        'description'   => __( 'Widget Area für den Header.', 'aundo' ),
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget'  => '</aside>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );
}
add_action( 'widgets_init', 'underscore_widgets_init' );

if ($disable_gutenberg) {
    // Disable gutenberg on content
    add_filter('use_block_editor_for_post', '__return_false');
    // Disable gutenberg on widgets
    add_filter('use_widgets_block_editor','__return_false');
}

function aundo_wp_head(){
    ?>
    <link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri();?>/images/favicon/favicon.ico">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_stylesheet_directory_uri();?>/images/favicon/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_stylesheet_directory_uri();?>/images/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="48x48" href="<?php echo get_stylesheet_directory_uri();?>/images/favicon/favicon-48x48.png">
    <?php
}
add_action('wp_head', 'aundo_wp_head');

function scripts_aundo() {
    $timecode = time();
    $version = date('YmdHis', $timecode);
    // wp_enqueue_style( 'jobplace-style', plugin_dir_url( __FILE__ ) . 'build/index.css' );
    wp_enqueue_script( 'aundo-scripts', get_stylesheet_directory_uri() . '/build/scripts.js', array( 'wp-element' ), $version, true );
}
add_action( 'wp_footer', 'scripts_aundo' );

function wpdocs_enqueue_custom_admin_style() {
    $timecode = time(); 
    $version = date('YmdHis', $timecode);
    wp_register_style( 'custom_wp_admin_css', get_template_directory_uri() . '/admin.css', false, $version );
    wp_enqueue_style( 'custom_wp_admin_css' );
}
add_action( 'admin_enqueue_scripts', 'wpdocs_enqueue_custom_admin_style' );

function aundo_custom_styles () {
    $timecode = time();
    $version = date('YmdHis', $timecode);
    wp_register_style( 'aundo-style', get_stylesheet_directory_uri() . '/style.css', false, $version );
    wp_enqueue_style( 'aundo-style' );    
}
add_action ('wp_enqueue_scripts', 'aundo_custom_styles');


// Add title attribute to images
function featured_image_titles($attr, $attachment = null){
    $attr['title'] = get_post($attachment->ID)->post_title;
    return $attr;
}
add_filter('wp_get_attachment_image_attributes', 'featured_image_titles', 10, 2);


function disable_emojis() {
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' ); 
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' ); 
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
    add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
    add_filter( 'wp_resource_hints', 'disable_emojis_remove_dns_prefetch', 10, 2 );
   }
add_action( 'init', 'disable_emojis' );

//Remove Gutenberg Block Library CSS from loading on the frontend
function smartwp_remove_wp_block_library_css(){
    wp_deregister_style('classic-theme-styles');
    wp_dequeue_style('classic-theme-styles');
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'wc-blocks-style' ); // Remove WooCommerce block CSS
    // wp_deregister_script( 'jquery');
    // wp_dequeue_script( 'jquery');
} 
add_action( 'wp_enqueue_scripts', 'smartwp_remove_wp_block_library_css', 100 );


// Featured Image in Rest-Api
add_action('rest_api_init', 'register_rest_images' );
function register_rest_images(){
    register_rest_field( array('post'),
        'post_image',
        array(
            'get_callback'    => 'get_rest_featured_image',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}
function get_rest_featured_image( $object, $field_name, $request ) {
    if( $object['featured_media'] ){
        $alt_text = get_post_meta($object['featured_media'], '_wp_attachment_image_alt', TRUE);; 
        $img_meta = wp_get_attachment_metadata( $object['featured_media'] );
        $img_title = get_the_title( $object['featured_media'] );
        $img_url = wp_get_attachment_image_url( $object['featured_media'], 'app-thumb' );
        $img =[$object, $img_url, $alt_text, $img_meta['width'], $img_meta['height'], $img_title];
        return $img;
    }
    return false;
}

include 'inc/functions-svg-upload.php';

// Shortcode für Sidebar-Ausgabe
function sidebar_shortcode($atts) {
    // Extrahiere die Attribute
    $atts = shortcode_atts(
        array(
            'sidebar_name' => '',
        ),
        $atts,
        'sidebar_shortcode'
    );
    
    // Überprüfe, ob der sidebar_name angegeben wurde
    if (empty($atts['sidebar_name'])) {
        return ''; // Wenn kein sidebar_name vorhanden ist, gebe nichts aus
    }
    
    ob_start(); // Starte den Puffer
    
    // Rufe die Sidebar basierend auf dem sidebar_name auf
    dynamic_sidebar($atts['sidebar_name']);
    
    $output = ob_get_clean(); // Hole den Inhalt des Puffers
    
    return $output; // Gib den Inhalt des Puffers zurück
}
add_shortcode('sidebar_shortcode', 'sidebar_shortcode');

// Deaktiviere automatische Absatzformatierung für den angegebenen Shortcode
function disable_shortcode_autop($content) {
    $shortcodes = array(
        'sidebar_shortcode', // Füge hier den Namen deines Shortcodes hinzu
        // Füge weitere Shortcodes hinzu, falls erforderlich
    );

    if (has_shortcode($content, $shortcodes)) {
        remove_filter('the_content', 'wpautop');
        remove_filter('widget_text_content', 'wpautop');
    }

    return $content;
}
add_filter('the_content', 'disable_shortcode_autop', 0);
add_filter('widget_text_content', 'disable_shortcode_autop', 0);


function itsme_disable_feed() {
    wp_die( __( 'No feed available, please visit the <a href="'. esc_url( home_url( '/' ) ) .'">homepage</a>!' ) );
}
   
add_action('do_feed', 'itsme_disable_feed', 1);
add_action('do_feed_rdf', 'itsme_disable_feed', 1);
add_action('do_feed_rss', 'itsme_disable_feed', 1);
add_action('do_feed_rss2', 'itsme_disable_feed', 1);
add_action('do_feed_atom', 'itsme_disable_feed', 1);
add_action('do_feed_rss2_comments', 'itsme_disable_feed', 1);
add_action('do_feed_atom_comments', 'itsme_disable_feed', 1);
add_post_type_support( 'page', 'excerpt' );

function add_custom_class_to_editor() {
    global $post;
    
    if ($post) {
        $post_template = get_page_template_slug($post->ID);
        $post_type = get_post_type();
        if ($post_template || ($post_type == 'post')) {
            if ($post_template) {
                $post_template = sanitize_html_class($post_template);
            }
            ?>
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(() => {
                        var editorContainer = document.querySelector('.is-root-container');
                        if (editorContainer) {
                            editorContainer.classList.add('single-content');
                            editorContainer.classList.add('content');
                        }
                    }, 1000)
                });
            </script>
            <?php
        }
    }
}
add_action('admin_footer-post.php', 'add_custom_class_to_editor');
add_action('admin_footer-post-new.php', 'add_custom_class_to_editor');
add_filter( 'big_image_size_threshold', '__return_false' );

// Thumbnail sizes
// add_image_size( 'custom-size1', 550 );
// add_image_size( 'custom-size2', 800 );
// add_image_size( 'custom-size3', 320 );
// add_image_size( 'custom-size4', 25 );

// function fontspreload () {
//     $url = home_url(); 
//     echo '<link rel="preload" as="font" href="' . esc_url( $url ) . '/wp-content/themes/aundo/fonts/RusticaRegularVariable.woff2" type="font/woff2" crossorigin="anonymous">';
// }
// add_action('wp_head', 'fontspreload', 1);