var gulp     = require('gulp');
    sass     = require('gulp-sass');
browserSync  = require('browser-sync'); // Подключаем Browser Sync
concat       = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)
    uglify   = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS)

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/sass/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))// Обновляем CSS на странице при изменении
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))// Создаем префиксы
        .pipe(gulp.dest('app/css'));// Выгружаем результата в папку app/css
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js', // Берем Magnific Popup
        'app/libs/bootstrap/dist/js/bootstrap.min.js'
    ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});


gulp.task('watch', ['browser-sync', 'scripts'], function() {
    gulp.watch("./app/sass/**/*.scss", ["sass"]);
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});