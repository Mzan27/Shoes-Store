<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id', 'name', 'khmer_name', 'brand', 'category', 'price',
        'original_price', 'discount_percent', 'rating', 'review_count',
        'stock', 'is_featured', 'is_new_arrival', 'badge', 'sizes',
        'colors', 'material', 'gender', 'description', 'images'
    ];

    protected $casts = [
        'price' => 'float',
        'original_price' => 'float',
        'discount_percent' => 'integer',
        'rating' => 'float',
        'review_count' => 'integer',
        'stock' => 'integer',
        'is_featured' => 'boolean',
        'is_new_arrival' => 'boolean',
        'sizes' => 'array',
        'colors' => 'array',
        'images' => 'array',
    ];

    protected $appends = [
        'khmerName', 'originalPrice', 'discountPercent', 'reviewCount',
        'isFeatured', 'isNewArrival'
    ];

    protected $hidden = [
        'khmer_name', 'original_price', 'discount_percent', 'review_count',
        'is_featured', 'is_new_arrival', 'created_at', 'updated_at'
    ];

    public function getKhmerNameAttribute()
    {
        return $this->attributes['khmer_name'] ?? $this->attributes['name'];
    }

    public function getOriginalPriceAttribute()
    {
        return isset($this->attributes['original_price']) ? (float)$this->attributes['original_price'] : (float)$this->attributes['price'];
    }

    public function getDiscountPercentAttribute()
    {
        return (int)($this->attributes['discount_percent'] ?? 0);
    }

    public function getReviewCountAttribute()
    {
        return (int)($this->attributes['review_count'] ?? 0);
    }

    public function getIsFeaturedAttribute()
    {
        return (bool)($this->attributes['is_featured'] ?? false);
    }

    public function getIsNewArrivalAttribute()
    {
        return (bool)($this->attributes['is_new_arrival'] ?? false);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'product_id', 'id')->where('status', 'Approved');
    }
}
