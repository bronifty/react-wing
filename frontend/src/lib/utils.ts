const pipe =
  (...funcs: any) =>
  (initialVal: any) =>
    funcs.reduce((acc: any, fun: any) => fun(acc), initialVal);
const curry =
  (func: any) =>
  (...args: any) => {
    if (args.length >= func.length) {
      return func.apply(null, args);
    }
    return func.bind(null, ...args);
  };
const split = curry((delimiter: any, string: any) => string.split(delimiter));
const map = curry((func: any, arr: any) => arr.map(func));
const join = curry((delimiter: any, arr: any) => arr.join(delimiter));
const util = (string: any) => string.toLowerCase();
export const slugify = pipe(split(" "), map(util), join("-"));
// usage
// console.log(slugify("Super Burger with Fries and Coke"));

export const readFileAsDataURL = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const handleFileSubmitAsJson = async (payload: any, uploadUrl: any) => {
  try {
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        file: await readFileAsDataURL(payload.file),
        fileName: slugify(payload.file.name),
        mimeType: encodeURIComponent(payload.file.type),
        caption: payload.caption,
      }),
    });
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.log(error);
  } finally {
  }
};

// export const fileData = Buffer.from(
//   jsonData.file.replace(/^data:.+;base64,/, ""),
//   "base64"
// );

export const createImageFromBase64 = (jsonData: any) => {
  console.log(`in utils createImageFromBase64; jsonData: ${jsonData}`);

  // Remove the data URL prefix
  const base64String = jsonData.file.replace(/^data:.+;base64,/, "");

  // Convert base64 to binary
  const binaryString = atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Create a Blob object from the binary data
  const blob = new Blob([bytes.buffer], { type: jsonData.mimeType });

  // Create an Object URL from the blob
  const imageUrl = URL.createObjectURL(blob);

  // Create an image element and set its source to the Object URL
  const img = new Image();
  img.src = imageUrl;

  // Append the image to the document body
  document.body.appendChild(img);
};

// // Usage
// const jsonData = {
//   file: "data:image/png;base64,...", // Replace with your actual base64 string
// };
// createImageFromBase64(jsonData.file);
