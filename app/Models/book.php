<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\author;
use App\Models\publisher;

class book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'year_published',
        'volume',
    ];

    public function authors() {
        return $this->belongsToMany(author::class)->withTimestamps();
    }

    public function publisher() {
        return $this->belongsTo(publisher::class);
    }
}
