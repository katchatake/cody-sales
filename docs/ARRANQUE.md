Dentro de este proyecto de metas de ventas por promotor, se tiene la siguiente información:

Se tienen 3 entidades primordiales:

1. Promotores
2. ventas
3. metas

Los promotores tienen metas asignadas por mes, y las ventas se registran por promotor por día y por mes, pero tambien por tipo de producto. Ademas de tener un tipo de usuario ya que las metas u objetivos son asignados por un usuario de tipo "admin" o "supervisor" y los promotores son usuarios de tipo "promotor" que solo pueden ver sus propias metas y ventas, los usuarios de tipo "admin" o "supervisor" pueden ver las metas y ventas de todos los promotores.

Integrare un par de tablas mas, como usuarios, roles, productos y categorias de productos, esto para permitir al sistema tener un login para que cada usuario tenga sus propias metas y ventas, y que los usuarios de tipo "admin" o "supervisor" puedan ver las metas y ventas de todos los promotores.

Se elige el Stack de Nodejs con Express, Mysql y Nuxt 3, con TailwindCSS para el diseño de la interfaz de usuario. ya que es un stack de velocidad de desarrollo y tiene gran escalabilidad.


Decido dejar fuera de alcance usar tecnologias como redis, rabbitmq. ya que el objetivo es tener un proyecto sencillo a una escala pequeña.