<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

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

        return redirect(route('books.index'));
    }

    public function get($id) {
        $book = $this->getBookById($id);
        $book->authors;     // Appends an array of authors to the book
                            // You can get with 'authors[0].name'
        return response($book);
    }

    private function getBookById($id): book {
        return book::findOrFail($id);
    }

    private function getByBookTitle(string $bookTitle): book {
        return book::firstWhere('title', $bookTitle);
    }

    private function getAllBooks() {
        $books = book::all();
        foreach ($books as $book) {
            $book->authors;
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function destroy(Book $book)
    {
        //
    }
}
