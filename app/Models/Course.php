<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'courseid';

    protected $fillable = ['coursename'];

    /** @return HasMany<Enrolled, $this> */
    public function enrolled(): HasMany
    {
        return $this->hasMany(Enrolled::class, 'courseid', 'courseid');
    }
}
