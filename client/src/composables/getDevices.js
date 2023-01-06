import { ref } from "vue";

const getDevices = () => {
  const devices = ref([]);
  const error = ref(null);
  const load = async () => {
    try {
      let res = await fetch("http://localhost:3000/api/devices");
      // server related errors
      if (!res.ok) {
        throw new Error("There was an error fetching devices.");
      }
      let data = await res.json();
      if (data.success) {
        devices.value = await data.data;
      } else {
        error.value = await data.error;
      }
    } catch (err) {
      console.log(err.message);
      res.status(500);
    }
  };
  return { devices, error, load };
};

export default getDevices;
