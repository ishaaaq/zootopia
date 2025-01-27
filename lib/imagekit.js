const URL_ENDPOINT = "https://ik.imagekit.io/ua4xfzsoc/";
const PUBLIC_KEY = "public_v6wfYQKjncoL9kCWeSNKqr3b9NQ=";
const AUTH_ENDPOINT = "http://localhost:3000/auth";

import ImageKit from "imagekit-javascript";

const imagekitConfigOptions = { URL_ENDPOINT };
if (PUBLIC_KEY) imagekitConfigOptions.publicKey = PUBLIC_KEY;
if (AUTH_ENDPOINT) imagekitConfigOptions.authenticationEndpoint = AUTH_ENDPOINT;

const imagekit = new ImageKit(imagekitConfigOptions);

const authenticator = async () => {
  try {
    // You can pass headers as well and later validate the request source in the backend, or you can use headers for any other use case.
    const response = await fetch(AUTH_ENDPOINT);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const uploadFile = async (file) => {
  const res = await authenticator();
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file,
        fileName: file.name, //you can change this and generate your own name if required
        ...res,
      },
      function (err, result) {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

export default uploadFile;
