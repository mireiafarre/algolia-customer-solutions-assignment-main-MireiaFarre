import searchInsights from "search-insights";
import ResultsPage from "./components/results-page";

// Function to generate or retrieve a user token
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
  appId: "SCG9IZ52VQ", // Replace with your Algolia Application ID
  apiKey: "06e9c9629db2e8f4b1c2c571d1d64c08", // Replace with your Algolia Search API Key
  userToken: userToken,
  useCookie: true,
  debug: true, // Enable debug mode for more detailed logs
});

console.log("Algolia Insights initialized with userToken:", userToken);

// Function to track a product view event
function trackProductView(objectID) {
  console.log(`Sending Product Viewed event for objectID: ${objectID}`);
  searchInsights("viewedObjectIDs", {
    eventName: "Product Viewed",
    index: "products", // Replace with your index name
    objectIDs: [objectID],
  });
}

// Function to track a product click event
function trackProductClick(objectID, queryID, position) {
  console.log(
    `Sending Product Clicked event for objectID: ${objectID}, queryID: ${queryID}, position: ${position}`
  );
  searchInsights("clickedObjectIDsAfterSearch", {
    eventName: "Product Clicked",
    index: "products", // Replace with your index name
    queryID: queryID,
    objectIDs: [objectID],
    positions: [position], // Position in the search results
  });
}

// Function to track add-to-cart event
function trackAddToCart(objectID, queryID, price) {
  console.log(
    `Sending Add to Cart event for objectID: ${objectID}, queryID: ${queryID}, price: ${price}`
  );
  searchInsights("convertedObjectIDsAfterSearch", {
    eventName: "Product Added to Cart",
    index: "products", // Replace with your index name
    queryID: queryID,
    objectIDs: [objectID],
    revenue: price.toFixed(2), // Ensure the price is a string with two decimal places
  });
}

// **New** Function to track add-to-wishlist event
function trackAddToWishlist(objectID, queryID) {
  console.log(
    `Sending Add to Wishlist event for objectID: ${objectID}, queryID: ${queryID}`
  );
  searchInsights("convertedObjectIDsAfterSearch", {
    eventName: "Product Added to Wishlist",
    index: "products", // Replace with your index name
    queryID: queryID,
    objectIDs: [objectID],
  });
}

// Function to manually trigger a test event for debugging
function trackManualProductView() {
  searchInsights("viewedObjectIDs", {
    eventName: "Manual Test - Product Viewed",
    index: "products",
    objectIDs: ["manual-test-object-id"],
  });
  console.log("Manual Product Viewed event triggered.");
}

// Expose functions to the global scope for debugging in the console
window.trackManualProductView = trackManualProductView;
window.trackProductView = trackProductView;
window.trackProductClick = trackProductClick;
window.trackAddToCart = trackAddToCart;
window.trackAddToWishlist = trackAddToWishlist; // **Expose the new function**

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
    console.log("Click event detected within #hits container."); // Added debugging

    const viewButton = event.target.closest(".result-hit__view");
    const cartButton = event.target.closest(".result-hit__cart");
    const wishlistButton = event.target.closest(".result-hit__wishlist"); // **Detect wishlist button**

    if (viewButton) {
      console.log("View button clicked."); // Added debugging
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
      console.log("Cart button clicked."); // Added debugging
      const objectID = cartButton.getAttribute("data-object-id");
      const price = parseFloat(cartButton.getAttribute("data-price"));
      const queryID = cartButton.getAttribute("data-query-id");

      console.log({ objectID, price, queryID }); // Log the values before tracking

      if (objectID && price && queryID) {
        trackAddToCart(objectID, queryID, price);
      } else {
        console.error(
          "Object ID, Price, or Query ID not found on 'Add to Cart' button."
        );
      }
    }

    if (wishlistButton) {
      console.log("Wishlist button clicked."); // **Added debugging**
      const objectID = wishlistButton.getAttribute("data-object-id");
      const queryID = wishlistButton.getAttribute("data-query-id");

      console.log({ objectID, queryID }); // **Log the values before tracking**

      if (objectID && queryID) {
        trackAddToWishlist(objectID, queryID); // **Trigger wishlist event tracking**
      } else {
        console.error(
          "Object ID or Query ID not found on 'Add to Wishlist' button."
        );
      }
    }
  });
});

// Initialize the search and other components
new ResultsPage();
