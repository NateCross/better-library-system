<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

use App\Http\Controllers\BookController;
use App\Models\book;

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
    $controller = new BookController;
    return $controller->welcome();
});

Route::get('/update/{id}', function (Request $request, $id) {
    $controller = new BookController;
    return $controller->edit($request, $id);
})->middleware(['auth']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::resource('books', BookController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth']);

require __DIR__.'/auth.php';
