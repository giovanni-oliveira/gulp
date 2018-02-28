const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const pump = require('pump')
const imagemin = require('gulp-imagemin')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('default', ['sass', 'compress', 'compress-images'] )

const compilarSassAddPrefixerMinificar = () => {
    return gulp.src('sass/style.scss')                   
                .pipe( sass().on('error', sass.logError))
                .pipe(autoprefixer({
                    browsers: ['last 2 versions'],
                    cascade: false
                }))
                .pipe( cleanCSS() )       
                .pipe( gulp.dest('css' ) )
    }
gulp.task('sass', compilarSassAddPrefixerMinificar)

gulp.task('watch', () => gulp.watch('sass/*.scss', ['sass']) )

gulp.task('compress', (cb) => {
    pump([
            gulp.src('js/*.js'),
            uglify(),
            gulp.dest('js/minified')
        ],
        cb
    )
})

const comprimirImagens = () => {
    return gulp.src('images/*.*')
        .pipe(imagemin([
                        imagemin.gifsicle({interlaced: true}),
                        imagemin.jpegtran({progressive: true}),
                        imagemin.optipng({optimizationLevel: 5}),
                        imagemin.svgo({
                            plugins: [
                                {removeViewBox: true},
                                {cleanupIDs: false}
                            ]
                        })
                    ]))
        .pipe(gulp.dest('images/compressed'))
}
gulp.task('compress-images', comprimirImagens)
