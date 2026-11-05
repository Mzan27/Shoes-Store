<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Review::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $id = 'rev-' . round(microtime(true) * 1000);
        $review = Review::create([
            'id' => $id,
            'product_id' => $request->input('productId'),
            'customer_name' => $request->input('customerName', 'Anonymous Shoe Lover'),
            'rating' => (int)$request->input('rating', 5),
            'date' => date('Y-m-d'),
            'comment' => $request->input('comment', ''),
            'status' => 'Approved'
        ]);

        // Update product average rating and review count
        $prod = Product::find($request->input('productId'));
        if ($prod) {
            $avg = Review::where('product_id', $prod->id)->avg('rating') ?: 5.0;
            $count = Review::where('product_id', $prod->id)->count();
            $prod->rating = round($avg, 1);
            $prod->review_count = $count;
            $prod->save();
        }

        return response()->json([
            'success' => true,
            'data' => $review
        ], 201);
    }

    public function destroy($id)
    {
        $review = Review::find($id);
        if ($review) {
            $review->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Review deleted'
        ]);
    }
}
