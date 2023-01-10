import { ref } from "vue";
const deleteDevice = () => {
  const error = ref(null);
  // const { device_id } = device;

  const del = async (device) => {
    const success = ref(null);
    try {
      const res = await fetch(
        `http://10.1.90.31:3000/api/devices/${device.device_id}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        throw Error("There was an error deleting this device.");
      }
      const json = await res.json();
      if (!json.success) {
        console.log("fail", json);
        error.value = await json.error;
      }
      success.value = await json.success;
    } catch (error) {
      console.log(err.message);
      res.status(500);
    }
    return success;
  };

  return { error, del };
};

export default deleteDevice;
