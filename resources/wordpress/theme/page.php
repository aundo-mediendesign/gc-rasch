<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package aundo
 */

get_header();
?>

    <main class="main">
        <section  class="content page-content">
            <!-- <div id="react-app"></div> -->
            <?php
            if ( have_posts() ) :
             

                /* Start the Loop */
                while ( have_posts() ) :
                    the_post();
                    /*
                    * Include the Post-Type-specific template for the content.
                    * If you want to override this in a child theme, then include a file
                    * called content-___.php (where ___ is the Post Type name) and that will be used instead.
                    */
                    the_content();

                endwhile;

                the_posts_navigation();

            // else :

            //     get_template_part( 'template-parts/content', 'none' );

            endif;
            ?>
        </section>

    </main><!-- #main -->

<?php
get_footer();

wp_reset_postdata();

