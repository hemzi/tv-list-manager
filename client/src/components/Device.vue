<template>
  <div class="device">
    <span>
      <i class="fa-solid fa-pen-to-square"></i>
      <a href="#" @click.prevent="fixName(device, devices)"><i class="fa-sharp fa-solid fa-hammer"></i></a>

      <span :class="{
        'status_label': true, 'online': (device.online_state === 'Online'), 'exceeded': (device.online_state === 'Offline' && checkOfflinePeriod(device.last_seen)), 'unknown': (device.online_state === 'Offline' && !device.last_seen), 'offline': (device.online_state === 'Offline')
      }">{{ device.online_state }}</span>
      <span> {{ device.alias }}</span> </span>
    <!-- <input type="text" v-model="device.alias"> -->
    <span v-if="checkOfflinePeriod(device.last_seen) || (device.online_state === 'Offline' && !device.last_seen)">
      <span v-if="checkOfflinePeriod(device.last_seen)">[{{ formatDate(device.last_seen) }}]</span>
      <i class="fa-solid fa-trash"></i>
    </span>
  </div>
</template>

<script>

import formatDate from '@/composables/formatDate';
import checkOfflinePeriod from '@/composables/checkOfflinePeriod';
import fixName from '@/composables/fixName';

export default {
  props: ['device'],
  setup() {

    return { formatDate, checkOfflinePeriod, fixName }
  }
}
</script>

<style>
p {
  color: var(--color-primary);
}
</style>