import fetch from 'node-fetch';

export async function checkNetlifyDomain(domain, accessToken) {
  // Netlify API: List all sites, then check domain association
  const response = await fetch('https://api.netlify.com/api/v1/sites', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) return false;
  const sites = await response.json();
  return sites.some(site => site.domain === domain || site.custom_domain === domain);
}
