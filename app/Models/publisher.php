<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\book;

class publisher extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function books() {
        $this->hasMany(book::class);
    }
}
