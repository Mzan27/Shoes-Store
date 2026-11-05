<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DatabaseStatusController extends Controller
{
    public function status()
    {
        $connection = config('database.default');
        $connected = false;
        $error = null;

        try {
            DB::connection()->getPdo();
            $connected = true;
        } catch (\Exception $e) {
            $error = $e->getMessage();
        }

        return response()->json([
            'success' => true,
            'data' => [
                'driver' => $connection,
                'connected' => $connected,
                'host' => config("database.connections.{$connection}.host", 'localhost'),
                'port' => config("database.connections.{$connection}.port", 3306),
                'database' => config("database.connections.{$connection}.database"),
                'user' => config("database.connections.{$connection}.username", 'root'),
                'lastError' => $error,
                'tablesInitialized' => true
            ]
        ]);
    }

    public function testConnect(Request $request)
    {
        $host = $request->input('host', 'localhost');
        $port = $request->input('port', 3306);
        $user = $request->input('user', 'root');
        $password = $request->input('password', '');
        $database = $request->input('database', 'shoes_store_db');

        try {
            $dsn = "mysql:host={$host};port={$port};dbname={$database}";
            new \PDO($dsn, $user, $password, [\PDO::ATTR_TIMEOUT => 2]);
            return response()->json([
                'success' => true,
                'message' => "Successfully connected to MySQL ({$host}:{$port}/{$database})"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
