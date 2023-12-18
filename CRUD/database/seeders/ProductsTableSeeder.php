<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = [
            [
                'name' => 'Produto 1',
                'producer' => 'Fabricante 1',
                'code' => 'ABC123',
                'production_date' => 20220101,
                'quantity' => 100,
            ],
            [
                'name' => 'Produto 2',
                'producer' => 'Fabricante 2',
                'code' => 'XYZ789',
                'production_date' => 20220115,
                'quantity' => 75,
            ],

        ];

        foreach ($products as $productData) {
            Product::create($productData);
        }
    }
}

