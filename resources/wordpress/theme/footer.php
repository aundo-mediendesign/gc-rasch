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
<?php
$user = wp_get_current_user();
$allowed_roles = array( 'editor', 'administrator', 'author' );
if ( array_intersect( $allowed_roles, $user->roles ) ) { ?>
    <script>
        window.Userback = window.Userback || {};
        Userback.access_token = '9284|86116|CBjHrU6v8GREjsRhpCUKDasbJbmbo2gU87ku1PhCIhgN2fcWQZ';
        (function(d) {
            var s = d.createElement('script');s.async = true;
            s.src = 'https://static.userback.io/widget/v1.js';
            (d.head || d.body).appendChild(s);
        })(document);
    </script>
<?php } 
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
