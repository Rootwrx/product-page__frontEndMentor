import { TIMEOUT_SEC } from "./config";

const timeout = (s) =>
  new Promise((_, reject) =>
    setTimeout(
      () =>
        reject(new Error(`Request took too long! Timeout after ${s} seconds`)),
      s * 1000
    )
  );

const getJson = async (url) => {
  try {
    const res = await Promise.race([timeout(TIMEOUT_SEC), fetch(url)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

const getUrlSearchParam = (query) => {
  const url = new URL(window.location.href);

  if (query) {
    url.searchParams.set("search", query);
    window.history.pushState({}, "", url.href);
    return;
  }
  return url.searchParams.get("search");
};
export { getJson, getUrlSearchParam };
