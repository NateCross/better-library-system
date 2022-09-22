<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

use App\Models\book;
use App\Models\author;
use App\Models\publisher;
use App\Providers\RouteServiceProvider;

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
        string $year_published,
        string $volume,
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
        $book->authors;     // Appends an array of authors to the book
        $book->publisher;
        return $book;
    }

    private function getBookById($id): book {
        return book::findOrFail($id);
    }

    private function getByBookTitle(string $bookTitle): book {
        return book::firstWhere('title', $bookTitle);
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

    // public function update(Request $request, $id) {
    //     $input = $this->validateBookInput($request);

    //     $book = $this->getBookById($id);

    //     $author = $this->createOrFindAuthor($input['author']);
    //     $publisher = $this->createOrFindPublisher($input['publisher']);

    //     $book['title'] = $input['title'];
    //     $book['year_published'] = $input['year_published'];
    //     $book['volume'] = $input['volume'];

    //     $this->assignRelationsToBook($book, $publisher, $author);

    //     return response('Successfully edited.');
    // }

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
        // return 'Hello World!';
        return Inertia::render('Books/Index', [
            'books' => $this->getAllBooks(), // temp until pagination docs loads
        ]);
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // public function store(Request $request)
    // {
    //     //
    // }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function edit(Book $book)
    {
        //
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
        // $book->update($input);

        return redirect('/');
    }

    public function updateBook(Request $request, $id) {
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
        // $this->authorize('delete', $book);
        $book->authors()->detach();
        $book->delete();
        return redirect('/');
    }
}
