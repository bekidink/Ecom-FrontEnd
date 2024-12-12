export const DisplayPriceInRupees = (price:any) => {
  return new Intl.NumberFormat("en-USA", {
    style: "currency",
    currency: "USD",
  }).format(price);
};
