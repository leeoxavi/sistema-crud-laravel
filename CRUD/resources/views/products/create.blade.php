{{-- resources/views/products/create.blade.php --}}
@extends('layouts.app')

@section('content')


<div class="container mt-4">
    <h2>Adicionar Novo Produto</h2>

    <form action="{{ route('products.store') }}" method="post">
        @csrf
        <div class="mb-3">
            <label for="name" class="form-label">Nome:</label>
            <input type="text" class="form-control" name="name" required>
        </div>

        <div class="mb-3">
            <label for="producer" class="form-label">Produtor:</label>
            <input type="text" class="form-control" name="producer" required>
        </div>

        <div class="mb-3">
            <label for="code" class="form-label">Código:</label>
            <input type="text" class="form-control" name="code" required>
        </div>

        <div class="mb-3">
            <label for="production_date" class="form-label">Data de Produção:</label>
            <input type="text" class="form-control" name="production_date" required>
        </div>

        <div class="mb-3">
            <label for="quantity" class="form-label">Quantidade:</label>
            <input type="text" class="form-control" name="quantity" required>
        </div>

        <button type="submit" class="btn btn-primary">Adicionar Produto</button>
    <a href="{{ route('products.index') }}" class="btn btn-secondary ms-auto">Voltar para a Lista</a>
    </form>
</div>

@endsection
