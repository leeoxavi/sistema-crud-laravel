<!-- resources/views/layouts/app.blade.php -->
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplicativo</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">

</head>
<body>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
        <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                <a href="{{ route('products.index') }}" class="btn btn-success me-2">Lista de Produtos</a>
            </li>
            <li class="nav-item">
                <a href="{{ route('products.create') }}" class="btn btn-success">Adicionar Produto</a>
            </li>
        </ul>
    </div>
</nav>
    <div class="container">
        @yield('content')
    </div>
</body>
</html>
