<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TelegramLog extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id', 'order_id', 'recipient', 'message', 'status', 'timestamp'
    ];

    protected $appends = [
        'orderId'
    ];

    protected $hidden = [
        'order_id', 'created_at', 'updated_at'
    ];

    public function getOrderIdAttribute()
    {
        return $this->attributes['order_id'] ?? null;
    }
}
