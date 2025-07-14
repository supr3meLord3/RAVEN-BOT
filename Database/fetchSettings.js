const { getSettings } = require('../Database/config');

async function fetchSettings() {
  const data = await getSettings();

  return {
    wapresence: data.wapresence,
    autoread: data.autoread,
    mode: data.mode,
    prefix: data.prefix,
    autolike: data.autolike,
    autoview: data.autoview,
    antilink: data.antilink,
    antilinkall: data.antilinkall,
    antidelete: data.antidelete,
    antitag: data.antitag,
    antiforeign: data.antiforeign,
    antibot: data.antibot,
    events: data.events,
    autobio: data.autobio,
    badword: data.badword,
    gptdm: data.gptdm

  };
}

module.exports = fetchSettings;
