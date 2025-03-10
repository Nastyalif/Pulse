const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');/* все лишние пробелы и т.д. будут убраны */

gulp.task('server', function() {
    browserSync ({
        server: {
            baseDir:"dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task("fonts", function () {
    return gulp
        .src("src/fonts/**/*", { encoding: false })  // Вот тут!
        .pipe(gulp.dest("dist/fonts"));
});

// Таск для сборки SCSS -> CSS с автопрефиксом и минификацией
function styles() {
    return gulp.src("src/sass/**/*.+(scss|sass)") // Берем все SCSS-файлы
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // Компилируем SCSS в CSS
        .pipe(postcss([autoprefixer()])) // Добавляем префиксы
        .pipe(gulp.dest('./src/css')) // Сохраняем обычный style.css
        .pipe(cleanCSS({ compatibility: 'ie8' })) // Минифицируем
        .pipe(rename({ suffix: '.min' })) // Добавляем .min к имени файла
        .pipe(gulp.dest('dist/css')) // Сохраняем минифицированный style.min.css
        .pipe(browserSync.stream()); // Обновляем браузер
}

// Таск для обработки font.css
function fontStyles() {
    return gulp.src("src/sass/libs/_font.scss")  // Указываем правильный путь к font.css
        .pipe(postcss([autoprefixer()]))    // Добавляем автопрефиксы
        .pipe(cleanCSS())                   // Минифицируем CSS
        .pipe(rename({ suffix: '.min' }))    // Добавляем .min к имени файла
        .pipe(gulp.dest('src/css'))          // Сохраняем обработанный и минифицированный файл
        .pipe(browserSync.stream());        // Обновляем браузер
}

// Таск для локального сервера и слежения за файлами
function watch() {
    browserSync.init({
        server: {
            baseDir: "src" // Где лежит index.html
        }
    });
    gulp.watch("src/sass/**/*.+(scss|sass|css)", styles); // Следим за SCSS и запускаем styles /**/ <---говорит, что мы следим за всеми файлами такого расшырения, который есть в sass, но и за всеми папками и файлами внутри
    gulp.watch("src/css/font.css", fontStyles); // Следим за изменениями в font.css и запускаем fontStyles
    gulp.watch("src/*.html").on('change', gulp.parallel('html')); // Обновляем HTML при изменении
}

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));

});

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js") /* ** - что бы можна было брать с абсолютно любой папки */
        .pipe(gulp.dest("dist/js"));
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*") /* ** - что бы можна было брать с абсолютно любой папки */
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*") /* ** - что бы можна было брать с абсолютно любой папки */
        .pipe(gulp.dest("dist/icons"));
});

gulp.task('mailer', function () {
    return gulp.src("src/mailer/**/*") /* ** - что бы можна было брать с абсолютно любой папки */
        .pipe(gulp.dest("dist/mailer"));
});

gulp.task('images', function () {
    return gulp.src("src/img/**/*") /* ** - что бы можна было брать с абсолютно любой папки */
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"));
});

gulp.task('styles', styles);
gulp.task('watch', watch);
gulp.task('fontStyles', fontStyles);

exports.styles = styles;
exports.fontStyles = fontStyles;
exports.watch = watch;
// exports.default = gulp.series(styles, fontStyles, watch);

gulp.task('default', gulp.series(
    gulp.parallel('styles', 'scripts', 'fonts', 'icons', 'mailer', 'images'),
    'watch', 'server'
));

