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
$category = get_the_category();
?>

    <main id=<?php echo strtolower($category[0]->name); ?>>
        <section class="content page-content">
            <?php
            $custom_query = new WP_Query( array(
                'post_type'      => 'page', // set the post type to page
                'title' => $category[0]->name,
            ) );
            if ($custom_query->have_posts()) : while($custom_query->have_posts()) : $custom_query->the_post(); ?> 

                <?php the_content();?> 

                <?php endwhile; else : ?>
                <p>Keine Beiträge</p>
            <?php endif; wp_reset_postdata(); 
            ?>
        </section>

    </main><!-- #main -->

<?php
get_footer();


