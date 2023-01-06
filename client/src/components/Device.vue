<template>
  <div class="device">
    <span :class="{
      'status_label': true, 'online': (device.online_state === 'Online'), 'unknown': (device.online_state === 'Offine' && !device.last_seen), 'offline': (device.online_state === 'Offline')
    }">{{ device.online_state }}</span>
    <span> {{ device.alias }}</span>
  </div>
</template>

<script>
import { formatDate } from '@/composables/formatDate';
export default {
  props: ['device'],
  setup() {

    return { formatDate }
  }
}
</script>

<style>
p {
  color: var(--color-primary);
}
</style>