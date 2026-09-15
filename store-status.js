// Horários locais da loja; aceita faixas que atravessam a meia-noite.
export function isStoreOpen(config, now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {timeZone: config.timezone, weekday:'short', hour:'2-digit', minute:'2-digit', hourCycle:'h23'}).formatToParts(now).map(p => [p.type, p.value]));
  const day = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(parts.weekday);
  const minute = Number(parts.hour) * 60 + Number(parts.minute);
  return (config.openingHours || []).some(row => {
    const times = [...row.hours.matchAll(/(\d{1,2}):(\d{2})/g)].map(m => Number(m[1])*60+Number(m[2]));
    if (times.length !== 2 || !Array.isArray(row.weekdays)) return false;
    const [start,end] = times;
    return end > start ? row.weekdays.includes(day) && minute >= start && minute < end : (row.weekdays.includes(day) && minute >= start) || (row.weekdays.includes((day+6)%7) && minute < end);
  });
}
