<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Coupon::all()
        ]);
    }

    public function validateCoupon(Request $request)
    {
        $code = $request->input('code');
        $subtotal = (float)$request->input('subtotal', 0);

        if (!$code) {
            return response()->json([
                'success' => false,
                'message' => 'សូមបញ្ចូលកូដបញ្ចុះតម្លៃ'
            ], 400);
        }

        $coupon = Coupon::whereRaw('UPPER(code) = ?', [strtoupper(trim($code))])
            ->where('active', true)
            ->first();

        if (!$coupon) {
            return response()->json([
                'success' => false,
                'message' => 'កូដបញ្ចុះតម្លៃមិនត្រឹមត្រូវ ឬផុតកំណត់'
            ], 404);
        }

        if ($coupon->min_spend && $subtotal < $coupon->min_spend) {
            return response()->json([
                'success' => false,
                'message' => "កូដនេះអាចប្រើបានសម្រាប់ទំនិញចាប់ពី \${$coupon->min_spend} ឡើងទៅ"
            ], 400);
        }

        $discount = 0;
        if ($coupon->discount_type === 'percentage') {
            $discount = ($subtotal * $coupon->discount_value) / 100;
        } elseif ($coupon->discount_type === 'fixed') {
            $discount = min($subtotal, $coupon->discount_value);
        } elseif ($coupon->discount_type === 'shipping') {
            $discount = 2.00; // Free shipping standard
        }

        return response()->json([
            'success' => true,
            'data' => [
                'code' => $coupon->code,
                'discount' => round($discount, 2),
                'description' => $coupon->description,
                'type' => $coupon->discount_type
            ]
        ]);
    }

    public function store(Request $request)
    {
        $coupon = Coupon::create([
            'code' => strtoupper($request->input('code')),
            'discount_type' => $request->input('discountType', 'percentage'),
            'discount_value' => (float)$request->input('discountValue', 10),
            'min_spend' => (float)$request->input('minSpend', 0),
            'description' => $request->input('description', ''),
            'active' => $request->input('active', true) !== false,
        ]);

        return response()->json([
            'success' => true,
            'data' => $coupon
        ], 201);
    }
}
