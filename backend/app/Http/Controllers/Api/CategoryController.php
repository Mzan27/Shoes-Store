<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Category::all()
        ]);
    }

    public function store(Request $request)
    {
        $id = Str::slug($request->input('name'));
        $cat = Category::create([
            'id' => $id,
            'name' => $request->input('name'),
            'khmer_name' => $request->input('khmerName', $request->input('name')),
            'icon' => $request->input('icon', '👟'),
            'description' => $request->input('description', '')
        ]);

        return response()->json([
            'success' => true,
            'data' => $cat
        ], 201);
    }
}
