<template>
  device-list
  <div v-for="device in devices" :key="device.device_id">

    <Device :device="device" />
  </div>
</template>

<script>
// import { ref } from 'vue';
// components
import Device from '@/components/Device.vue';


export default {
  props: ['devices'],
  components: { Device },
  setup() {

    return {}
  }
}
</script>

<style>

</style>