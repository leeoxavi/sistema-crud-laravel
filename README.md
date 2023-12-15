   # Sistema de Gerenciamento de Produtos

Este é um aplicativo Laravel para gerenciar um catálogo de produtos em um estoque.

## Instalação

**Repositório:**
(https://github.com/leeoxavi/sistema-crud-laravel)


1. **Modelo de Dados**:

1 - Instalar Dependências do Composer:
composer create-project --prefer-dist laravel/laravel CRUD

2 - Criação do Modelo e Migração:
php artisan make:model Product -m

3 - definir os campos necessários para o produto em: database>migrations>products




2. **Migrations**:

1 - conectar com o banco de dados :
Abra o arquivo .env e configure as informações do banco de dados.


2 - Executar as Migrações do Banco de Dados:
php artisan migrate

3 - verificar as rotas do banco :
php artisan route:list




3. **Seeders**:

1 - crie o Seeder e adicione os dados fictícios : database>seeders>ProductsTableSeeder
php artisan make:seeder ProductsTableSeeder

2 - executar o seeder:
php artisan db:seed --class=ProductsTableSeeder




5. **Controllers**: 

1 - criar o arquivo ProductController e defina as rotas:
php artisan make:controller ProductController

2 - Para verificar as rotas definidas:
php artisan route:list




6. **Views**: 

1 - crie a pasta "products" e "layouts" em resources>views:
em products crie os arquivos das views:
-index.blade.php
-create.blade.php
-edit.blade.php
-show.blade.php/

2 - em layouts crie o arquivo:
-app.blade.php

3 - defina a estrutura para todas as páginas.




7. **Validação**: 

1 - valide os dados usando:

required (obrigatório), 
string (deve ser uma string),  
unique:products (deve ser único na tabela products).
Para o método update, usamos unique:products,code,' . $id 




8. **Testes**: 

1 - crie testes usando o comando :
php artisan make:test ProductControllerTest

2 - defina a estrutura no arquivo tests/Feature/ProductControllerTest.php :

3 - faça o teste usando o comando :
php artisan test


O aplicativo estará disponível em http://localhost:8000.

Uso
Acesse o aplicativo no navegador.
Gerencie produtos através da interface do usuário.

