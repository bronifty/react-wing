import React, { useState } from "react";
// import { createImageFromBase64 } from "../../../../lib/utils.ts";

function Download({ apiUrl }: { apiUrl: string }) {
  const [fileName, setFileName] = useState("");
  const [imgElementSrc, setImgElementSrc] = React.useState("");
  const [videoElementSrc, setVideoElementSrc] = React.useState("");

  const handleDownload = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`${apiUrl}/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonData = await response.json();

    // // Usage
    // const jsonData = {
    //   file: "data:image/png;base64,...", // Replace with your actual base64 string
    // };
    console.log(
      `in DownloadBase64 component sending to createImageFromBase64; jsonData: ${JSON.stringify(
        jsonData,
        null,
        2
      )}`
    );
    // createImageFromBase64(jsonData);

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

    // // Create an Object URL from the blob
    // const imageUrl = URL.createObjectURL(blob);

    // // Create an image element and set its source to the Object URL
    // const img = new Image();
    // img.src = imageUrl;

    // // Append the image to the document body
    // document.body.appendChild(img);

    // const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    setImgElementSrc(url);
    setVideoElementSrc(url);
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute("download", fileName);
    // document.body.appendChild(link);
    // link.click();
    // link.parentNode?.removeChild(link);
  };

  return (
    <>
      <form onSubmit={handleDownload}>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Enter fileName"
          required
        />
        <button type="submit">DownloadBase64</button>
      </form>
      {imgElementSrc && (
        <img className="mt-5 h-48 w-48 object-cover" src={imgElementSrc} />
      )}
      {videoElementSrc && (
        <video
          className="mt-5 h-48 w-48 object-cover"
          src={videoElementSrc}
          controls
        />
      )}
    </>
  );
}

export default Download;
