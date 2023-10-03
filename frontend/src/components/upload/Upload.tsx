// import React from "react";
import { handleFileSubmitAsJson } from "../../lib/utils.ts";
function UploadWing({ apiUrl }: any) {
  console.log(`apiUrl ${JSON.stringify(apiUrl, null, 2)}`);

  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const file = formData.get("file");
    if (!file) {
      return null;
    }
    const uploadUrl = `${apiUrl}/upload`;
    await handleFileSubmitAsJson(file, uploadUrl);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>UploadWing</label>
      <input type="file" name="file" />
      <button type="submit">Submit</button>
    </form>
  );
}
export default UploadWing;
