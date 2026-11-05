<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->filled('category') && $request->category !== 'all' && $request->category !== 'sale') {
            $query->whereRaw('LOWER(category) = ?', [strtolower($request->category)]);
        } elseif ($request->category === 'sale') {
            $query->where(function ($q) {
                $q->where('discount_percent', '>', 0)
                  ->orWhereRaw('original_price > price');
            });
        }

        if ($request->filled('brand') && $request->brand !== 'all') {
            $query->whereRaw('LOWER(brand) = ?', [strtolower($request->brand)]);
        }

        if ($request->filled('featured') && $request->featured === 'true') {
            $query->where('is_featured', true);
        }

        if ($request->filled('newArrival') && $request->newArrival === 'true') {
            $query->where('is_new_arrival', true);
        }

        if ($request->filled('search')) {
            $s = strtolower($request->search);
            $query->where(function ($q) use ($s) {
                $q->whereRaw('LOWER(name) LIKE ?', ["%{$s}%"])
                  ->orWhereRaw('LOWER(khmer_name) LIKE ?', ["%{$s}%"])
                  ->orWhereRaw('LOWER(brand) LIKE ?', ["%{$s}%"])
                  ->orWhereRaw('LOWER(category) LIKE ?', ["%{$s}%"]);
            });
        }

        // Sorting
        $sort = $request->query('sort');
        if ($sort === 'price-low') {
            $query->orderBy('price', 'asc');
        } elseif ($sort === 'price-high') {
            $query->orderBy('price', 'desc');
        } elseif ($sort === 'rating') {
            $query->orderBy('rating', 'desc');
        } elseif ($sort === 'discount') {
            $query->orderBy('discount_percent', 'desc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $products = $query->get();

        // Size filtering in memory for JSON array compatibility
        if ($request->filled('size')) {
            $targetSize = (int)$request->size;
            $products = $products->filter(function ($p) use ($targetSize) {
                return is_array($p->sizes) && in_array($targetSize, $p->sizes);
            })->values();
        }

        return response()->json([
            'success' => true,
            'count' => $products->count(),
            'data' => $products
        ]);
    }

    public function show($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $related = Product::where('category', $product->category)
            ->where('id', '!=', $product->id)
            ->take(4)
            ->get();

        $reviews = $product->reviews()->get();

        $data = $product->toArray();
        $data['related'] = $related;
        $data['reviews'] = $reviews;

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function store(Request $request)
    {
        $id = 'prod-' . round(microtime(true) * 1000);
        $sizes = $request->input('sizes', [39, 40, 41, 42, 43]);
        $colors = $request->input('colors', ['Black', 'White']);
        $images = $request->input('images', ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80']);

        $product = Product::create([
            'id' => $id,
            'name' => $request->input('name'),
            'khmer_name' => $request->input('khmerName', $request->input('name')),
            'brand' => $request->input('brand', 'StepUp Signature'),
            'category' => $request->input('category', 'sneakers'),
            'price' => (float)$request->input('price', 0),
            'original_price' => (float)$request->input('originalPrice', $request->input('price', 0)),
            'discount_percent' => (int)$request->input('discountPercent', 0),
            'rating' => 5.0,
            'review_count' => 0,
            'stock' => (int)$request->input('stock', 10),
            'is_featured' => (bool)$request->input('isFeatured', false),
            'is_new_arrival' => (bool)$request->input('isNewArrival', false),
            'badge' => $request->input('badge', 'New'),
            'sizes' => array_map('intval', (array)$sizes),
            'colors' => (array)$colors,
            'material' => $request->input('material', 'Standard Footwear Material'),
            'gender' => $request->input('gender', 'Unisex'),
            'description' => $request->input('description', ''),
            'images' => (array)$images,
        ]);

        return response()->json([
            'success' => true,
            'data' => $product
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $fields = [];
        if ($request->has('name')) $fields['name'] = $request->name;
        if ($request->has('khmerName')) $fields['khmer_name'] = $request->khmerName;
        if ($request->has('brand')) $fields['brand'] = $request->brand;
        if ($request->has('category')) $fields['category'] = $request->category;
        if ($request->has('price')) $fields['price'] = (float)$request->price;
        if ($request->has('originalPrice')) $fields['original_price'] = (float)$request->originalPrice;
        if ($request->has('discountPercent')) $fields['discount_percent'] = (int)$request->discountPercent;
        if ($request->has('stock')) $fields['stock'] = (int)$request->stock;
        if ($request->has('isFeatured')) $fields['is_featured'] = (bool)$request->isFeatured;
        if ($request->has('isNewArrival')) $fields['is_new_arrival'] = (bool)$request->isNewArrival;
        if ($request->has('badge')) $fields['badge'] = $request->badge;
        if ($request->has('material')) $fields['material'] = $request->material;
        if ($request->has('gender')) $fields['gender'] = $request->gender;
        if ($request->has('description')) $fields['description'] = $request->description;
        if ($request->has('sizes')) $fields['sizes'] = array_map('intval', (array)$request->sizes);
        if ($request->has('colors')) $fields['colors'] = (array)$request->colors;
        if ($request->has('images')) $fields['images'] = (array)$request->images;

        $product->update($fields);

        return response()->json([
            'success' => true,
            'data' => $product->fresh()
        ]);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ]);
    }
}
