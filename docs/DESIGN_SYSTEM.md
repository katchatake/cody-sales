# Design System Frontend

## Visión general

El frontend de **Cody Sales** implementa un sistema de diseño ligero apoyado en **Nuxt + Vue + Vuetify**, con una capa propia de abstracción basada en:

- **tokens semánticos** de color,
- **variables CSS globales** para tipografía,
- **wrappers de componentes** sobre Vuetify,
- **componentes compuestos** para patrones de interfaz repetidos,
- **layouts base** para separar la experiencia autenticada de la experiencia de acceso.

No es un design system completamente formalizado como librería independiente, pero sí existe una base reutilizable clara para mantener consistencia visual y acelerar el desarrollo.

## Stack del sistema visual

- **Vuetify** como foundation UI principal.
- **SCSS global** para variables, tipografía y utilidades.
- **Material Design Icons** para iconografía.
- **Vue Sonner** para feedback de acciones.

Archivos clave:

- `frontend/app/config/theme.ts`
- `frontend/app/plugins/02.vuetify.ts`
- `frontend/app/assets/scss/global.scss`
- `frontend/app/components/ui/*`
- `frontend/app/components/base/*`
- `frontend/app/components/layout/*`
- `frontend/app/components/progress/*`

## Arquitectura general del design system

La jerarquía visual actual se organiza así:

1. **Foundation**
   Colores semánticos, tipografía, sombras y configuración base de Vuetify.

2. **Wrappers UI**
   Componentes `App*` que encapsulan decisiones visuales y de API sobre componentes nativos de Vuetify.

3. **Componentes base reutilizables**
   Componentes intermedios que resuelven patrones frecuentes como tarjetas con tablas.

4. **Componentes compuestos por dominio**
   Componentes de negocio reutilizables, especialmente en el módulo de progreso.

5. **Layouts**
   Estructuras globales de navegación y contención de vistas.

## Foundation

### 1. Tokens semánticos de color

El archivo `frontend/app/config/theme.ts` define el tema `semanticTheme` y concentra la paleta principal del sistema.

Categorías de tokens:

- **Brand**
  - `brand-primary`
  - `brand-secondary`

- **Surface**
  - `surface-base`
  - `surface-subtle`
  - `surface-elevated`

- **Text**
  - `text-base`
  - `text-heading`
  - `text-muted`

- **Status**
  - `success-base`
  - `success-subtle`
  - `warning-base`
  - `warning-subtle`
  - `error-base`
  - `error-subtle`
  - `info-base`
  - `info-subtle`

También se incluyen aliases nativos de Vuetify:

- `primary`
- `secondary`
- `error`
- `info`
- `success`
- `warning`

Esto permite que los componentes nativos de Vuetify sigan respondiendo bien incluso si consumen nombres estándar del framework.

### 2. Tipografía semántica

El archivo `frontend/app/assets/scss/global.scss` define la escala tipográfica mediante variables CSS:

- `--text-heading-xl`
- `--text-heading-lg`
- `--text-heading-md`
- `--text-heading-sm`
- `--text-body-lg`
- `--text-body-md`
- `--text-body-sm`
- `--text-caption`

También define la familia tipográfica base:

- `--font-family-base`

Sobre esa escala se construyen utilidades globales:

- `.text-heading-xl`
- `.text-heading-lg`
- `.text-heading-md`
- `.text-heading-sm`
- `.text-body-lg`
- `.text-body-md`
- `.text-body-sm`
- `.text-muted`

Estas clases funcionan como una capa de tipografía semántica por encima de Vuetify.

### 3. Tokens/utilidades de superficie

En `global.scss` existen clases utilitarias para superficies:

- `.bg-surface-base`
- `.bg-surface-subtle`
- `.bg-surface-elevated`

Se usan para desacoplar el significado visual del color real y mantener el lenguaje semántico del sistema.

### 4. Sombras y elevación

El sistema agrega dos utilidades globales:

- `.shadow-base`
- `.shadow-lg`

Además, en la configuración de Vuetify se fijan defaults:

- `VCard` con `elevation: 3`
- `VBtn` con `color: brand-primary`
- `VTextField` con `variant: outlined`, `bgColor: surface-elevated` y `rounded: lg`

Esto establece una base consistente incluso antes de pasar por los wrappers propios.

## Configuración de Vuetify como capa base

