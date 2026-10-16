<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SchoolYear extends Model
{
    public $timestamps = false;

    protected $table = 'schoolyears';

    protected $primaryKey = 'syid';

    protected $fillable = ['schoolyear', 'semid'];

    /** @return BelongsTo<Semester, $this> */
    public function semester(): BelongsTo
    {
        return $this->belongsTo(Semester::class, 'semid', 'semid');
    }

    /** @return HasMany<Enrolled, $this> */
    public function enrolled(): HasMany
    {
        return $this->hasMany(Enrolled::class, 'syid', 'syid');
    }
}
