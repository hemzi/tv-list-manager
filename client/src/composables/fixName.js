// * device is a reference
const fixName = (device) => {
  const { alias } = device;

  let newAlias = alias;

  // * format name
  // prune FCC- prefix
  newAlias = newAlias.replace("FCC-", "");
  // prune building prefix
  newAlias = newAlias.replace(/([A-Z,a-z][0-9]*)+\-/, "");
  // format ###### first last -> ###### (first fast)
  if (newAlias.match(/^\d{1,6} (\w*) (\w*)$/)) {
    newAlias = newAlias.replace(/^(\d{1,6}) (\w*) (\w*)$/, "$1 ($2 $3)");
  }
  device.alias = newAlias;
  return device;
};

export default fixName;
