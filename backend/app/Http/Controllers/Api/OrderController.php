<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\Setting;
use App\Models\TelegramLog;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    private function dispatchTelegramNotification(Order $order, $eventType = 'NEW_ORDER')
    {
        $contactEmail = Setting::where('setting_key', 'contactEmail')->value('setting_value') ?? 'chhoyyeanseou5@gmail.com';
        
        $itemsText = '';
        if (is_array($order->items)) {
            $itemsText = implode(', ', array_map(function ($i) {
                return ($i['name'] ?? 'Item') . ' (Size ' . ($i['size'] ?? '40') . ') x' . ($i['quantity'] ?? 1);
            }, $order->items));
        }

        $messageText = '';
        if ($eventType === 'NEW_ORDER') {
            $messageText = "🔔 [ការបញ្ជាទិញថ្មី - StepUp Shoes]\n" .
                "📦 លេខកូដ: #{$order->id}\n" .
                "👤 អតិថិជន: {$order->customer_name} ({$order->customer_phone})\n" .
                "📍 ទីតាំង: {$order->district}, {$order->province}\n" .
                "👟 ទំនិញ: {$itemsText}\n" .
                "💰 សរុប: $" . number_format($order->total_amount, 2) . " [{$order->payment_method}]\n" .
                "⏰ កាលបរិច្ឆេទ: " . date('Y-m-d H:i:s');
        } elseif ($eventType === 'STATUS_UPDATE') {
            $messageText = "🚚 [បច្ចុប្បន្នភាពដឹកជញ្ជូន - StepUp Shoes]\n" .
                "📦 លេខកូដ: #{$order->id}\n" .
                "🔄 ស្ថានភាពថ្មី: {$order->order_status}\n" .
                "👤 អតិថិជន: {$order->customer_name} ({$order->customer_phone})";
        }

        $logId = 'tg-' . round(microtime(true) * 1000);
        return TelegramLog::create([
            'id' => $logId,
            'order_id' => $order->id,
            'recipient' => $contactEmail,
            'message' => $messageText,
            'status' => 'Delivered (Simulated Live Dispatch)',
            'timestamp' => now()
        ]);
    }

    public function index(Request $request)
    {
        $query = Order::query()->orderBy('created_at', 'desc');

        if ($request->filled('status') && $request->status !== 'all') {
            $query->whereRaw('LOWER(order_status) = ?', [strtolower($request->status)]);
        }

        if ($request->filled('search')) {
            $s = strtolower($request->search);
            $query->where(function ($q) use ($s) {
                $q->whereRaw('LOWER(id) LIKE ?', ["%{$s}%"])
                  ->orWhereRaw('LOWER(customer_name) LIKE ?', ["%{$s}%"])
                  ->orWhere('customer_phone', 'LIKE', "%{$s}%");
            });
        }

        $orders = $query->get();

        return response()->json([
            'success' => true,
            'count' => $orders->count(),
            'data' => $orders
        ]);
    }

    public function track($query)
    {
        $q = trim(strtolower($query));
        $cleanQ = str_replace('#', '', $q);

        $order = Order::where(function ($queryBuilder) use ($q, $cleanQ) {
            $queryBuilder->whereRaw('LOWER(id) = ?', [$q])
                         ->orWhereRaw("REPLACE(LOWER(id), '#', '') = ?", [$cleanQ])
                         ->orWhereRaw("REPLACE(customer_phone, ' ', '') = ?", [str_replace(' ', '', $q)]);
        })->first();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'រកមិនឃើញការបញ្ជាទិញនេះទេ (Order not found)'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $order
        ]);
    }

    public function show($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $order
        ]);
    }

    public function store(Request $request)
    {
        $orderId = 'STEP-' . date('Y') . '-' . rand(1000, 9999);
        $items = $request->input('items', []);

        $paymentMethod = $request->input('paymentMethod', 'KHQR');
        $paymentStatus = $paymentMethod === 'KHQR' ? 'Paid' : 'Pending';

        $timeline = [
            [
                'time' => now()->toISOString(),
                'status' => 'Order Placed',
                'note' => "អតិថិជនបានបញ្ជាទិញដោយជោគជ័យតាម {$paymentMethod}"
            ],
            [
                'time' => now()->toISOString(),
                'status' => 'Confirmed',
                'note' => 'ប្រព័ន្ធបានបញ្ជាក់ការបញ្ជាទិញ និងជូនដំណឹងទៅម្ចាស់ហាងតាម Telegram'
            ]
        ];

        $order = Order::create([
            'id' => $orderId,
            'customer_name' => $request->input('customerName'),
            'customer_phone' => $request->input('customerPhone'),
            'customer_email' => $request->input('customerEmail', 'customer@example.com'),
            'province' => $request->input('province', 'Phnom Penh'),
            'district' => $request->input('district', ''),
            'street_address' => $request->input('streetAddress', ''),
            'delivery_notes' => $request->input('deliveryNotes', ''),
            'items' => $items,
            'subtotal' => (float)$request->input('subtotal', 0),
            'discount_amount' => (float)$request->input('discountAmount', 0),
            'coupon_code' => $request->input('couponCode'),
            'shipping_fee' => (float)$request->input('shippingFee', 0),
            'total_amount' => (float)$request->input('totalAmount', 0),
            'payment_method' => $paymentMethod,
            'payment_status' => $paymentStatus,
            'order_status' => 'Confirmed',
            'tracking_number' => 'DELIV-' . rand(10000, 99990),
            'telegram_notified' => true,
            'timeline' => $timeline,
        ]);

        // Reduce stock
        if (is_array($items)) {
            foreach ($items as $item) {
                if (isset($item['productId'])) {
                    $prod = Product::find($item['productId']);
                    if ($prod && $prod->stock >= ($item['quantity'] ?? 1)) {
                        $prod->decrement('stock', $item['quantity'] ?? 1);
                    }
                }
            }
        }

        // Send Telegram log
        $this->dispatchTelegramNotification($order, 'NEW_ORDER');

        return response()->json([
            'success' => true,
            'data' => $order->fresh()
        ], 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], 404);
        }

        $status = $request->input('status');
        $note = $request->input('note');
        $paymentStatus = $request->input('paymentStatus');

        if ($status) $order->order_status = $status;
        if ($paymentStatus) $order->payment_status = $paymentStatus;

        $timeline = $order->timeline ?? [];
        $timeline[] = [
            'time' => now()->toISOString(),
            'status' => $status ?? $order->order_status,
            'note' => $note ?? "ស្ថានភាពត្រូវបានផ្លាស់ប្តូរទៅជា {$status}"
        ];
        $order->timeline = $timeline;
        $order->save();

        $this->dispatchTelegramNotification($order, 'STATUS_UPDATE');

        return response()->json([
            'success' => true,
            'data' => $order->fresh()
        ]);
    }
}
