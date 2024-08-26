import searchInsights from "search-insights";
import ResultsPage from "./components/results-page";

function getUserToken() {
  let userToken = localStorage.getItem("userToken");
  if (!userToken) {
    userToken = "user-" + Date.now();
    localStorage.setItem("userToken", userToken);
  }
  return userToken;
}

const userToken = getUserToken();

console.log("Initializing Algolia Insights...");
searchInsights("init", {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY,
  userToken: userToken,
  useCookie: true,
  debug: true,
});

console.log("Algolia Insights initialized with userToken:", userToken);

// Track "View" event
function trackProductView(objectID) {
  console.log(`Sending Product Viewed event for objectID: ${objectID}`);
  searchInsights("viewedObjectIDs", {
    eventName: "Product Viewed",
    index: process.env.ALGOLIA_INDEX,
    objectIDs: [objectID],
  });
}

// Track "Click" event
function trackProductClick(objectID, queryID, position) {
  console.log(
    `Sending Product Clicked event for objectID: ${objectID}, queryID: ${queryID}, position: ${position}`
  );
  searchInsights("clickedObjectIDsAfterSearch", {
    eventName: "Product Clicked",
    index: process.env.ALGOLIA_INDEX,
    queryID: queryID,
    objectIDs: [objectID],
    positions: [position],
  });
}

// Track "Add-to-cart" event
function trackAddToCart(objectID, queryID, price) {
  console.log(
    `Sending Add to Cart event for objectID: ${objectID}, queryID: ${queryID}, price: ${price}`
  );
  searchInsights("convertedObjectIDsAfterSearch", {
    eventName: "Product Added to Cart",
    index: process.env.ALGOLIA_INDEX,
    queryID: queryID,
    objectIDs: [objectID],
    revenue: price.toFixed(2),
  });
}

// Track "Add-to-wishlist" event
function trackAddToWishlist(objectID, queryID) {
  console.log(
    `Sending Add to Wishlist event for objectID: ${objectID}, queryID: ${queryID}`
  );
  searchInsights("convertedObjectIDsAfterSearch", {
    eventName: "Product Added to Wishlist",
    index: process.env.ALGOLIA_INDEX,
    queryID: queryID,
    objectIDs: [objectID],
  });
}

// Expose functions to the global scope for debugging in the console
window.trackProductView = trackProductView;
window.trackProductClick = trackProductClick;
window.trackAddToCart = trackAddToCart;
window.trackAddToWishlist = trackAddToWishlist;

// Attach event listeners for tracking insights
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed. Setting up event delegation.");

  const hitsContainer = document.querySelector("#hits");

  if (!hitsContainer) {
    console.error("#hits container not found in the DOM.");
    return;
  }

  console.log("Attaching event listener to #hits container.");

  hitsContainer.addEventListener("click", (event) => {
    console.log("Click event detected within #hits container.");

    const viewButton = event.target.closest(".result-hit__view");
    const cartButton = event.target.closest(".result-hit__cart");
    const wishlistButton = event.target.closest(".result-hit__wishlist");

    if (viewButton) {
      console.log("View button clicked.");
      const objectID = viewButton.getAttribute("data-object-id");
      const queryID = viewButton.getAttribute("data-query-id");
      const position = parseInt(viewButton.getAttribute("data-position"), 10);

      if (objectID && queryID) {
        trackProductView(objectID);
        trackProductClick(objectID, queryID, position);
      } else {
        console.error("Object ID or Query ID not found on 'View' button.");
      }
    }

    if (cartButton) {
      console.log("Cart button clicked.");
      const objectID = cartButton.getAttribute("data-object-id");
      const price = parseFloat(cartButton.getAttribute("data-price"));
      const queryID = cartButton.getAttribute("data-query-id");

      console.log({ objectID, price, queryID });

      if (objectID && price && queryID) {
        trackAddToCart(objectID, queryID, price);
      } else {
        console.error(
          "Object ID, Price, or Query ID not found on 'Add to Cart' button."
        );
      }
    }

    if (wishlistButton) {
      console.log("Wishlist button clicked.");
      const objectID = wishlistButton.getAttribute("data-object-id");
      const queryID = wishlistButton.getAttribute("data-query-id");

      console.log({ objectID, queryID });

      if (objectID && queryID) {
        trackAddToWishlist(objectID, queryID);
      } else {
        console.error(
          "Object ID or Query ID not found on 'Add to Wishlist' button."
        );
      }
    }
  });
});

new ResultsPage();
