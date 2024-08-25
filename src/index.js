function displayRecipe(responseText) {
  let recipeElement = document.querySelector("#recipes");
  recipeElement.innerHTML = responseText;
}

function generateRecipe(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions").value;
  let apiKey = "5b0313etca1e9cc9o45e4a08de8f9c3c"; // Use the correct API key for recipes
  let context =
    "You are a culinary expert and love to create recipes. Your mission is to generate a recipe in basic HTML and separate each step with a <br />. Make sure to follow the user instructions. Do not include a title to the recipe. Sign the recipe with 'SheCodes AI' inside a <strong> element at the end of the recipe and NOT at the beginning";
  let prompt = `User instructions: Generate a recipe about ${instructionsInput}`;
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  let recipeElement = document.querySelector("#recipes");
  recipeElement.classList.remove("hidden");
  recipeElement.innerHTML = `<div class="generating">⏳ Generating a recipe about ${instructionsInput}</div>`;

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      displayRecipe(data.answer);
    })
    .catch((error) => {
      console.error("Error fetching recipe:", error);
      recipeElement.innerHTML = `<div class="error">Failed to generate recipe. Please try again later.</div>`;
    });
}

let recipeFormElement = document.querySelector("#recipe-generator-form");
if (recipeFormElement) {
  recipeFormElement.addEventListener("submit", generateRecipe);
} else {
  console.error("Form element not found");
}
