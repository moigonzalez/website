const del = require('del');
const glob = require('glob');
const gulp = require('gulp');
const hash = require('hash-files');
const jsesc = require('jsesc');
const postcss = require('gulp-postcss');
const posthtml = require('gulp-posthtml');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sync = require('browser-sync').create();
const uglify = require('gulp-uglify');

const stringify = value => {
  return jsesc(value, {
    wrap: true,
    compact: false,
    indentLevel: 3,
  });
};

const shortHash = files => {
  return hash.sync({
    files: files
  }).slice(0, 8);
};

const assets = [
  'app/**',
  '!app/index.html',
  '!app/styles{,/**}',
  '!app/screen.css',
  '!app/script.js',
];

gulp.task('html', () => {
  return gulp.src('app/index.html')
    .pipe(posthtml([
      require('posthtml-collect-styles')(),
      require('posthtml-minifier')({
        removeComments: true,
        collapseWhitespace: true
      }),
      require('posthtml-postcss')([
        require('autoprefixer')(),
        require('postcss-csso')()
      ]),
    ]))
    .pipe(gulp.dest('docs'))
    .pipe(sync.stream());
});

gulp.task('styles', () => {
  return gulp.src('app/screen.css')
    .pipe(postcss([
      require('postcss-import')(),
      require('postcss-url')(),
      require('autoprefixer')(),
      require('postcss-csso')()
    ]))
    .pipe(gulp.dest('docs'))
    .pipe(sync.stream());
});

gulp.task('scripts', () => {
  return gulp.src('app/script.js')
    .pipe(uglify())
    .pipe(gulp.dest('docs'))
    .pipe(sync.stream());
});

gulp.task('copy', () => {
  return gulp.src(assets)
    .pipe(gulp.dest('docs'))
    .pipe(sync.stream({
      once: true
    }));
});

gulp.task('clean', () => {
  return del('docs/**/*');
});

gulp.task('cache', ['copy'], () => {

  const assets = [
    'docs/favicon.ico',
    'docs/screen.css',
    'docs/script.js',
    ...glob.sync('docs/fonts/*'),
    ...glob.sync('docs/images/*'),
    ...glob.sync('docs/apps/*'),
  ];
  const assetsHash = shortHash(assets);
  const assetCacheList = [
    '/',
    ...assets
    // Remove all `images/icon-*` files except for the one used in
    // the HTML.
    .filter(path => !path.includes('images/icon-') || path.includes('icon-228x228.png'))
    .map(path => path
      .replace(/^docs\//, '/')),
  ];

  gulp.src('docs/service-worker.js')
    .pipe(replace(
      '%HASH%',
      stringify(assetsHash)
    ))
    .pipe(replace(
      '%CACHE_LIST%',
      stringify(assetCacheList)
    ))
    .pipe(rename(path => {
      path.basename = assetsHash;
    }))
    .pipe(gulp.dest('docs/'));

  gulp.src('docs/index.html')
    .pipe(replace(
      /(<\/body>)/g,
      `<script>
				if ('serviceWorker' in navigator) {
					navigator.serviceWorker.register('${ assetsHash }.js');
				}
			</script>$1`
    ))
    .pipe(gulp.dest('docs/'));

  return del([
    'docs/service-worker.js',
  ]);
});

gulp.task('server', () => {
  sync.init({
    notify: false,
    server: {
      baseDir: 'docs'
    }
  });
});

gulp.task('watch', () => {
  gulp.watch('app/index.html', ['html']);
  gulp.watch('app/styles/*.css', ['styles']);
  gulp.watch('app/script.js', ['scripts']);
  gulp.watch(assets, ['copy']);
});

gulp.task('pack', [
  'html',
  'styles',
  'scripts',
]);


gulp.task('build', [
  'clean',
  'pack',
  'copy',
  'cache',
]);

gulp.task('default', [
  'pack',
  'copy',
  'server',
  'watch',
]);
