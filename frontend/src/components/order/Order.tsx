function Order({ apiUrl }: any) {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      customerId: formData.get("customerId"),
      productId: formData.get("productId"),
    };
    console.log(`payload ${JSON.stringify(payload, null, 2)} apiUrl ${apiUrl}`);
    try {
      fetch(`${apiUrl}/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="customerId" placeholder="Customer ID" />
      <input type="text" name="productId" placeholder="Product ID" />
      <button type="submit">Submit</button>
    </form>
  );
}
export default Order;
// test
