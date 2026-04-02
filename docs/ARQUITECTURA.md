# Arquitectura del Backend

Este documento detalla las decisiones arquitectónicas y tecnológicas detrás del backend de **Cody Sales**. La finalidad de este archivo es servir como punto de consulta para comprender cómo está estructurado el proyecto a nivel conceptual y el porqué de cada herramienta utilizada.

## 🏗 Tipo de Estructura: Arquitectura Hexagonal (Ports and Adapters)

El proyecto está diseñado bajo los principios de la **Arquitectura Hexagonal**, dividiendo cada módulo funcional de la aplicación (como `auth`, `sales`, `catalog`, etc.) en capas estrictamente delimitadas por responsabilidades.

Se elije esta estructura por las siguientes razones de peso:
1. **Desacoplamiento Tecnológico**: Aislar la lógica central del negocio (`Domain`) de las tecnologías externas (Base de datos, Frameworks HTTP).
2. **Escalabilidad y Mantenimiento**: Si el día de mañana se requiere cambiar Express por Fastify, o Prisma por otro ORM, la lógica core (Use Cases) no se verá afectada.
3. **Testeabilidad**: Al estar la lógica de negocio aislada e implementar "inversión de dependencias" a través de interfaces (`Repositories`), es extremadamente fácil inyectar mocks/stubs para crear pruebas unitarias rápidas y limpias.

### Estructura de Capas por Módulo (`src/modules/*`)

*   **`domain/` (Capa de Dominio)**
    *   *Propósito:* Contiene las entidades puras del negocio (`User.ts`) y las interfaces o contratos (Ej: `UserRepository.ts`). No importa ninguna librería externa a excepción posiblemente de alguna utilidad pura.
*   **`application/` (Capa de Aplicación / Casos de Uso)**
    *   *Propósito:* Contiene los "Use Cases" (Ej: `LoginUseCase.ts`). Controlan el flujo o core del proceso a realizar usando entidades del dominio y llamando a los repositorios. Dependen únicamente del Dominio.
*   **`infrastructure/` (Capa de Infraestructura / Adaptadores)**
    *   *Propósito:* Implementaciones externas. Se encarga de hacer el "trabajo sucio": Controladores web (`AuthController.ts`), rutas en Express (`AuthRoutes.ts`), interactuar con bases de datos adaptando las interfaces de dominio (`PrismaUserRepository.ts`).

---

## 🛠 Stack Tecnológico y su Justificación

Se han elegido herramientas modernas y estables del mundo de JavaScript orientadas a seguridad y Developer Experience (DX).

| Tecnología | Justificación |
| :--- | :--- |
| **Node.js + Express (v5)** | `Node.js` ofrece el entorno JavaScript más asíncrono y de mejor rendimiento para resolver I/O eficientemente. Se utiliza `Express` por su enorme ecosistema y simpleza, aprovechando su V5 que integra soporte de promesas nativas ahorrando código try/catch.|
| **TypeScript** | Agrega fuerte tipado estático, vitalizando la arquitectura hexagonal. Permite definir sólidamente interfaces y promesas para lograr que los errores broten en la etapa de desarrollo y no en producción. |
| **Prisma ORM** | A diferencia de los ORM tradicionales, Prisma analiza un archivo `schema.prisma` y genera un cliente TypeScript auto-adivinado totalmente type-safe. Simplifica las modificaciones agilizando mucho las migraciones y ofreciendo autocompletado en el editor. |
| **MySQL** | Base de datos relacional altamente recomendada para sistemas donde las transacciones importan e interactúan (venta vinculada a promotor, meta, productos y usuario). Ideal para garantizar control de estricto ACID. |
| **JSON Web Tokens (JWT)** | Metodología stateless. Elimina cuellos de botella evitando guardar sesiones de login de usuarios en memoria, reduciendo el consumo del RAM del backend. Facilita una API RESTful completamente desacoplada y lista para móviles u otras fronteras. |
| **Joi** | El validador por excelencia. Situado como middleware permite asegurar que la data entrante por HTTP al Controlador coincide con moldes precisos, lanzando errores predecibles directamente antes de pisar el Dominio, evitando suciedad de datos y validaciones redundantes posteriores. |
| **@hapi/boom** | Estandariza brutalmente las respuestas de errores en la API generando un formato predictivo de JSON estructurado y correcto para HTTP Status Codes (ej. `400 Bad Request`, `401 Unauthorized`), excelente para que los clientes frontend los mapeen fácilmente. |
