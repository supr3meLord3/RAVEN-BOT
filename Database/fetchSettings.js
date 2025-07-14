const { getSettings } = require('../Database/config');

async function fetchSettings() {
  const data = await getSettings();

  return {
    wapresence: data.wapresence,
    autoread: data.autoread,
    mode: data.mode,
    prefix: data.prefix,
    autolike: data.autolike,
    autoviewstatus: data.autoviewstatus,
    antilink: data.antilink
  };
}

module.exports = fetchSettings;