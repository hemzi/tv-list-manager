import { ref } from "vue";
const deleteDevice = async (device) => {
  const error = ref(null);
  const { device_id } = device;
  try {
    const res = await fetch(
      `https://10.1.90.31:3000/api/devices/:${device_id}`
    );
    if (!res.ok) {
      throw Error("There was an error deleting this device.");
    }
    const json = res.json();
    if (!json.succes) {
      error.value = await json.error;
    }
  } catch (error) {
    console.log(err.message);
    res.status(500);
  }
};

export default { error, deleteDevice };
