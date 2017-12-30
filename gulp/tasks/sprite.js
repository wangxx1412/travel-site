/*Icon Sprite*/
var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var rename = require('gulp-rename');
var del = require('del');
svg2png = require('gulp-svg2png');

var config = {
  mode:{
    shape:{
      spacing{
        padding:1
      }
    },
    css:{
      variables:{
        replaceSvgWithPng:function(){
          return function(sprite,render){
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
      sprite:'sprite.svg',
      render:{
        css:{
          template:'./gulp/template/sprite.css'
        }
      }
    }
  }
}

gulp.task('beginClean',function(){
  return del(['./app/temp/sprite','./app/assets/images/sprites']);
});

gulp.task('createSprite',['beginClean'], function(){
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('createPngCopy',['createSprite'],function(){
  return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
});

gulp.task('copySpriteImage',['createPngCopy'], function(){
  return gulp.src('./app/temp/sprite/css/**/*{svg,png}')
  .pipe(gulp.dest('./app/assets/images/sprite'));
});

gulp.task('copySpriteCSS',['createSprite'], function (){
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteImage','copySpriteCSS'],function(){
  return del('./app/temp/sprite');
});

gulp.task('icons',['beginClean','createSprite','createPngCopy','copySpriteImage','copySpriteCSS','endClean']);
