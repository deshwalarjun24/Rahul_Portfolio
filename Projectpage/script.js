// Get the button element
const button = document.getElementById("changeContentButton");

// Add an event listener to the button
button.addEventListener("click", function() {
    // Change the content when the button is clicked
    document.querySelector(".content p").innerHTML = "You clicked the button! Here's some new content.";
});
