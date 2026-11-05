<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\Review;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        $products = Product::all();
        $reviews = Review::all();

        $totalSales = $orders->where('payment_status', 'Paid')->sum('total_amount');
        $pendingOrders = $orders->filter(function ($o) {
            return in_array($o->order_status, ['Pending', 'Processing']);
        })->count();
        $completedOrders = $orders->where('order_status', 'Delivered')->count();
        $lowStockProducts = $products->where('stock', '<', 15)->values();

        $categoryBreakdown = [];
        foreach ($products as $p) {
            $cat = $p->category ?? 'other';
            $categoryBreakdown[$cat] = ($categoryBreakdown[$cat] ?? 0) + 1;
        }

        return response()->json([
            'success' => true,
            'data' => [
                'metrics' => [
                    'totalSales' => round((float)$totalSales, 2),
                    'totalOrders' => $orders->count(),
                    'pendingOrders' => $pendingOrders,
                    'completedOrders' => $completedOrders,
                    'totalProducts' => $products->count(),
                    'lowStockCount' => $lowStockProducts->count(),
                    'totalReviews' => $reviews->count()
                ],
                'recentOrders' => Order::orderBy('created_at', 'desc')->take(5)->get(),
                'lowStockProducts' => $lowStockProducts->take(5),
                'categoryBreakdown' => $categoryBreakdown
            ]
        ]);
    }
}
