import React, { useState } from "react";

function Download({ apiUrl }: { apiUrl: string }) {
  const [fileName, setFileName] = useState("");

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

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  return (
    <form onSubmit={handleDownload}>
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Enter fileName"
        required
      />
      <button type="submit">Download</button>
    </form>
  );
}

export default Download;
