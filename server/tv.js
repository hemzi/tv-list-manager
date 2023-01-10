const baseUrl = "https://webapi.teamviewer.com/api/v1";
const apiKey = process.env.API_KEY_TV;

async function getDevices() {
  let res = await fetch(`${baseUrl}/devices/`, {
    method: "GET",
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  return await res.json();
}

async function deleteDevice(device_id) {
  let res = await fetch(`${baseUrl}/devices/${device_id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  return await res.json();
}

//TODO: need to log unknown error json
function parseResponse(response) {
  if (response.hasOwnProperty("error")) {
    console.log(response.error_description);
    switch (response.error_code) {
      case 2:
        throw new Error("Server's TeamViewer api key is invalid/expired.");
    }
  }
}

module.exports = { getDevices, deleteDevice, parseResponse };

//* error format from TV
// {
//   error: 'invalid_token',
//   error_description: 'Bearer token missing.',
//   error_code: 2
// }
