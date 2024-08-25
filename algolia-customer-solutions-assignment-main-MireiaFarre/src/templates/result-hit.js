const resultHit = (hit) => {
  console.log("Rendering hit:", hit); // Log hit object to check for objectID

  const objectID = hit.objectID;
  const queryID = hit.__queryID;
  const position = hit.__position;

  // If bjectID is missing, return empty string
  if (!objectID) {
    console.error("objectID is missing for the hit:", hit);
    return "";
  }

  return `
    <div class="result-hit">
      <div class="result-hit__image-container">
        <img class="result-hit__image" src="${hit.image}" alt="${hit._highlightResult.name.value}" />
      </div>
      <div class="result-hit__details">
        <h3 class="result-hit__name">${hit._highlightResult.name.value}</h3>
        <p class="result-hit__price">$${hit.price}</p>
      </div>
      <div class="result-hit__controls">
        <button id="view-item-${objectID}" class="result-hit__view" data-object-id="${objectID}" data-query-id="${queryID}" data-position="${position}">View</button>
        <button id="add-to-cart-${objectID}" class="result-hit__cart" data-object-id="${objectID}" data-price="${hit.price}" data-query-id="${queryID}" data-position="${position}">Add To Cart</button>
        <button id="add-to-wishlist-${objectID}" class="result-hit__wishlist" data-object-id="${objectID}" data-query-id="${queryID}" data-position="${position}">Add To Wishlist</button>
      </div>
    </div>
  `;
};

export default resultHit;