El archivo `frontend/app/plugins/02.vuetify.ts` es el punto central del sistema visual.

Responsabilidades:

- registrar Vuetify con soporte SSR,
- inyectar el tema `semanticTheme`,
- definir defaults globales para componentes nativos,
- unificar estilos de entrada antes de construir componentes propios.

Esta decisión evita que cada vista repita props visuales y reduce el acoplamiento directo al framework.

## Wrappers de componentes generales

La abstracción principal del sistema está en `frontend/app/components/ui`.

### `AppCard`

Wrapper de `v-card`.

Responsabilidades:

- aplicar radio, sombra y altura consistente,
- controlar padding por prop,
- centralizar variantes visuales.

API visual actual:

- `variant="default"`
- `variant="gradient"`
- `variant="info"`
- `variant="transparent"`
- `padded`
- `padded="large"`

Decisiones relevantes:

- la variante `gradient` crea una tarjeta hero con gradiente propio,
- la variante `info` usa `bg-info-subtle`,
- la variante default usa `bg-surface-base`.

`AppCard` actúa como el contenedor estructural principal del sistema.

### `AppButton`

Wrapper de `v-btn`.

Responsabilidades:

- traducir variantes semánticas a color + estilo Vuetify,
- estandarizar tamaño, elevación, sombra y esquinas,
- reducir uso directo de props nativas en páginas.

Variantes soportadas:

- `primary`
- `secondary`
- `danger`
- `ghost`
- `white`
- `info`

Reglas implementadas:

- `ghost` se renderiza como `variant="text"` y sin elevación,
- variantes no ghost usan elevación y sombra,
- botones con `icon` usan forma circular,
- botones sin `icon` usan forma `pill`.

### `AppInput`

Wrapper de `v-text-field`.

Responsabilidades:

- simplificar el uso de campos de entrada,
- mantener consistencia mínima de props comunes,
- delegar la mayor parte del estilo en defaults de Vuetify.

Es un wrapper delgado. Su valor principal hoy no está en lógica compleja, sino en servir como punto futuro de centralización.

## Componentes base reutilizables

### `BaseTableCard`

Ubicado en `frontend/app/components/base/BaseTableCard.vue`.

Es un componente puente entre UI genérica y vistas de negocio.

Responsabilidades:

- encapsular una tabla dentro de `AppCard`,
- unificar encabezados, espaciado y título,
- delegar el render de filas mediante slot.

Patrón de composición:

- recibe `title`, `headers`, `items`,
- usa slot `row` para render flexible del contenido.

Este componente es importante porque define el patrón estándar de tablas del sistema.

## Componentes compuestos por dominio

Los componentes en `frontend/app/components/progress` representan el siguiente nivel de madurez del sistema: ya no son wrappers genéricos, sino patrones visuales reutilizables de negocio.

### `ProgressSnapshotRow`

Construye una fila de tres tarjetas para:

- vendido,
- cumplimiento,
- estado o tarjeta complementaria.

Características:

- usa `AppCard` como contenedor base,
- reutiliza tokens semánticos de color,
- admite personalización de labels,
- expone slot `third-card` para extender el tercer bloque.

Es un buen ejemplo de componente reusable con API visual simple y orientada a composición.

### `ProgressAchievementsCard`

Encapsula la visualización de hitos de cumplimiento.

Patrones del sistema:

- tarjetas internas con borde y fondo semántico,
- estado logrado/no logrado por color y variante de `v-chip`,
- copy y estructura estable para diferentes contextos.

### `TeamProgressOverview`

Es el componente compuesto más completo del sistema.

Combina:

- `ProgressSnapshotRow`
- `BaseTableCard`
- `ProgressAchievementsCard`

Responsabilidades:

- construir una vista consolidada de progreso del equipo,
- aceptar variaciones mediante props y slots,
- centralizar una composición compleja de forma reusable.

Este componente muestra que el sistema no solo generaliza átomos visuales, sino también vistas completas orientadas a un caso de uso.

## Layout system

Los layouts están en `frontend/app/layouts` y forman parte directa del design system porque controlan shell, contención y navegación.

### `default.vue`

Layout principal para usuarios autenticados.

Incluye:

- `AppSidebar`
- `AppHeader`
- `v-main`
- `v-container` con padding global

Responsabilidades:

- definir la estructura de aplicación,
- mantener consistencia de espacios,
- alojar cualquier vista operativa dentro de una shell común.

