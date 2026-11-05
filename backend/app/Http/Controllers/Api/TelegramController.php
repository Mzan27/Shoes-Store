<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\TelegramLog;

class TelegramController extends Controller
{
    public function logs()
    {
        return response()->json([
            'success' => true,
            'data' => TelegramLog::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function test()
    {
        $contactEmail = Setting::where('setting_key', 'contactEmail')->value('setting_value') ?? 'chhoyyeanseou5@gmail.com';
        $logId = 'tg-' . round(microtime(true) * 1000);

        $log = TelegramLog::create([
            'id' => $logId,
            'order_id' => 'TEST-' . substr((string)round(microtime(true) * 1000), -4),
            'recipient' => $contactEmail,
            'message' => "🔔 [TEST DISPATCH - StepUp Shoes]\nAdmin triggered simulated live alert to Telegram logger.\nBot Status: Connected\nTime: " . date('Y-m-d H:i:s'),
            'status' => 'Delivered (Simulated Live Dispatch)',
            'timestamp' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Test notification sent to Telegram logger',
            'log' => $log
        ]);
    }
}
