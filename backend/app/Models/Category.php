<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id', 'name', 'khmer_name', 'icon', 'description'
    ];

    protected $appends = ['khmerName'];
    protected $hidden = ['khmer_name', 'created_at', 'updated_at'];

    public function getKhmerNameAttribute()
    {
        return $this->attributes['khmer_name'] ?? $this->attributes['name'];
    }
}
