<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $primaryKey = 'code';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'code', 'discount_type', 'discount_value', 'min_spend', 'description', 'active'
    ];

    protected $casts = [
        'discount_value' => 'float',
        'min_spend' => 'float',
        'active' => 'boolean'
    ];

    protected $appends = [
        'discountType', 'discountValue', 'minSpend'
    ];

    protected $hidden = [
        'discount_type', 'discount_value', 'min_spend', 'created_at', 'updated_at'
    ];

    public function getDiscountTypeAttribute()
    {
        return $this->attributes['discount_type'] ?? 'percentage';
    }

    public function getDiscountValueAttribute()
    {
        return (float)($this->attributes['discount_value'] ?? 0);
    }

    public function getMinSpendAttribute()
    {
        return (float)($this->attributes['min_spend'] ?? 0);
    }
}
