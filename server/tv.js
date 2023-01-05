const baseUrl = "https://webapi.teamviewer.com/api/v1";
const apiKey = process.env.API_KEY_TV;

async function getDevices() {
  let res = await fetch(`${baseUrl}/devices/`, {
    method: "GET",
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  return await res.json();
}

module.exports = { getDevices };

//* error format from TV
// {
//   error: 'invalid_token',
//   error_description: 'Bearer token missing.',
//   error_code: 2
// }
