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
                      
                        <!-- Adicione o botão de delete -->
                        <form action="{{ route('products.destroy', $product->id) }}" method="post" style="display:inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger ">Deletar</button>
                        </form>
                        
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <a href="{{ route('products.create') }}" class="btn btn-success">Adicionar Novo Produto</a>
@endsection
