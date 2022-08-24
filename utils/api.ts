const init: any = {};

export const get = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    ...init,
  });
  return response.json();
};

const fetcherPost = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: "POST",
    ...init,
    body: JSON.stringify(data),
  });
  return response.json();
};

export const post = (params: any) => (url: string) => fetcherPost(url, params);
