1. **Modelo de Dados**:

/*instalado em seu ambiente de desenvolvimento 
usando o Composer com o seguinte comando:*/
composer create-project --prefer-dist laravel/laravel CRUD


/*Criação do Modelo e Migração:*/
php artisan make:model Product -m


/*Abra o arquivo products de migração gerado em database/migrations
e defina os campos necessários para o produto. */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('producer');
            $table->string('code')->unique();
            $table->date('production_date');
            $table->integer('quantity');
            $table->timestamps(); // Cria automaticamente colunas created_at e updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}



2. **Migrations**:

/* conectando banco de dados*/
na raiz .env 
em DB_DATABASE coloque o nome do banco.


/*Execute a migração para criar a tabela no banco de dados:*/
php artisan migrate


ver as rotas que estão no banco

php artisan route:list






3. **Seeders**:

//Abra o terminal e execute o seguinte comando

php artisan make:seeder ProductsTableSeeder

//Este comando criará um arquivo chamado ProductsTableSeeder em database/seeders.

/*
2. Editar o Seeder
Abra o arquivo ProductsTableSeeder.php recém-criado em database/seeders 
e edite o método run() para adicionar os dados fictícios. Por exemplo:
*/

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
        // Exemplo de dados fictícios
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
            // Adicione mais dados conforme necessário
        ];

        // Inserir os dados fictícios na tabela products
        foreach ($products as $productData) {
            Product::create($productData);
        }
    }
}


3. Executar o Seeder
//No terminal, execute o seguinte comando para executar o seeder e preencher a tabela products:

php artisan db:seed --class=ProductsTableSeeder

/*
Isso irá inserir os dados fictícios na tabela products. 
Certifique-se de que a tabela products já foi criada através de uma migração antes de executar o seeder.

Os seeders são úteis para popular seu banco de dados com dados iniciais, 
facilitando o desenvolvimento e teste do seu aplicativo.*/




5. **Controllers**: 
/*
crie o arquivo ProductController  que ficara em  "app>http>controller"
*/
//Abra o arquivo routes/web.php no diretório do seu projeto Laravel.

//Adicione o seguinte código para definir rotas resourceful para o seu controlador ProductController:

use App\Http\Controllers\ProductController;

Route::resource('products', ProductController::class);

/*Este código criará automaticamente todas as rotas necessárias para as operações CRUD 
(index, create, store, show, edit, update, destroy) para o seu controlador ProductController.*/


//Para verificar as rotas definidas

php artisan route:list


//uma lógica básica em cada um dos métodos em productController.php

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return view('products.index', compact('products'));
    }

    public function create()
    {
        return view('products.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'producer' => 'required',
            'code' => 'required|unique:products',
            'production_date' => 'required|date',
            'quantity' => 'required|integer',
        ]);

        $product = Product::create($request->all());

        return redirect()->route('products.index')->with('success', 'Product created successfully');
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return view('products.show', compact('product'));
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return view('products.edit', compact('product'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'producer' => 'required',
            'code' => 'required|unique:products,code,' . $id,
            'production_date' => 'required|integer',
            'quantity' => 'required|integer',
        ]);

        $product = Product::findOrFail($id);
        $product->update($request->all());

        return redirect()->route('products.index')->with('success', 'Product updated successfully');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully');
    }
}






6. **Views**: 

//crie uma pasta "products" e "layouts" em resources>views

/*em products crie os arquivos das views
-index.blade.php
-create.blade.php
-edit.blade.php
-show.blade.php/

em layouts crie o arquivo
-app.blade.php
*/


exemplo básico do layout

/* base (layouts/app.blade.php) que você pode usar como ponto de partida. 
Este layout define a estrutura comum para todas as páginas do seu aplicativo:

<!-- resources/views/layouts/app.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seu Aplicativo</title>
    <!-- Adicione seus estilos, scripts, ou links CDN aqui -->
</head>
<body>

    <nav>
        <!-- Adicione a barra de navegação com links para diferentes partes do seu aplicativo -->
        <ul>
            <li><a href="{{ route('products.index') }}">Lista de Produtos</a></li>
            <li><a href="{{ route('products.create') }}">Adicionar Produto</a></li>
        </ul>
    </nav>

    <div class="container">
        <!-- Adicione o conteúdo específico de cada página aqui -->
        @yield('content')
    </div>

    <!-- Adicione seus scripts JavaScript ou links CDN para scripts aqui -->

</body>
</html>

Este layout base inclui uma barra de navegação simples e uma seção principal onde 
o conteúdo específico de cada página será inserido usando a diretiva @yield('content').
*/

exemplos dos products 


resources/views/products/index.blade.php
/*
{{-- resources/views/products/index.blade.php --}}
@extends('layouts.app')

@section('content')
    <h2>Lista de Produtos</h2>

    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Produtor</th>
                <th>Código</th>
                <th>Data de Produção</th>
                <th>Quantidade</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($products as $product)
                <tr>
                    <td>{{ $product->id }}</td>
                    <td>{{ $product->name }}</td>
                    <td>{{ $product->producer }}</td>
                    <td>{{ $product->code }}</td>
                    <td>{{ $product->production_date }}</td>
                    <td>{{ $product->quantity }}</td>
                    <td>
                        <a href="{{ route('products.show', $product->id) }}" class="btn btn-info">Detalhes</a>
                        <a href="{{ route('products.edit', $product->id) }}" class="btn btn-warning">Editar</a>

                        <form action="{{ route('products.destroy', $product->id) }}" method="post" style="display:inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger">Deletar</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <a href="{{ route('products.create') }}" class="btn btn-success">Adicionar Novo Produto</a>
@endsection

*/

resources/views/products/create.blade.php

