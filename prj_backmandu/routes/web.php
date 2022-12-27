<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api/v1')->group(function () {
    Route::prefix('division')->group(function () {
        Route::post('/crear', 'DivisionController@crear')->name('division-crear');
        Route::get('/consultar', 'DivisionController@consultar')->name('division-consultar');
        Route::post('/actualizar', 'DivisionController@actualizar')->name('division-actualizar');
        Route::delete('/eliminar/{id}', 'DivisionController@eliminar')->name('division-eliminar');
        Route::get('/listar', 'DivisionController@listar')->name('division-listar');
    });
    Route::prefix('subdivision')->group(function () {
        Route::post('/crear', 'SubDivisionController@crear')->name('subdivision-crear');
        Route::get('/listar/{divisionId}', 'SubDivisionController@listar')->name('subdivision-listar');
    });
});
