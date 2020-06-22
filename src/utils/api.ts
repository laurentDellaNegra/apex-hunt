const protocol = 'https';
const serverName = 'public-api.tracker.gg';
const version = 'v2';
const apiKey = 'da78a469-86a5-41cc-b66d-d2533db44007';

export const serverBaseUrl =
  process.env.NODE_ENV === 'production'
    ? `${protocol}://${serverName}/${version}/apex/standard`
    : `/${version}/apex/standard`;

function createHeader(): Headers {
  const headers = new Headers();
  headers.append('TRN-Api-Key', apiKey);
  headers.append('Accept', 'application/json');
  return headers;
}

export function createConfig(method?: string): RequestInit {
  return {
    method: method || 'GET',
    headers: createHeader(),
    mode: 'cors',
  };
}
