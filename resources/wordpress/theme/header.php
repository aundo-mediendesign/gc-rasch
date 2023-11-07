<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div >
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package aundo
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<div id="headerscript"></div>

<body id="body" <?php body_class(); ?> style='font-family: Raleway; font-size: clamp(1.2rem, 1.9vw, 1.5rem); --windowHeight: 100vh' >
    <header id="mainHead">
        <div data-status="closed" class="header sidePadding editMargin flex alignCenter ontop" >
            <div data-status="closed" class="navigation sidePadding">
                <?php 
                    wp_nav_menu( array(
                        'menu' => 'Main',                
                    ) );
                ?>
                <div class="mt-smallMargin">
                    <?php 
                    if ( is_active_sidebar( 'header-widgets' ) ) :
                        dynamic_sidebar( 'header-widgets' );
                    endif;
                    ?>
                    <p class="spacer"></p>
                </div>
            </div>
            <?php echo get_custom_logo(); ?>
            <!-- <a href="/">
                <svg class="custom-logo-link" width="63.8" height="50" viewBox="0 0 63.8 50">
                    <g class="hideIfOpen">
                        <path d="M13.28,48.88c-1.12-1.31-1.68-2.99-1.68-4.77h0c0-3.18-2.62-5.8-5.8-5.8s-5.8,2.62-5.8,5.8,2.62,5.8,5.8,5.8c1.87,0,3.65-.94,4.77-2.43,.37,.94,.84,1.78,1.5,2.53l1.22-1.12h0Zm-7.48-.65c-2.25,0-4.12-1.87-4.12-4.12s1.87-4.12,4.12-4.12,4.12,1.87,4.12,4.12h0c0,2.34-1.87,4.12-4.12,4.12"/>
                        <path d="M61.37,39.43c.65-.28,1.31-.65,1.96-1.03l-1.03-1.4c-1.22,.94-2.81,1.4-4.3,1.4h0c-3.18,0-5.8,2.62-5.8,5.8s2.62,5.8,5.8,5.8,5.8-2.62,5.8-5.8c.09-1.87-.84-3.65-2.43-4.77m-3.27,8.89c-2.25,0-4.12-1.87-4.12-4.12s1.87-4.12,4.12-4.12,4.12,1.87,4.12,4.12h0c-.09,2.25-1.87,4.12-4.12,4.12"/>
                        <path d="M49.3,37v3.09c-2.25-2.25-5.89-2.25-8.23,0-2.25,2.25-2.25,5.89,0,8.23,2.25,2.25,5.89,2.25,8.23,0,1.12-1.12,1.68-2.53,1.68-4.12v-7.2h-1.68Zm-4.02,11.32c-2.25,0-4.12-1.87-4.12-4.12s1.87-4.12,4.12-4.12,4.12,1.87,4.12,4.12h0c-.09,2.25-1.87,4.12-4.12,4.12"/>
                        <path d="M32.37,38.4c-1.5,0-2.99,.56-4.12,1.68v-1.68h-1.68v11.6h1.78v-5.8c0-2.25,1.87-4.12,4.12-4.12s4.12,1.87,4.12,4.12v5.8h1.68v-5.8c-.09-3.18-2.62-5.8-5.89-5.8h0"/>
                        <path d="M23.2,38.4v5.8c0,2.25-1.87,4.12-4.12,4.12s-4.12-1.87-4.12-4.12v-5.8h-1.68v5.8c0,3.18,2.62,5.8,5.8,5.8,1.5,0,2.99-.65,4.12-1.68v1.68h1.68v-11.6h-1.68Z"/>
                    </g>    
                    <path d="M32.46,32.69c-1.5,0-2.99-.47-4.21-1.5-6.74-5.33-11.23-13.1-12.44-21.52-.19-1.5,.09-3.09,.84-4.4,.75-1.31,1.96-2.34,3.37-2.9,8.04-3.18,16.93-3.18,24.98,0,1.4,.56,2.62,1.59,3.37,2.9s1.03,2.9,.84,4.4c-.65,4.21-2.06,8.33-4.3,12.07-2.15,3.65-4.86,6.83-8.23,9.45-1.22,.94-2.71,1.5-4.21,1.5h0Zm-1.96-15.15h0c.37,.94,.84,1.78,1.5,2.53l1.22-1.12c-1.12-1.31-1.68-2.99-1.68-4.77h0c0-3.18-2.62-5.8-5.8-5.8s-5.8,2.62-5.8,5.8,2.62,5.8,5.8,5.8c1.87,0,3.65-.84,4.77-2.43h0Zm8.61-9.07c-3.18,0-5.8,2.62-5.8,5.8s2.62,5.8,5.8,5.8,5.8-2.62,5.8-5.8c0-1.87-.94-3.65-2.43-4.77,.65-.28,1.31-.65,1.96-1.03l-.94-1.4c-1.4,.84-2.9,1.31-4.4,1.4h0Zm0,9.82c-2.25,0-4.12-1.87-4.12-4.12s1.87-4.12,4.12-4.12,4.12,1.87,4.12,4.12h0c-.09,2.34-1.87,4.12-4.12,4.12h0Zm-13.38,0c-2.25,0-4.12-1.87-4.12-4.12s1.87-4.12,4.12-4.12,4.12,1.87,4.12,4.12h0c0,2.34-1.87,4.12-4.12,4.12h0Z" />
                </svg>
            </a>     -->      
            <div class="burger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </header><!-- #masthead -->