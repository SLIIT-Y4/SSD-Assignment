const token = JSON.parse(sessionStorage.getItem("token"));

export const headers = {
  authorization: `Bearer ${process.env.API_TOKEN}`,
  type: token && token.type,
};
