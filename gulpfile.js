const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Таск для сборки SCSS -> CSS с автопрефиксом и минификацией
function styles() {
    return gulp.src("src/sass/**/*.+(scss|sass)") // Берем все SCSS-файлы
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // Компилируем SCSS в CSS
        .pipe(postcss([autoprefixer()])) // Добавляем префиксы
        .pipe(gulp.dest('./src/css')) // Сохраняем обычный style.css
        .pipe(cleanCSS({ compatibility: 'ie8' })) // Минифицируем
        .pipe(rename({ suffix: '.min' })) // Добавляем .min к имени файла
        .pipe(gulp.dest('./src/css')) // Сохраняем минифицированный style.min.css
        .pipe(browserSync.stream()); // Обновляем браузер
}

// Таск для обработки font.css
function fontStyles() {
    return gulp.src("src/css/font.css")  // Указываем правильный путь к font.css
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
    gulp.watch("src/sass/**/*.+(scss|sass)", styles); // Следим за SCSS и запускаем styles /**/ <---говорит, что мы следим за всеми файлами такого расшырения, который есть в sass, но и за всеми папками и файлами внутри
    gulp.watch("src/css/font.css", fontStyles); // Следим за изменениями в font.css и запускаем fontStyles
    gulp.watch("src/*.html").on('change', browserSync.reload); // Обновляем HTML при изменении
}

// Экспортируем задачи
exports.styles = styles;
exports.fontStyles = fontStyles;
exports.watch = watch;
exports.default = gulp.series(styles, fontStyles, watch);



// const gulp = require('gulp'); /* *указывает какие пакеты используются в проекте  */
// const browserSync = require('browser-sync');
// const sass = require('gulp-sass')(require('sass')); /* теперь можно использовать компилятор sass */
// const cleanCSS = require('gulp-clean-css');
// const autoprefixer = require('gulp-autoprefixer');
// const rename = require("gulp-rename");

// gulp.task('server', function () { /* настройка самого простого сервера browserSync*/

//     browserSync({ 
//         server: {
//             baseDir: "src"
//         }
//     });

//     gulp.watch("src/*.html").on('change', browserSync.reload);
// });

// gulp.task('styles', function () {
//     return gulp.src("src/sass/**/*.+(scss|sass)") /* при помощи src можно выполнять различные операции над данным файлом */
//         .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) /* сказано какой стиль будет в итоге */
//         .pipe(rename({ suffix: '.min', prefix: '' }))
//         .pipe(autoprefixer())
//         .pipe(cleanCSS({ compatibility: 'ie8' }))
//         .pipe(gulp.dest("src/css"))
//         .pipe(browserSync.stream());
// });

// gulp.task('watch', function () { /* gulp следит как за стелистическими файлами так и за html файлом  */
//     gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
// })

// gulp.task('default', gulp.parallel('watch', 'server', 'styles'));