/*
{{-- resources/views/products/create.blade.php --}}
@extends('layouts.app')

@section('content')
    <h2>Adicionar Novo Produto</h2>

    <form action="{{ route('products.store') }}" method="post">
        @csrf
        <label for="name">Nome:</label>
        <input type="text" name="name" required>

        <label for="producer">Produtor:</label>
        <input type="text" name="producer" required>

        <label for="code">Código:</label>
        <input type="text" name="code" required>

        <label for="production_date">Data de Produção:</label>
        <input type="text" name="production_date" required>

        <label for="quantity">Quantidade:</label>
        <input type="text" name="quantity" required>

        <button type="submit">Adicionar Produto</button>
    </form>
    <a href="{{ route('products.index') }}" class="btn btn-secondary">Voltar para a Lista</a>
@endsection
*/

resources/views/products/edit.blade.php

/*
{{-- resources/views/products/edit.blade.php --}}
@extends('layouts.app')

@section('content')
    <h2>Editar Produto</h2>

    <form action="{{ route('products.update', $product->id) }}" method="post">
        @csrf
        @method('PUT')

        <label for="name">Nome:</label>
        <input type="text" name="name" value="{{ $product->name }}" required>

        <label for="producer">Produtor:</label>
        <input type="text" name="producer" value="{{ $product->producer }}" required>

        <label for="code">Código:</label>
        <input type="text" name="code" value="{{ $product->code }}" required>

        <label for="production_date">Data de Produção:</label>
        <input type="text" name="production_date" value="{{ $product->production_date }}" required>

        <label for="quantity">Quantidade:</label>
        <input type="text" name="quantity" value="{{ $product->quantity }}" required>

        <button type="submit">Atualizar Produto</button>
    </form>
    <a href="{{ route('products.index') }}" class="btn btn-secondary">Voltar para a Lista</a>
@endsection

*/

resources/views/products/show.blade.php

/*
{{-- resources/views/products/show.blade.php --}}
@extends('layouts.app')

@section('content')
    <h2>Detalhes do Produto</h2>

    <p><strong>Nome:</strong> {{ $product->name }}</p>
    <p><strong>Produtor:</strong> {{ $product->producer }}</p>
    <p><strong>Código:</strong> {{ $product->code }}</p>
    <p><strong>Data de Produção:</strong> {{ $product->production_date }}</p>
    <p><strong>Quantidade:</strong> {{ $product->quantity }}</p>

    <a href="{{ route('products.index') }}" class="btn btn-secondary">Voltar para a Lista</a>
@endsection

*/



7. **Validação**: 

/*validate é um método fornecido pelo Laravel para validar dados. Ele recebe um array associativo onde 
as chaves são os nomes dos campos a serem validados e os valores são as regras de validação.
No exemplo, as regras incluem :

required (obrigatório), 

string (deve ser uma string), 
 
unique:products (deve ser único na tabela products).

Para o método update, usamos unique:products,code,' . $id 
para garantir que o código seja único, excluindo o registro atual da validação 
(o que é necessário ao atualizar um registro existente).*/


exempos :
class ProductController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'producer' => 'required|string',
            'code' => 'required|string|unique:products',
            'production_date' => 'required|integer',
            'quantity' => 'required|integer',
        ]);

        $product = Product::create($request->all());

        return redirect()->route('products.index')->with('success', 'Product created successfully');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'producer' => 'required|string',
            'code' => 'required|string|unique:products,code,' . $id,
            'production_date' => 'required|integer',
            'quantity' => 'required|integer',
        ]);

        $product = Product::findOrFail($id);
        $product->update($request->all());

        return redirect()->route('products.index')->with('success', 'Product updated successfully');
    }
}



/*adicionando o botão de deletar :*/

em index.blade.php

<!-- Adicione o botão de delete -->

<form action="{{ route('products.destroy', $product->id) }}" method="post" style="display:inline">
    @csrf
    @method('DELETE')
    <button type="submit" class="btn btn-danger">Deletar</button>
</form>





8. **Testes**: 

Você pode criar testes usando o comando :

php artisan make:test ProductControllerTest


no arquivo tests/Feature/ProductControllerTest.php :
/*
// tests/Feature/ProductControllerTest.php
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

        $response->assertStatus(302); // Verifica se a resposta é um redirecionamento (código 302)
        $this->assertDatabaseHas('products', $productData); // Verifica se os dados foram adicionados ao banco de dados
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

        $response->assertStatus(302); // Verifica se a resposta é um redirecionamento (código 302)
        $this->assertDatabaseHas('products', $updatedData); // Verifica se os dados foram atualizados no banco de dados
    }

    public function test_can_delete_product()
    {
        $product = Product::factory()->create();

        $response = $this->delete(route('products.destroy', $product->id));

        $response->assertStatus(302); // Verifica se a resposta é um redirecionamento (código 302)
        $this->assertDatabaseMissing('products', ['id' => $product->id]); // Verifica se o produto foi removido do banco de dados
    }
}
*/

faça o teste usando o comando :

php artisan test

/*erros encontrados 

não contem a rota de exclusão e update em web.php:*/

Route::put('/products/{id}', [ProductController::class, 'update'])->name('products.update');

Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('products.destroy');

mas não foi resolvido!

//em  database>migration>create_products_table.php

//a coluna "production_date"  estava em definida em integer:
$table->integer('production_date');

//e foi trocada para: 
$table->date('production_date');

o problema foi resolvido!

continuando 

//em ProductControllerTest.php
mudei 
'production_date' => 20231215,
para
'production_date' => '1976-06-15',(voltou a dar erro)



//em app>http>controller>ProductController.php
mudei 
'production_date' => 'required|integer',
para
'production_date' => 'required|date',



adicione o bootstrap :
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
                    