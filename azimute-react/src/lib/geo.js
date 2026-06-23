// Geocodificação (Nominatim) + roteamento (OSRM público) + leitura de confiança.

export function haversine(a, b) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export async function geocode(query) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    const data = await res.json();
    if (data && data[0]) return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  } catch {
    /* offline / bloqueado: usa fallback */
  }
  return null;
}

export async function fetchRoute(from, to) {
  const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.routes || !data.routes[0]) throw new Error('Rota não encontrada');
  const r = data.routes[0];
  return {
    coords: r.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
    distance: r.distance, // metros
    duration: r.duration, // segundos
  };
}

// Avalia o trajeto cruzando-o com os incidentes próximos.
export function routeTrust(coords, incidents) {
  let bad = 0;
  let warn = 0;
  const hit = (pt, tone) => incidents.some((i) => i.tone === tone && haversine(pt, [i.lat, i.lng]) <= 170);
  const step = Math.max(1, Math.floor(coords.length / 120));
  for (let k = 0; k < coords.length; k += step) {
    if (hit(coords[k], 'bad')) bad++;
    else if (hit(coords[k], 'warn')) warn++;
  }
  if (bad >= 1) return { tone: 'bad', label: 'Evite', bad, warn, why: 'Passa perto de pontos de risco relatados.' };
  if (warn >= 2) return { tone: 'warn', label: 'Atenção', bad, warn, why: 'Cruza áreas que pedem atenção no horário.' };
  return { tone: 'ok', label: 'Recomendado', bad, warn, why: 'Sem pontos de risco relevantes no caminho.' };
}
