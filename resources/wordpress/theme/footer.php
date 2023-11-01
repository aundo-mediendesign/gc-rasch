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
        <footer id="site-footer" class="footer-group sidePadding editMargin">
            <div>
                <?php 
                    if ( is_active_sidebar( 'footer-widgets' ) ) :
                        dynamic_sidebar( 'footer-widgets' );
                    endif;
                ?>
                <?php 
                $menuParameters = array(
                    'menu' => 'Footer',
                    'container'=> false,
                    'echo'            => false, 
                    'menu_class'=> false,
                    'items_wrap'      => '%3$s',
                    'depth'           => 0
                );
                    
                // if ( is_active_sidebar( 'footer-socialicons' ) ) :
                //     dynamic_sidebar( 'footer-socialicons' );
                // endif;
                // echo str_replace (
                //     '<a' , '<a class="hide980" ' , 
                //     strip_tags(
                //         wp_nav_menu( $menuParameters ),
                //     '<a>' ) 
                // ); 
              
                ?>
                <p class="footerAbbinder">© <?php echo date("Y"); ?> • a&o mediendesign GmbH</p>
            </div>
        </footer>

    <?php wp_footer(); ?>


	</body>
</html>
