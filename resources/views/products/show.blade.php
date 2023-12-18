{{-- resources/views/products/show.blade.php --}}
@extends('layouts.app')

@section('content')
<div class="container mt-4">
    <h2>Detalhes do Produto</h2>

    <div class="card">
        <div class="card-body">
            <p class="card-text"><strong>Nome:</strong> {{ $product->name }}</p>
            <p class="card-text"><strong>Produtor:</strong> {{ $product->producer }}</p>
            <p class="card-text"><strong>Código:</strong> {{ $product->code }}</p>
            <p class="card-text"><strong>Data de Produção:</strong> {{ $product->production_date }}</p>
            <p class="card-text"><strong>Quantidade:</strong> {{ $product->quantity }}</p>
        </div>
    </div>

    <a href="{{ route('products.index') }}" class="btn btn-secondary mt-3">Voltar para a Lista</a>
</div>

@endsection
