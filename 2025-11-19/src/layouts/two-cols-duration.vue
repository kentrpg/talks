<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
  },
  layoutClass: {
    type: String,
  },
  duration: {
    type: String,
    default: '400ms',
  },
})
</script>

<template>
  <div class="slidev-layout two-cols-duration w-full h-full" :class="layoutClass">
    <div class="col-header">
      <slot />
    </div>
    <div class="col-left" :class="props.class">
      <slot name="left" />
    </div>
    <div class="col-right" :class="props.class">
      <slot name="right" />
    </div>
    <div class="col-bottom" :class="props.class">
      <slot name="bottom" />
    </div>
  </div>
</template>

<style scoped>
/* Override the default transition duration from client/styles/index.css for the .slidev-vclick-target element */
:deep(.slidev-vclick-target) {
  transition-duration: v-bind(duration);
}

.two-cols-duration {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: max-content 1fr;
  gap: 1.25rem 1rem;
}

.col-header {
  grid-area: 1 / 1 / 2 / 3;
}
.col-left {
  grid-area: 2 / 1 / 3 / 2;
}
.col-right {
  grid-area: 2 / 2 / 3 / 3;
}
.col-bottom {
  grid-area: 3 / 1 / 3 / 3;
}
</style>