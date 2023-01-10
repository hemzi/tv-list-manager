<template>
  <div id="status_filter">
    <input v-model="searchTerm" type="text" placeholder="Search" />
    <div class="status_label" @click="updateFilter('all')">All</div>
    <div class="status_label online" @click="updateFilter('online')">Online</div>
    <div class="status_label offline" @click="updateFilter('offline')">Offline</div>
    <div class="status_label exceeded" @click="updateFilter('exceeded')">Offline longer than 3 months</div>
    <div class="status_label unknown" @click="updateFilter('unknown')">Offline for unknown period</div>
  </div>
  <Spinner v-if="!searchedDevices.length" />
  <Device :device="device" v-for="device in searchedDevices" :key="device.device_id" class="device_list"
    @requestDelete="requestDelete" />

</template>

<script>
// import { ref } from 'vue';
// components
import Device from '@/components/Device.vue';
import Spinner from '@/components/Spinner.vue';
import { ref, toRef, computed, watch } from 'vue';
import checkOfflinePeriod from '@/composables/checkOfflinePeriod';
import deleteDevice from '@/composables/deleteDevice';


export default {
  props: ['devices'],
  components: { Device, Spinner },
  setup(props) {
    const devices = toRef(props, 'devices')
    const devicesClone = ref([]) //! https://forum.vuejs.org/t/set-operation-on-key-failed-target-is-readonly/116359
    const searchTerm = ref('')
    const filterType = ref("all");

    watch(devices, (x) => { devicesClone.value = x })
    const updateFilter = (type) => {
      filterType.value = type;
      console.log(type);
    };
    const filteredDevices = (ftype) => {
      switch (ftype) {
        case "all":
          return devicesClone.value;
          break;
        case "online":
          return devicesClone.value.filter((device) => device.online_state === "Online");
          break;
        case "offline":
          return devicesClone.value.filter(
            (device) =>
              device.online_state === "Offline" &&
              device.last_seen &&
              !checkOfflinePeriod(device.last_seen)
          );
          break;
        case "exceeded":
          return devicesClone.value.filter(
            (device) =>
              device.online_state === "Offline" && checkOfflinePeriod(device.last_seen)
          );
          break;
        case "unknown":
          return devicesClone.value.filter(
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

    const requestDelete = async (device) => {
      console.log('emit')
      const { error, del } = deleteDevice()
      try {
        let response = await del(device)
        console.log("hhhhh", response.value)
        //TODO: this is nasty
        if (error.value) { throw Error(error.value) }
        if (response.value) {
          devicesClone.value = devicesClone.value.filter(d => d.device_id !== device.device_id);
          console.log('kyjf')
        }

      } catch (err) {
        console.log(err.message)
      }
    }

    return { searchTerm, searchedDevices, filterType, filteredDevices, updateFilter, checkOfflinePeriod, requestDelete }
  }
}
</script>

<style>

</style>