<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'specialty',
        'mobile_number',
        'office_number',
        'address_1',
        'address_2',
        'address_3',
        'address_4',
        'address_5',
        'description',
        'rating',

    ];
}
