import { ref } from "vue";

const getDevices = () => {
  const devices = ref([]);
  const error = ref(null);
  const load = async () => {
    try {
      let res = await fetch("http://10.1.90.31:3000/api/devices");
      // server related errors
      if (!res.ok) {
        throw new Error("There was an error fetching devices.");
      }
      let json = await res.json();
      if (json.success) {
        devices.value = await json.data;
      } else {
        error.value = await json.error;
      }
    } catch (err) {
      console.log(err.message);
      res.status(500);
    }
  };
  return { devices, error, load };
};

export default getDevices;
