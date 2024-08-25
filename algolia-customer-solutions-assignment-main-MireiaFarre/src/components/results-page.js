import algoliasearch from "algoliasearch";
import instantsearch from "instantsearch.js";
import {
  searchBox,
  hits,
  pagination,
  refinementList,
} from "instantsearch.js/es/widgets";

import resultHit from "../templates/result-hit";

/**
 * @class ResultsPage
 * @description Instant Search class to display content on main page
 */
class ResultPage {
  constructor() {
    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }

  /**
   * @private
   * Handles creating the search client and creating an instance of instant search
   * @return {void}
   */
  _registerClient() {
    this._searchClient = algoliasearch(
      "SCG9IZ52VQ", // Hardcoded App ID
      "f9f3f6a57a75040e656a642e19b067f4" // Hardcoded API Key
    );

    this._searchInstance = instantsearch({
      indexName: "products", // Hardcoded index name
      searchClient: this._searchClient,
    });
  }

  /**
   * @private
   * Adds widgets to the Algolia instant search instance
   * @return {void}
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
      searchBox({
        container: "#searchbox",
      }),
      hits({
        container: "#hits",
        templates: {
          item: (hit) => {
            // Include queryID in the hit data
            hit.__queryID =
              this._searchInstance.helper.lastResults.queryID || hit.__queryID;
            return resultHit(hit);
          },
        },
      }),
      pagination({
        container: "#pagination",
      }),
      refinementList({
        container: "#brand-facet",
        attribute: "brand",
      }),
      refinementList({
        container: "#categories-facet",
        attribute: "categories",
      }),
    ]);
  }

  /**
   * @private
   * Starts instant search after widgets are registered
   * @return {void}
   */
  _startSearch() {
    this._searchInstance.start();
  }
}

export default ResultPage;
