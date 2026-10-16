<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'studid';

    protected $fillable = ['lname', 'fname', 'mname', 'sex', 'bdate', 'address'];

    /** @return HasMany<Enrolled, $this> */
    public function enrolled(): HasMany
    {
        return $this->hasMany(Enrolled::class, 'studid', 'studid');
    }
}
