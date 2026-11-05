<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('setting_value', 'setting_key')->toArray();

        return response()->json([
            'success' => true,
            'data' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->all();
        foreach ($data as $key => $val) {
            Setting::updateOrCreate(
                ['setting_key' => $key],
                ['setting_value' => is_array($val) ? json_encode($val) : (string)$val]
            );
        }

        $settings = Setting::all()->pluck('setting_value', 'setting_key')->toArray();

        return response()->json([
            'success' => true,
            'data' => $settings
        ]);
    }
}
