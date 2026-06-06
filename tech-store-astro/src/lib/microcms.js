const SERVICE_ID = import.meta.env.MICROCMS_SERVICE_ID;
const API_KEY = import.meta.env.MICROCMS_API_KEY;

const BASE_URL = `https://${SERVICE_ID}.microcms.io/api/v1`;

async function fetchAPI(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'X-MICROCMS-API-KEY': API_KEY },
  });
  if (!res.ok) throw new Error(`microCMS error: ${res.status} ${endpoint}`);
  return res.json();
}

/** 全商品を取得（最大100件） */
export async function getAllProducts() {
  const data = await fetchAPI('/products?limit=100&orders=-publishedAt');
  return data.contents;
}

/** 単一商品を取得 */
export async function getProduct(id) {
  return fetchAPI(`/products/${id}`);
}
