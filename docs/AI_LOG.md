# AI Log

## Prompts frontend

### 1. Configuración base de Nuxt

```text
Crea la configuración base de un proyecto Nuxt con TypeScript, autoimport de componentes, soporte para SCSS global y runtimeConfig para consumir una API interna y pública.
```

### 2. Integración de Vuetify

```text
Integra Vuetify en Nuxt con soporte SSR, autoimport de componentes y configuración centralizada en un plugin.
```

### 3. Tema semántico

```text
Genera un tema semántico para Vuetify con colores de brand, surface, text y status. Quiero nombres reutilizables como brand-primary, surface-base, text-muted, success-base e info-subtle.
```

### 4. Variables globales de estilo

```text
Crea un archivo global.scss con variables CSS para tipografía, clases utilitarias de texto, fondos semánticos y sombras reutilizables.
```

### 5. Wrappers UI reutilizables

```text
Crea componentes wrapper para Vuetify llamados AppCard, AppButton y AppInput para centralizar estilos, variantes y props comunes.
```

### 6. Botón reutilizable

```text
Construye un AppButton sobre v-btn con variantes primary, secondary, ghost, danger e info, usando estilos consistentes y soporte para iconos, loading y block.
```

### 7. Card reutilizable

```text
Construye un AppCard sobre v-card con variantes default, info, transparent y gradient, controlando padding y estilos base del contenedor.
```

### 8. Input reutilizable

```text
Construye un AppInput sobre v-text-field para simplificar formularios y reutilizar estilos del sistema visual.
```

### 9. Layout autenticado

```text
Crea un layout principal para usuarios autenticados usando v-app, sidebar, header y un contenedor principal con spacing consistente.
```

### 10. Layout de autenticación

```text
Crea un layout minimalista para login con el contenido centrado vertical y horizontalmente sobre una superficie sutil.
```

### 11. Sidebar por rol

```text
Crea un AppSidebar con navegación lateral, branding simple e ítems filtrados por rol para ADMIN, SUPERVISOR y PROMOTOR.
```

### 12. Header de usuario

```text
Crea un AppHeader con avatar, menú de usuario y acción de logout, usando datos de sesión desde un store global.
```

### 13. Integración de Pinia

```text
Integra Pinia en Nuxt y crea un auth store para login, persistencia de token en localStorage, restoreSession y logout.
```

### 14. Integración de Axios

```text
Crea un plugin de Axios para Nuxt con baseURL configurable por runtimeConfig y agrega automáticamente el token JWT en el header Authorization.
```

### 15. Middleware de autenticación

```text
Genera un middleware global para Nuxt que redirija al login si no existe token y evite entrar a /login si el usuario ya tiene sesión activa.
```

### 16. Notificaciones visuales

```text
Integra vue-sonner en la app para mostrar toasts de éxito y error en acciones como login, carga de datos y formularios.
```

### 17. Pantalla de login

```text
Diseña una pantalla de login moderna con una card central, icono principal, inputs reutilizables y botón de acceso con loading.
```

### 18. Dashboard por rol

```text
Crea una página dashboard que cambie su contenido según el rol del usuario: vista individual para promotor y vista consolidada para admin o supervisor.
```

### 19. Tabla reutilizable

```text
Crea un componente BaseTableCard con título, tabla interna y slot para personalizar filas, usando AppCard como contenedor base.
```

### 20. Módulo de ventas

```text
Diseña una pantalla de ventas con historial en tabla y modal para registrar una venta con múltiples productos, cantidades y total acumulado.
```

### 21. Módulo de metas

```text
Crea una pantalla de metas para asignar objetivos mensuales por promotor con formulario lateral y tabla de metas registradas.
```

### 22. Módulo de progreso

```text
Construye componentes reutilizables para progreso comercial: resumen de vendido vs meta, porcentaje de cumplimiento, logros y vista agregada por equipo.
```

### 23. Composición de progreso por equipo

```text
Crea un componente TeamProgressOverview que combine tarjetas resumen, tabla por promotor y logros del equipo usando composición de componentes.
```

### 24. Formato de moneda y agregados

```text
Extrae helpers reutilizables para formatear moneda en MXN y construir métricas agregadas de progreso del equipo.
```

## Observación

Los prompts anteriores reflejan principalmente estas decisiones reales del frontend:

- uso de `Nuxt`,
- integración de `Vuetify`,
- tema semántico centralizado,
- wrappers `App*`,
- `Pinia` para autenticación,
- `Axios` para consumo de API,
- `Vue Sonner` para feedback visual,
- vistas diferenciadas por rol,
- componentes compuestos para progreso y dashboard.
