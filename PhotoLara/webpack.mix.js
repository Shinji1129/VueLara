const mix = require('laravel-mix');

mix.browserSynic('PhotoLara.test')
mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .version();
