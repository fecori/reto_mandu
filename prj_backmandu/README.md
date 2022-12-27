## Reto Servicio Backgend Mandü

Para iniciar el proyecto, instalacion e inicio en modo desarrollo
- Debe configurar las variables dentro de .env (usar de ejemplo .env.example)

```bash
composer install
php artisan migrate
php artisan db:seed --class=DivisionesSeeder
php artisan db:seed --class=SubDivisionSeeder
php artisan serv --port 8001
```
