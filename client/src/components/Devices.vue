<template>
  <div id="status_filter">
    <input v-model="searchTerm" type="text" placeholder="Search" />
    <div class="status_label" @click="updateFilter('all')">All</div>
    <div class="status_label online" @click="updateFilter('online')">Online</div>
    <div class="status_label offline" @click="updateFilter('offline')">Offline</div>
    <div class="status_label exceeded" @click="updateFilter('exceeded')">Offline longer than 3 months</div>
    <div class="status_label unknown" @click="updateFilter('unknown')">Offline for unknown period</div>
  </div>
  <Spinner v-if="!devices.length" />
  <Device :device="device" v-for="device in searchedDevices" :key="device.device_id" class="device_list" />

</template>

<script>
// import { ref } from 'vue';
// components
import Device from '@/components/Device.vue';
import Spinner from '@/components/Spinner.vue';
import { ref, toRef, computed } from 'vue';
import checkOfflinePeriod from '@/composables/checkOfflinePeriod';


export default {
  props: ['devices'],
  components: { Device, Spinner },
  setup(props) {
    const devices = toRef(props, 'devices')
    const searchTerm = ref('')
    const filterType = ref("all");
    const updateFilter = (type) => {
      filterType.value = type;
      console.log(type);
    };
    const filteredDevices = (ftype) => {
      switch (ftype) {
        case "all":
          return devices.value;
          break;
        case "online":
          return devices.value.filter((device) => device.online_state === "Online");
          break;
        case "offline":
          return devices.value.filter(
            (device) =>
              device.online_state === "Offline" &&
              device.last_seen &&
              !checkOfflinePeriod(device.last_seen)
          );
          break;
        case "exceeded":
          return devices.value.filter(
            (device) =>
              device.online_state === "Offline" && checkOfflinePeriod(device.last_seen)
          );
          break;
        case "unknown":
          return devices.value.filter(
            (device) => device.online_state === "Offline" && !device.last_seen
          );
          break;
      }
    };

    const searchedDevices = computed(() => {
      return filteredDevices(filterType.value).filter((device) =>
        device.alias.toLowerCase().match(searchTerm.value.toLowerCase())
      );
    })

    return { searchTerm, searchedDevices, filterType, filteredDevices, updateFilter, checkOfflinePeriod }
  }
}
</script>

<style>

</style>