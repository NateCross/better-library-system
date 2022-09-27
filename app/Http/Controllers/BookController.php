<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

use App\Models\book;
use App\Models\author;
use App\Models\publisher;

class BookController extends Controller
{

    private function validateBookInput(Request $request): array {
        return $request->validate([
            'title' => ['required'],
            'author' => ['required', 'max:255'],
            'publisher' => ['required'],
            'year_published' => ['nullable'],
            'volume' => ['nullable'],
        ]);
    }

    private function createOrFindAuthor(string $name): object {
        return author::firstOrCreate([
            'name' => $name,
        ]);
    }

    private function createOrFindPublisher(string $name): object {
        return publisher::firstOrCreate([
            'name' => $name,
        ]);
    }

    private function createBook(
        string $title,
        string | null $year_published,
        string | null $volume,
    ): object {
        return book::create([
            'title' => $title,
            'year_published' => $year_published,
            'volume' => $volume,
        ]);
    }

    private function assignRelationsToBook(
        $book,
        publisher $publisher,
        author $author,
    ): void {
        $book->publisher()->associate($publisher);

        // Detaching all then attaching to prevent adding in extra
        // pivot tables when updating
        $book->authors()->detach();
        $book->authors()->attach($author);

        $book->push();
    }

    public function store(Request $request) {
        $input = $this->validateBookInput($request);
        $author = $this->createOrFindAuthor($input['author']);
        $publisher = $this->createOrFindPublisher($input['publisher']);

        $book = $this->createBook(
            $input['title'],
            $input['year_published'],
            $input['volume'],
        );

        $this->assignRelationsToBook($book, $publisher, $author);

        return redirect('/');
    }

    public function get($id) {
        $book = $this->getBookById($id);
        $book->authors;     // Appends an array of authors to the book
                            // You can get with 'authors[0].name'
        return response($book);
    }

    private function getBook($id) {
        $book = $this->getBookById($id);
        $book->authors;
        $book->publisher;
        return $book;
    }

    private function getBookById($id): book {
        return book::findOrFail($id);
    }

    public function getAllBooks() {
        $books = book::all();
        foreach ($books as $book) {
            $book->authors;
            $book->publisher;
        }
        return $books;
    }

    public function all() {
        $books = $this->getAllBooks();
        return response($books);
    }

    public function delete($id) {
        $book = book::find($id);

        // Must detach first or it will run into foreign key problems
        $book->authors()->detach($id);

        book::destroy($id);

        return response('Successfully deleted book.');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Books/Index');
    }

    public function welcome()
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'books' => $this->getAllBooks(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Book $book)
    {
        $input = $this->validateBookInput($request);

        $author = $this->createOrFindAuthor($input['author']);
        $publisher = $this->createOrFindPublisher($input['publisher']);

        $book['title'] = $input['title'];
        $book['year_published'] = $input['year_published'];
        $book['volume'] = $input['volume'];

        $this->assignRelationsToBook($book, $publisher, $author);

        return redirect('/');
    }

    public function edit(Request $request, $id) {
        return Inertia::render('Books/Update', [
            'book' => $this->getBook($id),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function destroy(Book $book)
    {
        $book->authors()->detach();
        $book->delete();
        return redirect('/');
    }

    public function borrowReturn(Book $book) {
        $book['is_borrowed'] = !$book['is_borrowed'];
        $book->push();
    }

    public function view(Book $book) {
        return Inertia::render('Books/View', [
            'book' => $book,
            'authors' => $book->authors,
            'publisher' => $book->publisher,
        ]);
    }
}
