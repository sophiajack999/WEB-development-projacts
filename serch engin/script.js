function search() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const results = trie.startsWith(searchInput);

  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  if (results.length > 0) {
    results.forEach((result) => {
      const div = document.createElement("div");
      div.className = "result-item";
      div.textContent = result;
      searchResults.appendChild(div);
    });
  } else {
    searchResults.textContent = "No results found.";
  }
}
