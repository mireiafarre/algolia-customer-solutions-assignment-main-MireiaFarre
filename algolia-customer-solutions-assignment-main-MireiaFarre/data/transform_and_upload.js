const fs = require("fs");
const algoliasearch = require("algoliasearch");

const client = algoliasearch("SCG9IZ52VQ", "f9f3f6a57a75040e656a642e19b067f4");
const index = client.initIndex("products");

fs.readFile("products.json", "utf8", (err, data) => {
  if (err) throw err;

  let products = JSON.parse(data);

  // Transform prices for categories containing the word "camera"
  products = products.map((product) => {
    if (Array.isArray(product.categories)) {
      // Check if any category contains the word "camera"
      if (
        product.categories.some((category) =>
          category.toLowerCase().includes("camera")
        )
      ) {
        product.price = Math.floor(product.price * 0.8);
      }
    }
    return product;
  });

  // Upload to Algolia
  index
    .saveObjects(products)
    .then(({ objectIDs }) => {
      console.log("Data uploaded to Algolia with object IDs:", objectIDs);
    })
    .catch((err) => {
      console.error("Error uploading data:", err);
    });
});
