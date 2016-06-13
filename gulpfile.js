
//gulp requirements
var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var uncss = require('gulp-uncss');
var concat = require('gulp-concat');


//Directory project paths
var projectName = defineProjectName('potg');  //Send an empty string if you don't an extra folder layer

//Paths
var distRoot = '_dist/' + projectName; //Dist path
var srcRoot = '_src/' + projectName; //src path


//Define paths
var homeSourcePath = srcRoot + 'views/homepagefile.html'; //Source path
var viewsSourcePath = srcRoot + 'views/*.html'; //Source path
var sassSourcePath = srcRoot + 'res/sass/*.scss'; //Source path
var graphicsSourcePath = [srcRoot + 'res/graphics/*' , '!' + srcRoot + 'res/graphics/uncompressed']; //Source path
var fontsSourcePath = srcRoot + 'res/fonts/*.+(otf|eot|woff|woff2|ttf|svg)'; //Source path
var jsSourcePath = [srcRoot + 'libs/js/*.js' , srcRoot + 'res/js/*.js']; //Source path
var jsSrcExc = srcRoot + 'res/js/imageupload.js';


function defineProjectName(projectName)
{
	if(projectName)
	{
		return (projectName + '/');
	}
	else
	{
		return ('');
	}
}



gulp.task('htmlMinHome', function() 
{
  return gulp.src(homeSourcePath)
    .pipe(htmlmin({collapseWhitespace: true})) // Minify
    .pipe(rename({ basename: 'index' })) // Change the name to from "home.html" to "index.html" 
    .pipe(gulp.dest(distRoot)); // Distribute
});

gulp.task('htmlMinViews', function() 
{
  return gulp.src([viewsSourcePath, ('!' + homeSourcePath)])
    .pipe(htmlmin({collapseWhitespace: true})) //Mnify
    .pipe(rename(function (path) { path.dirname = path.basename; path.basename = 'index';})) //Change filename to index and move to its own directory
    .pipe(gulp.dest(distRoot + '/' )); //Distribute
});

gulp.task('sass', function() 
{
  return gulp.src(sassSourcePath)    
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	
	/*
	.pipe(uncss({
            html: [viewsSourcePath],
			timeout: 1000,
			ignore: ['.uno','.dos','.tres','.menu-hide-anim.ng-hide','.menu.ng-hide']
        }))*/
	.pipe(gulp.dest(distRoot + '/res/css/'));
});

gulp.task('graphics', function() 
{
  return gulp.src(graphicsSourcePath)    
	.pipe(gulp.dest(distRoot + '/res/graphics/'));
});

gulp.task('fonts', function() 
{
  return gulp.src(fontsSourcePath)    
	.pipe(gulp.dest(distRoot + '/res/fonts/'));
});


gulp.task('js', function() 
{
  return gulp.src(jsSourcePath)
	.pipe(uglify({mangle: false}))
    .pipe(concat('all.js'))
	.pipe(gulp.dest(distRoot + '/res/js/'));
});

  
// Watch Files For Changes
gulp.task('watch', function() 
{
    gulp.watch(homeSourcePath, ['htmlMinHome']);
    gulp.watch(viewsSourcePath, ['htmlMinViews']);
    gulp.watch(sassSourcePath, ['sass']);
    gulp.watch(graphicsSourcePath, ['graphics']);
    gulp.watch(fontsSourcePath, ['fonts']);
    gulp.watch(jsSourcePath, ['js']);
});



// Default Task
gulp.task('default', ['js', 'fonts', 'graphics', 'sass', 'htmlMinHome', 'htmlMinViews', 'watch']);