### `auth.vue`

Layout mínimo para acceso.

Incluye:

- `v-app`
- `v-main`
- centrado vertical y horizontal del contenido

Este layout separa claramente la experiencia de autenticación de la experiencia operativa.

## Componentes estructurales de navegación

### `AppSidebar`

Es el componente de navegación lateral del sistema.

Patrones implementados:

- branding visual del producto,
- navegación declarativa,
- visibilidad condicional por rol,
- consistencia de iconografía y espaciado.

La configuración del menú vive dentro del componente mediante un arreglo `items`, que luego se filtra con `visibleItems`.

Esto convierte a `AppSidebar` en un wrapper estructural, no solo visual.

### `AppHeader`

Es la cabecera global del área autenticada.

Responsabilidades:

- mostrar el avatar del usuario,
- exponer acciones de sesión,
- reservar un slot para título,
- mantener consistencia del encabezado superior.

El avatar, el menú y la lectura del usuario autenticado ya forman parte del lenguaje base del sistema.

## Tokens semánticos y naming

El sistema actual tiene un enfoque claramente semántico, especialmente en color.

Buenas decisiones ya presentes:

- uso de nombres por intención y no por color físico,
- separación entre `surface`, `text`, `brand` y `status`,
- consumo transversal de tokens tanto en SCSS como en Vuetify.

Límites actuales:

- no existe una escala explícita de spacing tokenizada,
- no existe una escala formal de radios,
- no existe un archivo único de sombras, bordes o motion tokens,
- parte del sistema mezcla clases utilitarias de Vuetify con clases propias,
- algunos estilos permanecen hardcodeados en componentes (`rgba`, gradientes, radios puntuales).

## Generalización real alcanzada

El frontend ya generaliza correctamente estas capas:

- **color semántico** mediante `semanticTokens`,
- **tipografía base** mediante variables CSS y utilidades,
- **botones, inputs y cards** mediante wrappers `App*`,
- **tablas encapsuladas** mediante `BaseTableCard`,
- **shell de aplicación** mediante layouts y componentes de navegación,
- **módulo de progreso** mediante componentes compuestos reutilizables.

## Áreas que siguen acopladas o parciales

Aunque el sistema tiene una base sólida, todavía hay aspectos no completamente sistematizados:

- La escala de spacing sigue dependiendo mucho de clases utilitarias como `pa-6`, `mb-4`, `mt-2`.
- Hay colores y bordes escritos inline o en `style scoped` en algunos componentes.
- `AppInput` todavía delega casi toda su personalidad visual a Vuetify.
- No existe un catálogo documentado de variantes visuales por componente fuera del código.
- No existe separación formal entre tokens de foundation y tokens de componente.

## Criterios de uso recomendados

Para mantener coherencia en futuras pantallas, la recomendación es:

1. Usar primero `AppCard`, `AppButton` y `AppInput` antes de acudir a componentes nativos de Vuetify.
2. Reutilizar `BaseTableCard` para cualquier tabla estándar de negocio.
3. Extender patrones compuestos por módulo cuando un layout de negocio ya se repite.
4. Consumir siempre colores desde tokens semánticos y no desde valores hex o nombres físicos.
5. Evitar introducir estilos inline si la intención puede resolverse con una variante o utilidad global.

## Propuesta de evolución del design system

Si el proyecto sigue creciendo, el siguiente paso natural sería formalizar:

- **spacing tokens** como `--space-1` a `--space-8`,
- **radius tokens** como `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill`,
- **shadow tokens** centralizados,
- **motion tokens** para transiciones,
- **más wrappers base**, por ejemplo `AppSelect`, `AppModal`, `AppStatCard`, `AppSectionHeader`,
- **documentación viva** con ejemplos de uso por componente.

## Resumen

El frontend de Cody Sales ya cuenta con un sistema de diseño funcional y reconocible. Su núcleo está en la combinación de:

- tokens semánticos en Vuetify,
- tipografía y utilidades globales,
- wrappers `App*`,
- componentes base,
- componentes compuestos reutilizables por dominio,
- layouts estructurales para navegación y shell de aplicación.

La base es correcta para un proyecto pequeño o mediano. El principal siguiente paso no es rehacerla, sino **formalizar mejor los tokens y seguir moviendo patrones repetidos desde las páginas hacia componentes del sistema**.
