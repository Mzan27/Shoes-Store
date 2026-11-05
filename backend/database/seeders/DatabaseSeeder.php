<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Coupon;
use App\Models\Product;
use App\Models\Setting;
use App\Models\Review;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Categories
        $categories = [
            ['id' => 'sneakers', 'name' => 'Sneakers', 'khmer_name' => 'ស្បែកជើងកីឡា/Sneakers', 'icon' => '👟', 'description' => 'កីឡា ដើរកម្សាន្ត និងម៉ូដទាន់សម័យ'],
            ['id' => 'formal', 'name' => 'Formal', 'khmer_name' => 'ស្បែកជើងធ្វើការ/Formal', 'icon' => '👞', 'description' => 'ស្បែកជើងការិយាល័យ ភាពថ្លៃថ្នូរ និងភាពទាក់ទាញ'],
            ['id' => 'casual', 'name' => 'Casual', 'khmer_name' => 'ស្បែកជើងស៊ក/Casual', 'icon' => '🥾', 'description' => 'ប្រើប្រាស់ប្រចាំថ្ងៃ ងាយស្រួលពាក់ និងស្រួលជើង'],
            ['id' => 'sandals', 'name' => 'Sandals', 'khmer_name' => 'ស្បែកជើងផ្ទាត់/Sandals', 'icon' => '🩴', 'description' => 'ផាសុកភាព ម៉ូដទាន់សម័យ និងធន់នឹងទឹក'],
            ['id' => 'sale', 'name' => 'Sale & Promotion', 'khmer_name' => 'ទំនិញបញ្ចុះតម្លៃពិសេស', 'icon' => '🔥', 'description' => 'ការបញ្ចុះតម្លៃរហូតដល់ 40%']
        ];
        foreach ($categories as $cat) {
            Category::updateOrCreate(['id' => $cat['id']], $cat);
        }

        // 2. Brands
        $brands = [
            ['id' => 'nike', 'name' => 'Nike', 'logo' => 'Nike'],
            ['id' => 'adidas', 'name' => 'Adidas', 'logo' => 'Adidas'],
            ['id' => 'puma', 'name' => 'Puma', 'logo' => 'Puma'],
            ['id' => 'new-balance', 'name' => 'New Balance', 'logo' => 'NB'],
            ['id' => 'stepup', 'name' => 'StepUp Signature', 'logo' => 'StepUp'],
            ['id' => 'converse', 'name' => 'Converse', 'logo' => 'Converse']
        ];
        foreach ($brands as $brand) {
            Brand::updateOrCreate(['id' => $brand['id']], $brand);
        }

        // 3. Coupons
        $coupons = [
            ['code' => 'STEPUP10', 'discount_type' => 'percentage', 'discount_value' => 10.00, 'min_spend' => 30.00, 'description' => 'បញ្ចុះតម្លៃ 10% លើការទិញចាប់ពី $30 ឡើងទៅ', 'active' => true],
            ['code' => 'WELCOME20', 'discount_type' => 'fixed', 'discount_value' => 20.00, 'min_spend' => 80.00, 'description' => 'បញ្ចុះតម្លៃ $20 លើការទិញចាប់ពី $80 ឡើងទៅ', 'active' => true],
            ['code' => 'FREESHIP', 'discount_type' => 'shipping', 'discount_value' => 100.00, 'min_spend' => 25.00, 'description' => 'ដឹកជញ្ជូនឥតគិតថ្លៃទូទាំងប្រទេសកម្ពុជា', 'active' => true]
        ];
        foreach ($coupons as $c) {
            Coupon::updateOrCreate(['code' => $c['code']], $c);
        }

        // 4. Products
        $products = [
            [
                'id' => 'prod-1',
                'name' => 'Nike Air VaporMax Flyknit Pulse',
                'khmer_name' => 'ស្បែកជើងរត់ Nike Air VaporMax',
                'brand' => 'Nike',
                'category' => 'sneakers',
                'price' => 135.00,
                'original_price' => 160.00,
                'discount_percent' => 15,
                'rating' => 4.9,
                'review_count' => 38,
                'stock' => 24,
                'is_featured' => true,
                'is_new_arrival' => true,
                'badge' => 'Bestseller',
                'sizes' => [39, 40, 41, 42, 43, 44],
                'colors' => ['Black & Cyan', 'Triple White', 'Phantom Grey'],
                'material' => 'Breathable Flyknit Mesh & Air Sole',
                'gender' => 'Unisex',
                'description' => 'ស្បែកជើងកីឡា Nike Air VaporMax ផ្តល់នូវកម្រិតផាសុកភាពខ្ពស់ និងបច្ចេកវិទ្យាខ្យល់ Cushion សម្រាលសម្ពាធជើងពេលរត់ ឬដើរផ្លូវឆ្ងាយ។',
                'images' => [
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'id' => 'prod-2',
                'name' => 'Adidas UltraBoost Light Performance',
                'khmer_name' => 'ស្បែកជើងហាត់ប្រាណ Adidas UltraBoost',
                'brand' => 'Adidas',
                'category' => 'sneakers',
                'price' => 125.00,
                'original_price' => 150.00,
                'discount_percent' => 16,
                'rating' => 4.8,
                'review_count' => 42,
                'stock' => 18,
                'is_featured' => true,
                'is_new_arrival' => false,
                'badge' => 'Popular',
                'sizes' => [39, 40, 41, 42, 43, 44, 45],
                'colors' => ['Core Black', 'Solar Red', 'Cloud White'],
                'material' => 'Primeknit Textile with Continental Rubber Sole',
                'gender' => 'Men',
                'description' => 'Adidas UltraBoost Light ជាមួយបច្ចេកវិទ្យា Boost Energy Return ស្រាលជាងមុន ៣០%។',
                'images' => [
                    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'id' => 'prod-3',
                'name' => 'Executive Classic Oxford Leather',
                'khmer_name' => 'ស្បែកជើងធ្វើការស្បែកសុទ្ធ Oxford Classic',
                'brand' => 'StepUp Signature',
                'category' => 'formal',
                'price' => 85.00,
                'original_price' => 110.00,
                'discount_percent' => 22,
                'rating' => 5.0,
                'review_count' => 19,
                'stock' => 12,
                'is_featured' => true,
                'is_new_arrival' => true,
                'badge' => 'Premium Leather',
                'sizes' => [39, 40, 41, 42, 43],
                'colors' => ['Deep Espresso Brown', 'Obsidian Black', 'Cognac Tan'],
                'material' => '100% Genuine Italian Calf Leather',
                'gender' => 'Men',
                'description' => 'ស្បែកជើងស្បែកសុទ្ធម៉ូដ Oxford ស័ក្តិសមឥតខ្ចោះសម្រាប់បុគ្គលិកការិយាល័យ អ្នកដឹកនាំ និងពិធីមង្គលផ្សេងៗ។',
                'images' => [
                    'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'id' => 'prod-4',
                'name' => 'Derby Brogue Officer Shoes',
                'khmer_name' => 'ស្បែកជើងការិយាល័យ Derby Brogue',
                'brand' => 'StepUp Signature',
                'category' => 'formal',
                'price' => 75.00,
                'original_price' => 90.00,
                'discount_percent' => 16,
                'rating' => 4.7,
                'review_count' => 15,
                'stock' => 16,
                'is_featured' => false,
                'is_new_arrival' => false,
                'badge' => 'Formal',
                'sizes' => [40, 41, 42, 43, 44],
                'colors' => ['Rich Brown', 'Polished Black'],
                'material' => 'Hand-burnished Full Grain Leather',
                'gender' => 'Men',
                'description' => 'ម៉ូដ Derby Brogue ជាមួយក្បាច់ឆ្លាក់ក្បាលស្បែកជើងបែបអភិជន។',
                'images' => [
                    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'id' => 'prod-5',
                'name' => 'Urban Slip-On Breathable Loafer',
                'khmer_name' => 'ស្បែកជើងស៊កប្រចាំថ្ងៃ Urban Loafer',
                'brand' => 'Puma',
                'category' => 'casual',
                'price' => 48.00,
                'original_price' => 65.00,
                'discount_percent' => 26,
                'rating' => 4.6,
                'review_count' => 29,
                'stock' => 35,
                'is_featured' => true,
                'is_new_arrival' => true,
                'badge' => 'Daily Choice',
                'sizes' => [38, 39, 40, 41, 42, 43, 44],
                'colors' => ['Charcoal Grey', 'Navy Blue', 'Beige Sand'],
                'material' => 'Lightweight Suede & Memory Foam Insole',
                'gender' => 'Unisex',
                'description' => 'ស្បែកជើងស៊កងាយស្រួលពាក់ និងដោះ មិនពិបាកចងខ្សែ។',
                'images' => [
                    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'id' => 'prod-6',
                'name' => 'Retro Canvas Skate Casual High',
                'khmer_name' => 'ស្បែកជើងសំពត់ Canvas Retro',
                'brand' => 'Converse',
                'category' => 'casual',
                'price' => 55.00,
                'original_price' => 60.00,
                'discount_percent' => 8,
                'rating' => 4.8,
                'review_count' => 54,
                'stock' => 40,
                'is_featured' => false,
                'is_new_arrival' => false,
                'badge' => 'Classic',
                'sizes' => [37, 38, 39, 40, 41, 42, 43],
                'colors' => ['Classic Black/White', 'Vintage Parchment', 'Burgundy Red'],
                'material' => 'Heavy-duty Organic Canvas & Vulcanized Rubber',
                'gender' => 'Unisex',
                'description' => 'ម៉ូដពេញនិយមគ្រប់ជំនាន់របស់ Converse។',
                'images' => [
                    'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'id' => 'prod-7',
                'name' => 'StepUp CloudWalk Dual Strap Sandals',
                'khmer_name' => 'ស្បែកជើងផ្ទាត់/កៀប CloudWalk ផាសុកភាព',
                'brand' => 'StepUp Signature',
                'category' => 'sandals',
                'price' => 29.00,
                'original_price' => 38.00,
                'discount_percent' => 23,
                'rating' => 4.9,
                'review_count' => 31,
                'stock' => 50,
                'is_featured' => true,
                'is_new_arrival' => true,
                'badge' => 'Best Comfort',
                'sizes' => [38, 39, 40, 41, 42, 43, 44],
                'colors' => ['Midnight Black', 'Olive Army', 'Sand Khaki'],
                'material' => 'Ergonomic EVA Waterproof Cushion',
                'gender' => 'Unisex',
                'description' => 'ស្បែកជើងផ្ទាត់បច្ចេកវិទ្យា EVA ទន់ស្រាលដូចដើរលើពពក មិនជ្រាបទឹក មិនរអិល។',
                'images' => [
                    'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80'
                ]
            ],
            [
                'id' => 'prod-8',
                'name' => 'New Balance 574 Heritage Runner',
                'khmer_name' => 'ស្បែកជើង New Balance 574 បុរាណកាល',
                'brand' => 'New Balance',
                'category' => 'sneakers',
                'price' => 95.00,
                'original_price' => 120.00,
                'discount_percent' => 20,
                'rating' => 4.9,
                'review_count' => 67,
                'stock' => 14,
                'is_featured' => true,
                'is_new_arrival' => false,
                'badge' => 'Hot Sale',
                'sizes' => [39, 40, 41, 42, 43, 44],
                'colors' => ['Classic Grey', 'Navy Blue', 'Forest Green'],
                'material' => 'Suede and Mesh Upper with ENCAP Midsole',
                'gender' => 'Unisex',
                'description' => 'ម៉ូដដ៏ល្បីល្បាញបំផុតរបស់ New Balance 574 ដែលផ្តល់នូវរូបរាងទាន់សម័យ។',
                'images' => [
                    'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80'
                ]
            ]
        ];
        foreach ($products as $p) {
            Product::updateOrCreate(['id' => $p['id']], $p);
        }

        // 5. Settings
        $defaultSettings = [
            'storeName' => 'StepUp Shoes Store (Cambodia)',
            'storePhone' => '+855 12 899 900',
            'contactEmail' => 'chhoyyeanseou5@gmail.com',
            'telegramBotToken' => '8192837492:AAH9f28_kldExampleLiveToken',
            'telegramChatId' => '-10088992211',
            'currency' => 'USD ($)',
            'address' => 'Russian Federation Blvd (110), Phnom Penh, Cambodia'
        ];
        foreach ($defaultSettings as $key => $val) {
            Setting::updateOrCreate(['setting_key' => $key], ['setting_value' => $val]);
        }

        // 6. Sample Reviews
        $reviews = [
            [
                'id' => 'rev-1',
                'product_id' => 'prod-1',
                'customer_name' => 'Sophea Pich',
                'rating' => 5,
                'comment' => 'ស្បែកជើងស្អាតខ្លាំង ពាក់ស្រួល និងទម្ងន់ស្រាល! ការដឹកជញ្ជូនលឿនណាស់!',
                'status' => 'Approved',
                'date' => '2026-10-24'
            ],
            [
                'id' => 'rev-2',
                'product_id' => 'prod-3',
                'customer_name' => 'Chan Dara',
                'rating' => 5,
                'comment' => 'ស្បែកសុទ្ធពិតប្រាកដ មានភាពប្រណិត ស័ក្តិសមជាមួយឈុតអាវធំ!',
                'status' => 'Approved',
                'date' => '2026-10-25'
            ]
        ];
        foreach ($reviews as $rev) {
            Review::updateOrCreate(['id' => $rev['id']], $rev);
        }
    }
}
