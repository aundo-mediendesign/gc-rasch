<?php
/**
 * Template part for displaying posts in single.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package aundo
 */

?>

<?php $category = get_the_category(); ?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?> data-category=<?php echo $category[0]->name; ?>>
    <div class="headImg mask mask-main">
        <?php
        echo wp_get_attachment_image( get_field("headerbild"), "", false );
        ?>
    </div>
    <div  class="content single-content smallFont">
        <!-- <div class="content single-content smallFont mediumMarginBottom"> -->
            <h1 class="boldBig editFont"><?php the_title(); ?></h1>
            <?php if (get_post_meta($post->ID, 'subline', true)) {
                // Überbleibsel von alter Website
                echo '<h2>' . get_post_meta($post->ID, 'subline', true) . '</h2>';
            }
            the_content(); ?>
            <!-- <div class="flex space-between alignCenter mediumMarginTop">

                <div class="social-link flex alignCenter">
                    <span class="smallFont noMarginBottom">Diesen Beitrag teilen:&nbsp;</span>  
                    <a href="https://www.xing.com/spi/shares/new?url=<?php the_permalink(); ?>" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2500 2500" class="flex">
                            <path d="M379.93,493.76c-21.7,0-39.96,7.63-49.17,22.54-9.5,15.39-8.06,35.22,2.07,55.3l243.79,422.01c.41,.8,.41,1.31,0,2.05L193.52,1671.71c-9.99,19.9-9.5,39.89,0,55.31,9.2,14.84,25.41,24.58,47.14,24.58h360.55c53.9,0,79.91-36.38,98.34-69.63,0,0,374.66-662.62,389.25-688.35-1.48-2.38-247.87-432.25-247.87-432.25-17.99-31.96-45.07-67.63-100.37-67.63H379.93ZM1894.68,.02c-53.86,0-77.2,33.92-96.54,68.68,0,0-776.75,1377.5-802.35,1422.73,1.31,2.45,512.3,939.89,512.3,939.89,17.9,31.98,45.51,68.67,100.75,68.67h360.12c21.72,0,38.7-8.17,47.85-23.04,9.63-15.38,9.35-35.71-.74-55.73l-508.3-928.69c-.49-.71-.49-1.65,0-2.36L2306.07,78.67c10.04-19.93,10.25-40.25,.76-55.65C2297.63,8.17,2280.6-.01,2258.88-.01h-364.24V.01h.04Z"/>
                        </svg>
                    </a> 
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=<?php the_permalink(); ?>" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64.79 64.79" class="flex">
                            <path d="M55.21,55.2h-9.6v-15.03c0-3.58-.06-8.2-4.99-8.2s-5.77,3.91-5.77,7.94v15.29h-9.6V24.29h9.22v4.22h.13c1.88-3.21,5.37-5.13,9.09-4.99,9.73,0,11.52,6.4,11.52,14.73v16.96ZM14.42,20.06c-3.08,0-5.57-2.49-5.57-5.57s2.49-5.57,5.57-5.57c3.08,0,5.57,2.49,5.57,5.57s-2.49,5.57-5.57,5.57h0m4.8,35.14H9.61V24.29h9.61v30.92ZM59.99,0H4.78C2.17-.03,.03,2.07,0,4.67V60.11c.03,2.61,2.17,4.7,4.78,4.68H59.99c2.62,.03,4.76-2.06,4.8-4.68V4.67C64.75,2.06,62.61-.03,59.99,0" />
                        </svg>
                    </a> 
                    <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>" class="fb-xfbml-parse-ignore">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.2 193" class="flex">
                            <path d="M194.2,97.1c0,48.43-35.4,88.58-81.9,95.76V125.2h22.6l4.3-28h-.13l.03-.2h-26.9v-18c0-7.7,3.9-15.2,15.9-15.2h12.2v-23.8s-.04,0-.1-.02v-.08s-11-2-21.6-2c-22.2,0-36.6,13.5-36.6,37.8v21.4h-24.8v28h.1v.1h24.7v67.8C35.5,185.8,0,145.6,0,97.1,0,43.5,43.5,0,97.1,0s97.1,43.5,97.1,97.1Z"/>
                        </svg>
                    </a>
                    <a href="http://twitter.com/share??url=<?php the_permalink(); ?>" target="_blank">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 400 400" class="flex">
                        <path d="M400,200c0,110.5-89.5,200-200,200S0,310.5,0,200S89.5,0,200,0S400,89.5,400,200z M163.4,305.5
                            c88.7,0,137.2-73.5,137.2-137.2c0-2.1,0-4.2-0.1-6.2c9.4-6.8,17.6-15.3,24.1-25c-8.6,3.8-17.9,6.4-27.7,7.6
                            c10-6,17.6-15.4,21.2-26.7c-9.3,5.5-19.6,9.5-30.6,11.7c-8.8-9.4-21.3-15.2-35.2-15.2c-26.6,0-48.2,21.6-48.2,48.2
                            c0,3.8,0.4,7.5,1.3,11c-40.1-2-75.6-21.2-99.4-50.4c-4.1,7.1-6.5,15.4-6.5,24.2c0,16.7,8.5,31.5,21.5,40.1c-7.9-0.2-15.3-2.4-21.8-6
                            c0,0.2,0,0.4,0,0.6c0,23.4,16.6,42.8,38.7,47.3c-4,1.1-8.3,1.7-12.7,1.7c-3.1,0-6.1-0.3-9.1-0.9c6.1,19.2,23.9,33.1,45,33.5
                            c-16.5,12.9-37.3,20.6-59.9,20.6c-3.9,0-7.7-0.2-11.5-0.7C110.8,297.5,136.2,305.5,163.4,305.5"/>
                        </svg>
                    </a> 
                </div>	
                <a href=<?php echo get_home_url(). '/' . $category[0]->category_nicename;?> data-class="button-module" data-buttoncenter="false" class="buttonwrapper" target="">
                    <span class="icon">
                        <svg width="24.62" height="48.29" viewBox="0 0 24.62 48.29">
                            <path d="M24.62,0L14.18,18.45h9.92L.09,48.29,7.4,25.75H0L7.48,0H24.62Z"></path>
                        </svg>
                    </span>
                    <span class="button uppercase">Zurück zur Überischt</span>
                </a>
            </div> -->
        <!-- </div> -->
        <!-- <div class="was-wir-leisten"></div> -->
        <!-- <div class="wp-block-group bgParent justBgColor mediumMarginBottom" data-color="Lila dunkel" style="-webkit-mask-image: url('/wp-content/themes/aundo/images/masken/maske-1.webp');">
            <div class="wp-block-group__inner-container">        
                <div class="aundo-background mask center backgroundPattern" style="mask-image: url('/wp-content/themes/aundo/images/masken/maske-1.webp')"></div>
                <h2 class="headline" style="color: #fff">Und sonst so?</h2>    
                <p class="smallFont maxSmall" style="color: #fff">Und was können wir für Sie tun? Einfach <a href="tel:+494219590980" style="color: cyan">0421 95 90 98 0</a> anrufen oder Mail an <a href="mailto:info@aundo.de" style="color: cyan">info@aundo.de</a> schicken und schon geht´s los!</p>                
            </div>
        </div> -->
        <!-- <?php
        $category = get_the_category();
        $tags = wp_get_post_tags($post->ID);

        $tagIds = [];
        foreach($tags as $tag) {
            array_push($tagIds, $tag->term_id );
        }
        $currentPostId = get_the_id();
        $posts_per_page = 2;
        if ($category[0]->name == "Referenzen") {
            $posts_per_page = 3;
        }
        $args = array(
                'posts_per_page'   => $posts_per_page,
                'orderby' => 'rand',
                'post__not_in' => array( $currentPostId, ),
                'cat' => $category[0]->cat_ID,
                "tax_query"     => array(
                    array(
                        "taxonomy" => "post_tag",
                        "field"    => "term_id",
                        "terms"    => $tagIds
                    )
                )); 
        $relatedPosts = new WP_Query( $args );
        if ( $relatedPosts->have_posts() ) {
            echo '<div class="relatedPosts gap blogColumns flex space-between wrap column-gap">';
            while ( $relatedPosts->have_posts() ) {
                $category = get_the_category();
                $relatedPosts->the_post();
                echo '<div class="postItem" 
                data-postid="' . get_the_id() .'"
                data-category="' . $category[0]->name . '"
                >';
                echo the_title();
                echo '</div>';
            }
            echo '</div>';
        }
        else {
            $category = get_the_category();
            $currentPostId = get_the_id();
            $posts_per_page = 2;
            if ($category[0]->name == "Referenzen") {
                $posts_per_page = 3;
            }
            $args = array(
                'posts_per_page'   => $posts_per_page,
                'orderby' => 'rand',
                'post__not_in' => array( $currentPostId, ),
                'cat' => $category[0]->cat_ID
            );
            $relatedPosts = new WP_Query( $args );
            if ( $relatedPosts->have_posts() ) {
                echo '<div class="relatedPosts flex">';
                while ( $relatedPosts->have_posts() ) {
                    $category = get_the_category();
                    $relatedPosts->the_post();
                    echo '<div class="postItem" 
                    data-postid="' . get_the_id() .'"
                    data-category="' . $category[0]->name . '"
                    >';
                    echo the_title();
                    echo '</div>';
                }
                echo '</div>';
            }
        }
        wp_reset_postdata();
        ?> -->
    </div>
    <a href="/kontakt" data-class="button-module" data-buttoncenter="true" class="buttonwrapper bigMarginBottom mediumMarginTop relatedPostsButton" target="">
        <span class="icon">
            <svg width="24.62" height="48.29" viewBox="0 0 24.62 48.29">
                <path d="M24.62,0L14.18,18.45h9.92L.09,48.29,7.4,25.75H0L7.48,0H24.62Z"></path>
            </svg>
        </span>
        <span class="button uppercase">Projekt starten</span>
    </a>