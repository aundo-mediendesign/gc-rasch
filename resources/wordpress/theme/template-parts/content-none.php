<?php
/**
 * Template part for displaying a message that posts cannot be found
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package aundo
 */

?>
<article>
	<div class="entry-content">
		<h1 class="page-title"><?php printf( esc_html__( 'Suchergebnisse für: %s', 'aundo' ), '<span>' . get_search_query() . '</span>' ); ?></h1>

		<?php
		if ( is_home() && current_user_can( 'publish_posts' ) ) :

			printf(
				'<p>' . wp_kses(
					/* translators: 1: link to WP admin new post page. */
					__( 'Bereit für deinen ersten Post? <a href="%1$s">Hier erstellen.</a>.', 'aundo' ),
					array(
						'a' => array(
							'href' => array(),
						),
					)
				) . '</p>',
				esc_url( admin_url( 'post-new.php' ) )
			);

		elseif ( is_search() ) :
			?>

			<p><?php esc_html_e( 'Für diesen Suchbegriff wurde leider nichts gefunden.', 'aundo' ); ?></p>
			<?php
			get_search_form();

		else :
			?>

			<p><?php esc_html_e( 'Leider nichts gefunden. Vielleicht hilft die Suche weiter.', 'aundo' ); ?></p>
			<?php
			get_search_form();

		endif;
		?>	
	</div>
</article><!-- .no-results -->