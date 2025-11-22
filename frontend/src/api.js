const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export async function fetchJSON(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const opts = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  // If body is a plain object, stringify it (helpful for callers)
  if (opts.body && typeof opts.body !== 'string') {
    opts.body = JSON.stringify(opts.body);
  }

  const res = await fetch(url, opts).catch(err => {
    throw new Error('Network error: ' + err.message);
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    // No JSON returned
    if (!res.ok) throw new Error(res.statusText || 'Request failed');
    return {};
  }

  if (!res.ok) {
    // Prefer message fields returned by backend
    const message = data.error || data.message || JSON.stringify(data) || res.statusText;
    throw new Error(message);
  }
  return data;
}
export default fetchJSON;

