<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\Concerns\InteractsWithDatabase;
use Illuminate\Foundation\Testing\Concerns\InteractsWithSession;
use Tests\TestCase;
use App\Models\Product;

class ProductControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function test_can_create_product()
    {
        $productData = [
            'name' => 'Test Product',
            'producer' => 'Test Producer',
            'code' => 'TEST123',
            'production_date' => 20231214,
            'quantity' => 10,
        ];

        $response = $this->post(route('products.store'), $productData);

        $response->assertStatus(302); 
        $this->assertDatabaseHas('products', $productData);
    }

    public function test_can_update_product()
    {
        $product = Product::factory()->create();

        $updatedData = [
            'name' => 'Updated Product',
            'producer' => 'Updated Producer',
            'code' => 'UPDATED123',
            'production_date' => 20231215,
            'quantity' => 20,
        ];

        $response = $this->put(route('products.update', $product->id), $updatedData);

        $response->assertStatus(302); 
        $this->assertDatabaseHas('products', $updatedData);
    }

    public function test_can_delete_product()
    {
        $product = Product::factory()->create();

        $response = $this->delete(route('products.destroy', $product->id));

        $response->assertStatus(302); 
        $this->assertDatabaseMissing('products', ['id' => $product->id]); 
    }
}