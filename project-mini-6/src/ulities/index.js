const path = "http://localhost:3001/";
export const get = async (domain) => {
  const response = await fetch(path + domain);
  const result = await response.json();
  return result;
};
export const post = async (domain, data) => {
  const response = await fetch(path + domain, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};
export const patch = async (domain, id, data) => {
  const response = await fetch(path + domain + `/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};
export const del = async (domain, id,data) => {
  const response = await fetch(path + domain + `/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // Thêm header nếu cần
      // Authorization: `Bearer ${token}`, // Thêm token nếu có
    },
    body:JSON.stringify(data)
  });
  const result=response.json();
  return result;
};
