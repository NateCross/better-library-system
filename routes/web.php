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

Route::controller(BookController::class)->group(function() {
    Route::get('/', 'welcome');
    Route::get('/update/{id}', 'edit')
        ->middleware(['auth']);
    Route::patch('/borrow/{book}', 'borrowReturn')
        ->middleware(['auth'])
        ->name('books.borrow');
});

Route::resource('books', BookController::class)
    ->only(['index', 'store', 'update', 'destroy', 'borrowReturn'])
    ->middleware(['auth']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';
