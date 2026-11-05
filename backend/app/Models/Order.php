<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id', 'customer_name', 'customer_phone', 'customer_email',
        'province', 'district', 'street_address', 'delivery_notes',
        'subtotal', 'discount_amount', 'coupon_code', 'shipping_fee',
        'total_amount', 'payment_method', 'payment_status', 'order_status',
        'tracking_number', 'telegram_notified', 'items', 'timeline'
    ];

    protected $casts = [
        'subtotal' => 'float',
        'discount_amount' => 'float',
        'shipping_fee' => 'float',
        'total_amount' => 'float',
        'telegram_notified' => 'boolean',
        'items' => 'array',
        'timeline' => 'array',
    ];

    protected $appends = [
        'customerName', 'customerPhone', 'customerEmail', 'shippingAddress',
        'discountAmount', 'couponCode', 'shippingFee', 'totalAmount',
        'paymentMethod', 'paymentStatus', 'orderStatus', 'trackingNumber',
        'telegramNotified', 'createdAt'
    ];

    protected $hidden = [
        'customer_name', 'customer_phone', 'customer_email', 'province',
        'district', 'street_address', 'delivery_notes', 'discount_amount',
        'coupon_code', 'shipping_fee', 'total_amount', 'payment_method',
        'payment_status', 'order_status', 'tracking_number', 'telegram_notified',
        'updated_at'
    ];

    public function getCustomerNameAttribute()
    {
        return $this->attributes['customer_name'] ?? '';
    }

    public function getCustomerPhoneAttribute()
    {
        return $this->attributes['customer_phone'] ?? '';
    }

    public function getCustomerEmailAttribute()
    {
        return $this->attributes['customer_email'] ?? '';
    }

    public function getShippingAddressAttribute()
    {
        return [
            'province' => $this->attributes['province'] ?? 'Phnom Penh',
            'district' => $this->attributes['district'] ?? '',
            'streetAddress' => $this->attributes['street_address'] ?? '',
            'deliveryNotes' => $this->attributes['delivery_notes'] ?? ''
        ];
    }

    public function getDiscountAmountAttribute()
    {
        return (float)($this->attributes['discount_amount'] ?? 0);
    }

    public function getCouponCodeAttribute()
    {
        return $this->attributes['coupon_code'] ?? null;
    }

    public function getShippingFeeAttribute()
    {
        return (float)($this->attributes['shipping_fee'] ?? 0);
    }

    public function getTotalAmountAttribute()
    {
        return (float)($this->attributes['total_amount'] ?? 0);
    }

    public function getPaymentMethodAttribute()
    {
        return $this->attributes['payment_method'] ?? 'KHQR';
    }

    public function getPaymentStatusAttribute()
    {
        return $this->attributes['payment_status'] ?? 'Pending';
    }

    public function getOrderStatusAttribute()
    {
        return $this->attributes['order_status'] ?? 'Confirmed';
    }

    public function getTrackingNumberAttribute()
    {
        return $this->attributes['tracking_number'] ?? '';
    }

    public function getTelegramNotifiedAttribute()
    {
        return (bool)($this->attributes['telegram_notified'] ?? true);
    }

    public function getCreatedAtAttribute($value)
    {
        return $value ? (new \DateTime($value))->format(\DateTime::ISO8601) : null;
    }
}
