<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\AdminDashboardController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\TelegramController;
use App\Http\Controllers\Api\DatabaseStatusController;

// ---------------- PRODUCTS ----------------
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// ---------------- CATEGORIES & BRANDS ----------------
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/brands', [BrandController::class, 'index']);

// ---------------- ORDERS ----------------
Route::get('/orders', [OrderController::class, 'index']);
Route::get('/orders/track/{query}', [OrderController::class, 'track']);
Route::get('/orders/{id}', [OrderController::class, 'show']);
Route::post('/orders', [OrderController::class, 'store']);
Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);

// ---------------- COUPONS ----------------
Route::get('/coupons', [CouponController::class, 'index']);
Route::post('/coupons/validate', [CouponController::class, 'validateCoupon']);
Route::post('/coupons', [CouponController::class, 'store']);

// ---------------- REVIEWS ----------------
Route::get('/reviews', [ReviewController::class, 'index']);
Route::post('/reviews', [ReviewController::class, 'store']);
Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);

// ---------------- KHQR & PAYMENTS ----------------
Route::post('/payments/verify-khqr', [PaymentController::class, 'verifyKHQR']);

// ---------------- ADMIN DASHBOARD ----------------
Route::get('/admin/dashboard', [AdminDashboardController::class, 'index']);

// ---------------- SETTINGS & TELEGRAM ----------------
Route::get('/settings', [SettingController::class, 'index']);
Route::put('/settings', [SettingController::class, 'update']);
Route::get('/telegram/logs', [TelegramController::class, 'logs']);
Route::post('/telegram/test', [TelegramController::class, 'test']);

// ---------------- DATABASE MANAGEMENT ----------------
Route::get('/database/status', [DatabaseStatusController::class, 'status']);
Route::post('/database/test-connect', [DatabaseStatusController::class, 'testConnect']);
