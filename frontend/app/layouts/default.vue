<template>
  <v-app class="bg-surface-subtle">
    <AppSidebar />
    <AppHeader />
    <v-main class="bg-surface-subtle">
      <v-container fluid class="pa-md-8 pa-4 h-100">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* Los colores están vinculados semánticamente en global.scss mediante variables css */
</style>
