<?php

Route::get('/photos/{photo}/download', 'PhotoController@download');
Route::get('/{any?}', function () {
    return view('index');
})->where('any', '.+');
