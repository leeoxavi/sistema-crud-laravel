{{-- resources/views/products/edit.blade.php --}}
@extends('layouts.app')

@section('content')
 
<div class="container mt-4">
    <h2>Editar Produto</h2>

    <form action="{{ route('products.update', $product->id) }}" method="post">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="name" class="form-label">Nome:</label>
            <input type="text" class="form-control" name="name" value="{{ $product->name }}" required>
        </div>

        <div class="mb-3">
            <label for="producer" class="form-label">Produtor:</label>
            <input type="text" class="form-control" name="producer" value="{{ $product->producer }}" required>
        </div>

        <div class="mb-3">
            <label for="code" class="form-label">Código:</label>
            <input type="text" class="form-control" name="code" value="{{ $product->code }}" required>
        </div>

        <div class="mb-3">
            <label for="production_date" class="form-label">Data de Produção:</label>
            <input type="date" class="form-control" name="production_date" value="{{ $product->production_date }}" required>
        </div>

        <div class="mb-3">
            <label for="quantity" class="form-label">Quantidade:</label>
            <input type="text" class="form-control" name="quantity" value="{{ $product->quantity }}" required>
        </div>

    
        <div class="d-flex">
            <button type="submit" class="btn btn-primary">Atualizar Produto</button>
            <a href="{{ route('products.index') }}" class="btn btn-secondary ms-auto">Voltar para a Lista</a>
        </div>  
    </form>
</div>

   
@endsection

