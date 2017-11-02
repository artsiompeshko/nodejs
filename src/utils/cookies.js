const parseCookies = (cookies) => {
  const result = {};

  if (!cookies) {
    return result;
  }

  const ca = cookies.split(';');

  for (let i = 0; i < ca.length; i += 1) {
    const pair = ca[i].trim().split('=');
    const key = pair[0];
    const value = pair[1];

    result[key] = value;
  }

  return result;
};

export default {
  parseCookies,
};
