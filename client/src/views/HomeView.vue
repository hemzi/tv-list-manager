<template>
  <div class="home">
    <h1>TV List Manager</h1>
    <Devices :devices="devices" />
  </div>
</template>

<script>
// import { ref } from 'vue';
// components
import Devices from '@/components/Devices.vue';
// composables
import getDevices from '@/composables/getDevices';
export default {
  name: 'HomeView',
  components: {
    Devices
  },
  setup() {
    const { devices, error, load } = getDevices();
    load()
    return { devices, error }
  }
}
</script>
