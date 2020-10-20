// gulpモジュールから関数をインポート
const { src, dest, series, parallel, watch } = require('gulp');
// gulpプラグインのインポートツール
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();
// メディアクエリ集約プラグイン
const mqpacker = require('css-mqpacker');
// ブラウザシンクの起動
const browserSync = require('browser-sync');
// コンパイル時のディレクトリ初期化
const del = require('del');
// faviconサイズの定義(不必要なサイズはコメントアウト推奨)
const sizes =[
  [16, 16],  // Win/IE（タブ）、Win&Mac/Chrome（タブ）、Win&Mac/Firefox（タブ）、Mac/Safari（履歴）
  [32, 32],  // Win&MacのRetina/各種ブラウザ（タブ）、Win/IE（新規タブページ）
  [48, 48],  // Win/IE（デスクトップ/タスクバー）
  [57, 57],
  [76, 76],
  [120, 120],
  [128, 128],  // Win8/IE11（カスタムタイル）
  [152, 152],  // iOS/Safari（ホーム画面）、Android/Chrome&ブラウザの一部（タブ・ホーム画面）、Mac/Safari（お気に入り
  [167, 167],
  [180, 180],
  [192, 192],  // Android/Chrome&ブラウザの一部（タブ・ホーム画面）、Win8/IE（ピン留め）
  [512, 512]  // WordPress
];
// 商用環境用
const isProd = process.env.NODE_ENV === "production";
const isStg = process.env.NODE_ENV === "staging";
const isDev = process.env.NODE_ENV === "development";

// pugのコンパイル、ブラウザシンク
function html() {
  return src('./src/pug/**/*.pug')
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(
      $.pug({
        pretty: true
      })
    )
    .pipe($.if(isProd, dest('./prod')))
    .pipe($.if(isStg || isProd, dest('./stg')))
    .pipe(dest('./dev'))
    .pipe(
      browserSync.reload({
        stream: true,
        once: true
      })
    );
}

// scssのコンパイル、ソースマップ作成、ベンダープレフィックス付与、minify化、ブラウザシンク
function css() {
  return src('./src/assets/styles/style.scss')
    .pipe($.if(isDev, $.sourcemaps.init()))
    .pipe($.sass())
    .on('error', $.sass.logError)
    .pipe(
      $.autoprefixer({
        cascade: false
      })
    )
    .pipe($.postcss([mqpacker()]))
    .pipe($.if(isDev, $.sourcemaps.write('./map')))
    .pipe(dest('./dev/css'))
    .pipe(
      $.rename({
        suffix: '.min'
      })
    )
    .pipe($.csso())
    .pipe($.if(isProd, dest('./prod/css')))
    .pipe($.if(isStg || isProd, dest('./stg/css')))
    .pipe(dest('./dev/css'))
    .pipe(
      browserSync.reload({
        stream: true,
        once: true
      })
    );
}

// 画像の圧縮、出力、ブラウザシンク
function img() {
  return src(['./src/assets/images/**/*', '!./src/assets/images/favicon/*'])
    .pipe($.changed('./prod/images/**/*'))
    .pipe(
      $.imagemin({
        optimizationLevel: 3
      })
    )
    .pipe($.if(isProd, dest('./prod/images')))
    .pipe($.if(isStg || isProd, dest('./stg/images')))
    .pipe(dest('./dev/images'))
    .pipe(
      browserSync.reload({
        stream: true,
        once: true
      })
    );
}

// faviconのリサイズ、圧縮、出力、ブラウザシンク
function favicon(done) {
  for (let size of sizes) {
    let width = size[0];
    let height = size[1];
    src('./src/assets/images/favicon/*')
      .pipe(
        $.imageResize({
          width,
          height,
          crop: true,
          upscale: false,
        })
      )
      .pipe(
        $.imagemin({
          optimizationLevel: 3
        })
      )
      .pipe($.rename(`favicon-${width}x${height}.png`))
      .pipe($.if(isProd, dest('./prod/images/favicon/')))
      .pipe($.if(isStg || isProd, dest('./stg/images/favicon')))
      .pipe(dest('./dev/images/favicon'))
      .pipe(
        browserSync.reload({
          stream: true,
          once: true
        })
      );
  }
  done();
}

// JavaScript(ES6)の出力、ソースマップ作成、minify化、ブラウザシンク
function js() {
  return src('./src/assets/js/**/*')
    .pipe($.if(isDev, $.sourcemaps.init()))
    .pipe($.babel())
    .pipe($.plumber())
    .pipe($.uglify({ output: { comments: /^!/ } }))
    .pipe(
      $.concat('main.min.js', {
        newLine: '\n'
      })
    )
    .pipe($.if(isDev, $.sourcemaps.write('./map')))
    .pipe($.if(isProd, dest('./prod/js')))
    .pipe($.if(isStg || isProd, dest('./stg/js')))
    .pipe(dest('./dev/js'))
    .pipe(
      browserSync.reload({
        stream: true,
        once: true
      })
    );
}

// lintの起動
function lint() {
  return src('./src/assets/js/**/*.js')
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError())
}

// ブラウザシンクの起動
function bsProd() {
  browserSync.init({
    server: {
      baseDir: './prod/'
    },
    notify: true,
    xip: false
  });
  watch('./src/pug/**/*.pug', html);
  watch('./src/assets/styles/**/*', css);
  watch('./src/assets/js/**/*', js);
  watch('./src/assets/images/**/*', img);
  watch('./src/assets/images/favicon/*', favicon);
}
function bsStg() {
  browserSync.init({
    server: {
      baseDir: './stg/'
    },
    notify: true,
    xip: false
  });
  watch('./src/pug/**/*.pug', html);
  watch('./src/assets/styles/**/*', css);
  watch('./src/assets/js/**/*', js);
  watch('./src/assets/images/**/*', img);
  watch('./src/assets/images/favicon/*', favicon);
}
function bsDev() {
  browserSync.init({
    server: {
      baseDir: './dev/'
    },
    notify: true,
    xip: false
  });
  watch('./src/pug/**/*.pug', html);
  watch('./src/assets/styles/**/*', css);
  watch('./src/assets/js/**/*', js);
  watch('./src/assets/images/**/*', img);
  watch('./src/assets/images/favicon/*', favicon);
}

// コンパイル時のディレクトリ初期化
function cleanProd() {
  return del(['./prod', './stg', './dev']);
}
function cleanStg() {
  return del(['./stg', './dev']);
}
function cleanDev() {
  return del(['./dev']);
}

// buildとserveの定義
const build = parallel(html, css, img, favicon, series(lint, js));
const prod = series(cleanProd, build, bsProd);
const stg = series(cleanStg, build, bsStg);
const dev = series(cleanDev, build, bsDev);

// 各種タスクのコマンド化
exports.html = html;
exports.css = css;
exports.img = img;
exports.favicon = favicon;
exports.js = js;
exports.lint = lint;
exports.bsProd = bsProd;
exports.bsProd = bsStg;
exports.bsProd = bsDev;
exports.build = build;
exports.prod = prod;
exports.stg = stg;
exports.dev = dev;
