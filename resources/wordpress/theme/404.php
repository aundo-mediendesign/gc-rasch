<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package aundo
 */

get_header();
?>
    <main id="<?php the_field('custom_page_id'); ?>" class="main">
        <section  class="content page-content">
            <?php
            $more = get_the_title() . '_more'; 
            $your_query = new WP_Query( 'pagename=404-page' );
            while ( $your_query->have_posts() ) : $your_query->the_post(); 
            the_content();
            endwhile; ?>

        </section><!-- .error-404 -->
    </main><!-- .main -->

<?php
get_footer();
