<?php
/**
 * Template part for displaying posts (archive.php)
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package aundo
 */

?>


<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content linked-area">
	
		<a href="<?php the_permalink();?>" class="link"></a>

		<?php			
			if ( has_post_thumbnail() ) { 
				aundo_post_thumbnail(); 

			}	
		?>

		<?php the_title( '<p class="entry-title has-text-align-center">', '</p>' ); ?>

	</div><!-- .entry-content -->

</article><!-- #post-<?php the_ID(); ?> -->

