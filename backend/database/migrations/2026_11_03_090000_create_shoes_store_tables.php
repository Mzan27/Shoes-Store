<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Categories
        Schema::create('categories', function (Blueprint $table) {
            $table->string('id', 50)->primary();
            $table->string('name', 100);
            $table->string('khmer_name', 150);
            $table->string('icon', 20)->default('👟');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // 2. Brands
        Schema::create('brands', function (Blueprint $table) {
            $table->string('id', 50)->primary();
            $table->string('name', 100);
            $table->string('logo', 100)->nullable();
            $table->timestamps();
        });

        // 3. Products
        Schema::create('products', function (Blueprint $table) {
            $table->string('id', 60)->primary();
            $table->string('name', 255);
            $table->string('khmer_name', 255);
            $table->string('brand', 100);
            $table->string('category', 50);
            $table->decimal('price', 10, 2)->default(0.00);
            $table->decimal('original_price', 10, 2)->nullable();
            $table->integer('discount_percent')->default(0);
            $table->decimal('rating', 3, 1)->default(5.0);
            $table->integer('review_count')->default(0);
            $table->integer('stock')->default(10);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_new_arrival')->default(false);
            $table->string('badge', 50)->nullable();
            $table->json('sizes')->nullable();
            $table->json('colors')->nullable();
            $table->string('material', 255)->nullable();
            $table->string('gender', 50)->default('Unisex');
            $table->text('description')->nullable();
            $table->json('images')->nullable();
            $table->timestamps();

            $table->index('category');
            $table->index('brand');
            $table->index('price');
        });

        // 4. Orders
        Schema::create('orders', function (Blueprint $table) {
            $table->string('id', 60)->primary();
            $table->string('customer_name', 150);
            $table->string('customer_phone', 50);
            $table->string('customer_email', 150)->nullable();
            $table->string('province', 100)->default('Phnom Penh');
            $table->string('district', 100)->nullable();
            $table->text('street_address');
            $table->text('delivery_notes')->nullable();
            $table->decimal('subtotal', 10, 2)->default(0.00);
            $table->decimal('discount_amount', 10, 2)->default(0.00);
            $table->string('coupon_code', 50)->nullable();
            $table->decimal('shipping_fee', 10, 2)->default(0.00);
            $table->decimal('total_amount', 10, 2)->default(0.00);
            $table->string('payment_method', 50)->default('KHQR');
            $table->string('payment_status', 50)->default('Pending');
            $table->string('order_status', 50)->default('Confirmed');
            $table->string('tracking_number', 100)->nullable();
            $table->boolean('telegram_notified')->default(true);
            $table->json('items');
            $table->json('timeline')->nullable();
            $table->timestamps();

            $table->index('order_status');
            $table->index('customer_phone');
        });

        // 5. Coupons
        Schema::create('coupons', function (Blueprint $table) {
            $table->string('code', 50)->primary();
            $table->string('discount_type', 50)->default('percentage');
            $table->decimal('discount_value', 10, 2)->default(10.00);
            $table->decimal('min_spend', 10, 2)->default(0.00);
            $table->text('description')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        // 6. Reviews
        Schema::create('reviews', function (Blueprint $table) {
            $table->string('id', 60)->primary();
            $table->string('product_id', 60);
            $table->string('customer_name', 150);
            $table->integer('rating')->default(5);
            $table->text('comment')->nullable();
            $table->string('status', 50)->default('Approved');
            $table->string('date', 50)->nullable();
            $table->timestamps();

            $table->index('product_id');
        });

        // 7. Settings
        Schema::create('settings', function (Blueprint $table) {
            $table->string('setting_key', 100)->primary();
            $table->text('setting_value');
            $table->timestamps();
        });

        // 8. Telegram Logs
        Schema::create('telegram_logs', function (Blueprint $table) {
            $table->string('id', 60)->primary();
            $table->string('order_id', 60)->nullable();
            $table->string('recipient', 150);
            $table->text('message');
            $table->string('status', 100)->default('Delivered');
            $table->timestamp('timestamp')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('telegram_logs');
        Schema::dropIfExists('settings');
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('coupons');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('products');
        Schema::dropIfExists('brands');
        Schema::dropIfExists('categories');
    }
};
