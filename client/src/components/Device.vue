<template>
  <div>
    <p>this is a device: {{ device.alias }}</p>
  </div>
</template>

<script>
export default {
  props: ['device'],
  setup() {

    return {}
  }
}
</script>

<style>
p {
  color: var(--color-primary);
}
</style>