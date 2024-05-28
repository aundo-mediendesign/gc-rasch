const gulp = require('gulp');
const exec = require('child_process').exec;
const fs = require('fs');
const favicons = require("favicons").stream;
const log = require("fancy-log");

/**
 * Favicon
 */
gulp.task("favicon", function () {
  return gulp.src("./resources/favicon/icon.png").pipe(favicons({
      version: 1.0,
      logging: false,
      icons: {
        android: false,       // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        appleIcon: false,     // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        appleStartup: false,  // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        coast: false,         // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        favicons: true,       // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        firefox: false,       // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        windows: false,       // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        yandex: false         // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    }
  }))
  .on("error", log)
  .pipe(gulp.dest("./resources/wordpress/theme/images/favicon/"));
});


/**
 * Download wordpress plugins
 */
gulp.task('wp-download-plugins', function(done) {
  var fileContent = fs.readFileSync("./plugins.txt", "utf8");
  process.chdir('./docker');
  exec('docker compose --env-file .env -f conf/docker-compose.yml run --rm wpcli plugin install ' + fileContent.replace(/\r?\n|\r/g, " "), function(error, stdout, stderr) {
    console.log(stdout);
  }).on('exit', function(code) {
    done();
  });
});