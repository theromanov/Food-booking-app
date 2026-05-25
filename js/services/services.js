"use strict";

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  });

  if (!response.ok) {
    throw new Error(`Відбулася помилка: ${response.status}`);
  } else {
    return await response.json();
  }
};

const getResource = async (url) => {
  const data = await fetch(url);

  if (!data.ok) {
    throw new Error(`Відбулася помилка: ${data.status}`);
  }

  return await data.json();
};

export { postData };
export { getResource };
