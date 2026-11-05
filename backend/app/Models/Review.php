<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id', 'product_id', 'customer_name', 'rating', 'comment', 'status', 'date'
    ];

    protected $casts = [
        'rating' => 'integer'
    ];

    protected $appends = [
        'productId', 'customerName'
    ];

    protected $hidden = [
        'product_id', 'customer_name', 'created_at', 'updated_at'
    ];

    public function getProductIdAttribute()
    {
        return $this->attributes['product_id'] ?? '';
    }

    public function getCustomerNameAttribute()
    {
        return $this->attributes['customer_name'] ?? 'Anonymous';
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
