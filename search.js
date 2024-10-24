function highlightText() {
    // Get the search input value
    const searchText = document.getElementById('searchInput').value;

    // Clear previous highlights
    clearHighlights();

    if (searchText) {
        // Get the content where we want to perform the search
        const content = document.getElementById('content').innerHTML;

        // Create a regular expression to match the search text (case-insensitive)
        const regex = new RegExp(searchText, 'gi');

        // Replace matched text with highlighted span
        const newContent = content.replace(regex, (match) => `<span class="highlight">${match}</span>`);

        // Update the content with highlighted text
        document.getElementById('content').innerHTML = newContent;
    }
}

// Function to clear previous highlights
function clearHighlights() {
    // Remove the highlighted spans by replacing them with their text content
    const content = document.getElementById('content');
    content.innerHTML = content.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');
}