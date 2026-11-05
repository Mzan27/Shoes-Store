<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function verifyKHQR(Request $request)
    {
        $amount = $request->input('amount');
        $currency = $request->input('currency', 'USD');
        $orderId = $request->input('orderId');

        return response()->json([
            'success' => true,
            'transactionId' => 'TXN-BAKONG-' . rand(10000000, 99999999),
            'status' => 'SUCCESS',
            'paidAmount' => $amount,
            'currency' => $currency,
            'merchantName' => 'SHOES STORE STEPUP',
            'timestamp' => now()->toISOString()
        ]);
    }
}
