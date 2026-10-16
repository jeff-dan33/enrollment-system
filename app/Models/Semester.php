<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Semester extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'semid';

    protected $fillable = ['semester'];

    /** @return HasMany<SchoolYear, $this> */
    public function schoolYears(): HasMany
    {
        return $this->hasMany(SchoolYear::class, 'semid', 'semid');
    }
}
