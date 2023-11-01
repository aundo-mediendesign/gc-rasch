<?php
/**
 * The template for displaying the footer
 *
 * Contains the opening of the #site-footer div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

?>
    <p class="spacer overlap"></p>
    <footer id="site-footer" class="footer-group sidePadding editMargin flex">
        <?php echo get_custom_logo(); ?>
        <!-- <div class="flex"> -->
        <?php 
            if ( is_active_sidebar( 'footer-widgets' ) ) :
                dynamic_sidebar( 'footer-widgets' );
            endif;
        ?>
        <?php 
        // wp_nav_menu( array(
        //     'menu' => 'Footer',                
        //     ) );
        ?>
        <!-- </div> -->
           
    </footer>
                
    <?php wp_footer(); ?>


	</body>
</html>
