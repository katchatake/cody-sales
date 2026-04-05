# Arranque del Proyecto

Dentro de este proyecto de metas de ventas por promotor, se tiene la siguiente información:

Se tienen 3 entidades primordiales:

1. Promotores
2. Ventas
3. Metas

Los promotores tienen metas asignadas por mes, y las ventas se registran por promotor por día y por mes, además de contemplar el tipo de producto. También existe un tipo de usuario, ya que las metas u objetivos son asignados por un usuario de tipo `admin` o `supervisor`, mientras que los usuarios de tipo `promotor` solo pueden ver sus propias metas y ventas. Los usuarios de tipo `admin` o `supervisor` pueden ver las metas y ventas de todos los promotores.

Además del núcleo inicial, el sistema incorpora tablas y conceptos adicionales como:

- usuarios,
- roles,
- productos,
- categorías de productos.

Esto permite tener un login por usuario y controlar la visibilidad de la información según el rol dentro del sistema.

## Tecnologías utilizadas

Para este proyecto se eligió un stack orientado a simplicidad, velocidad de desarrollo y mantenimiento:

- **Node.js**
  Para ejecutar la capa backend del sistema.

- **Express**
  Para construir la API REST y organizar rutas, controladores y middlewares de forma simple.

- **TypeScript**
  Para mejorar la mantenibilidad del backend mediante tipado estático y una estructura más clara del código.

- **MySQL**
  Como base de datos relacional para almacenar usuarios, ventas, metas, productos y categorías.

- **Prisma ORM**
  Para modelar la base de datos, ejecutar el seed inicial y trabajar con acceso tipado a datos.

- **Nuxt**
  Como framework frontend para construir la interfaz del sistema.

- **Vue**
  Como base del frontend y de los componentes visuales.

- **Vuetify**
  Como librería principal de interfaz de usuario para acelerar la construcción de pantallas, formularios, tablas y layouts consistentes.

- **JWT**
  Para autenticar usuarios y controlar acceso por rol en la aplicación.

## Tecnologías no utilizadas

Con el objetivo de mantener el proyecto sencillo y adecuado para una escala pequeña, se decidió no incorporar por ahora tecnologías adicionales de infraestructura o complejidad operativa.

Entre las tecnologías que deliberadamente no se usaron en esta etapa están:

- **Redis**
  No se considera necesario todavía porque el sistema no requiere cache distribuido ni manejo avanzado de sesiones.

- **RabbitMQ**
  No se usa porque el flujo actual no necesita colas, procesamiento asíncrono complejo ni integración por mensajería.

## Enfoque del proyecto

La intención es mantener una solución clara y funcional para una operación comercial pequeña o mediana, priorizando:

- simplicidad,
- claridad funcional,
- separación por roles,
- facilidad de despliegue,
- facilidad de mantenimiento.