<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $primaryKey = 'setting_key';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'setting_key', 'setting_value'
    ];

    protected $hidden = ['created_at', 'updated_at'];
}
