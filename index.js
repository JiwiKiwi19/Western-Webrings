// fetch("https://raw.githubusercontent.com/JacobL04/Western-Webrings/refs/heads/main/webring.json")
fetch("webring.json")
    .then(response => response.json())
    .then(data => {
    const container = document.getElementById("profiles");
    const counter = document.getElementById("counter");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    
    prev.href = data[data.length - 1].url;
    next.href = data[0].url;

    console.log("total of " + data.length + " profiles found")
    counter.textContent = data.length;

    data.forEach(profile => {
        const div = document.createElement("div");
        div.classList.add("profile-card");

        // Set background (either color or image)
        if (profile.background.startsWith("http")) {
            // It's an image URL
            div.style.setProperty('--background-image', `url(${profile.background})`);
        } 
        else if (profile.background.startsWith("#")) {
            div.style.backgroundColor = profile.background
        }
        else {
            div.style.backgroundColor = "#f9f9f9";
        }

        // Apply custom text color if specified
        div.style.color = profile.textColor || "#000";

        div.innerHTML = `
            <h2 style="font-family: ${profile.fontFamily || 'BentonSans Regular'}, sans-serif; color: ${profile.nameColor || 'black'};">${profile.name}</h2>
            <div class="meta">
                <span class="program" style="color: ${profile.programColor || 'black'};">${profile.program}</span>
                <span class="separator">|</span>
                <span class="grad-year" style="color: ${profile.gradYearColor || '#666'};">Class of ${profile.graduating_year}</span>
            </div>
            <p class="description" style="color: ${profile.descriptionColor || '#818284'};">${profile.description}</p>
            <a href="${profile.url}" target="_blank" style="color: ${profile.urlColor || '#007bff'};">${profile.urlText || "Visit my website"}</a>
        `;

        container.appendChild(div);
    });
    })
    .catch(error => {
        console.error("Error loading JSON:", error);
        document.getElementById("profiles").innerHTML = `<p>Failed to load profiles.</p>`;
});

// Live Preview Customization Tool
document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("name");
  const urlInput = document.getElementById("url");
  const programInput = document.getElementById("program");
  const urlTextInput = document.getElementById("urlText");
  const backgroundColorInput = document.getElementById("backgroundColor");
  const backgroundImageUrlInput = document.getElementById("backgroundImageUrl");
  const fontFamilyInput = document.getElementById("fontFamily");
  const nameColorInput = document.getElementById("nameColor");
  const programColorInput = document.getElementById("programColor");
  const descriptionInput = document.getElementById("description");
  const graduatingYearInput = document.getElementById("graduatingYear");

  // New Color Inputs
  const urlColorInput = document.getElementById("urlColor");
  const descriptionColorInput = document.getElementById("descriptionColor");
  const gradYearColorInput = document.getElementById("gradYearColor");

  const previewName = document.getElementById("previewName");
  const previewProgram = document.getElementById("previewProgram");
  const previewGradYear = document.getElementById("previewGradYear");
  const previewDescription = document.getElementById("previewDescription");
  const previewUrl = document.getElementById("previewUrl");

  const generateJSON = document.getElementById("generateJSON");
  const jsonOutput = document.getElementById("jsonOutput");

  // Switch between color and image input
  const backgroundColorOption = document.getElementById("backgroundColorOption");
  const backgroundImageOption = document.getElementById("backgroundImageOption");

  backgroundColorOption.addEventListener("change", toggleBackgroundInput);
  backgroundImageOption.addEventListener("change", toggleBackgroundInput);

  // Initially hide the input fields for background color and image
  function toggleBackgroundInput() {
    if (backgroundColorOption.checked) {
      backgroundColorInput.style.display = "inline-block";
      backgroundImageUrlInput.style.display = "none";
    } else if (backgroundImageOption.checked) {
      backgroundColorInput.style.display = "none";
      backgroundImageUrlInput.style.display = "inline-block";
    }
    updatePreview(); // To update preview after toggle
  }

  // Update Preview
  function updatePreview() {
    // Name
    previewName.textContent = nameInput.value || "Enter Your Name";

    // URL
    previewUrl.href = urlInput.value || "#";
    previewUrl.textContent = urlInput.value ? (urlTextInput.value || "Visit my website") : "";  // Default URL Title

    // Program
    previewProgram.textContent = programInput.value || "Program";

    // Graduating Year
    previewGradYear.textContent = `Class of ${graduatingYearInput.value || "202x"}`;

    // Description
    previewDescription.textContent = descriptionInput.value || "Short description of your website";

    // Background and Font
    if (backgroundColorOption.checked) {
      const backgroundColor = backgroundColorInput.value || "#f9f9f9";
      document.getElementById("profileCardPreview").style.backgroundColor = backgroundColor;
      document.getElementById("profileCardPreview").style.backgroundImage = ""; // Clear background image if color is selected
    } 
    else if (backgroundImageOption.checked) {
      const backgroundImage = backgroundImageUrlInput.value;
      if (backgroundImage && backgroundImage.startsWith("http")) {
        document.getElementById("profileCardPreview").style.backgroundImage = `url(${backgroundImage})`;
        document.getElementById("profileCardPreview").style.backgroundColor = ""; // Clear background color if image is selected
      } 
      else {
        document.getElementById("profileCardPreview").style.backgroundImage = ""; // No image if the URL is not valid
      }
    }

    // Font Family
    document.getElementById("profileCardPreview").style.fontFamily = fontFamilyInput.value;

    // Text Colors
    previewName.style.color = nameColorInput.value;
    previewProgram.style.color = programColorInput.value;
    previewGradYear.style.color = gradYearColorInput.value || "#666"; // Default to gray if no color is selected
    previewDescription.style.color = descriptionColorInput.value || "#818284"; // Default description color
    previewUrl.style.color = urlColorInput.value || "#007bff"; // Default URL color
  }

  // Generate JSON
  generateJSON.addEventListener("click", () => {
    const profileData = {
      name: nameInput.value || "Enter Your Name", // Default value
      url: urlInput.value || "#", // Default value
      urlText: urlTextInput.value || "☆｡･ﾟ✧ My Website ✧･｡☆", // Default URL title
      graduating_year: graduatingYearInput.value || "202x", // Default value
      program: programInput.value || "Program", // Default program
      description: descriptionInput.value || "Short description of your website", // Default description
      background: backgroundColorOption.checked ? backgroundColorInput.value : backgroundImageUrlInput.value, // Either color or image
      nameColor: nameColorInput.value || "#000000", // Default name color
      programColor: programColorInput.value || "#000000", // Default program color
      gradYearColor: gradYearColorInput.value || "#666", // Default graduating year color
      descriptionColor: descriptionColorInput.value || "#818284", // Default description color
      urlColor: urlColorInput.value || "#007bff", // Default URL color
      fontFamily: fontFamilyInput.value || "BentonSans", // Default font
    };

    // Output JSON
    jsonOutput.textContent = JSON.stringify(profileData, null, 2);
  });

  // Event Listeners for inputs
  nameInput.addEventListener("input", updatePreview);
  urlInput.addEventListener("input", updatePreview);
  programInput.addEventListener("input", updatePreview);
  urlTextInput.addEventListener("input", updatePreview);
  backgroundColorInput.addEventListener("input", updatePreview);
  backgroundImageUrlInput.addEventListener("input", updatePreview);
  fontFamilyInput.addEventListener("change", updatePreview);
  nameColorInput.addEventListener("input", updatePreview);
  programColorInput.addEventListener("input", updatePreview);
  descriptionInput.addEventListener("input", updatePreview);
  graduatingYearInput.addEventListener("input", updatePreview);

  // Event Listeners for Color Inputs
  urlColorInput.addEventListener("input", updatePreview);
  descriptionColorInput.addEventListener("input", updatePreview);
  gradYearColorInput.addEventListener("input", updatePreview);

  toggleBackgroundInput();
  updatePreview();
});


// document.addEventListener("DOMContentLoaded", () => {
//   const nameInput = document.getElementById("name");
//   const urlInput = document.getElementById("url");
//   const programInput = document.getElementById("program");
//   const urlTextInput = document.getElementById("urlText");
//   const backgroundInput = document.getElementById("background");
//   const fontFamilyInput = document.getElementById("fontFamily");
//   const nameColorInput = document.getElementById("nameColor");
//   const programColorInput = document.getElementById("programColor");
//   const descriptionInput = document.getElementById("description");
//   const graduatingYearInput = document.getElementById("graduatingYear");

//   // New Color Inputs
//   const urlColorInput = document.getElementById("urlColor");
//   const descriptionColorInput = document.getElementById("descriptionColor");
//   const gradYearColorInput = document.getElementById("gradYearColor");

//   const previewName = document.getElementById("previewName");
//   const previewProgram = document.getElementById("previewProgram");
//   const previewGradYear = document.getElementById("previewGradYear");
//   const previewDescription = document.getElementById("previewDescription");
//   const previewUrl = document.getElementById("previewUrl");

//   const generateJSONBtn = document.getElementById("generateJSONBtn");
//   const jsonOutput = document.getElementById("jsonOutput");

//   // Update Preview
//   function updatePreview() {
//     // Name
//     previewName.textContent = nameInput.value || "Enter Your Name";

//     // URL
//     previewUrl.href = urlInput.value || "#";
//     previewUrl.textContent = urlInput.value ? (urlTextInput.value || "Visit my website") : "";  // Default URL Title

//     // Program
//     previewProgram.textContent = programInput.value || "Program";

//     // Graduating Year
//     previewGradYear.textContent = `Class of ${graduatingYearInput.value || "202x"}`;

//     // Description
//     previewDescription.textContent = descriptionInput.value || "Short description of your website";

//     // Background and Font
//     const backgroundValue = backgroundInput.value;
//     if (backgroundValue.startsWith("http")) {
//       document.getElementById("profileCardPreview").style.backgroundImage = `url(${backgroundValue})`;
//     } else if (backgroundValue.startsWith("#")) {
//       document.getElementById("profileCardPreview").style.backgroundColor = backgroundValue;
//     } else {
//       document.getElementById("profileCardPreview").style.background = "#f9f9f9";
//     }

//     // Font Family
//     document.getElementById("profileCardPreview").style.fontFamily = fontFamilyInput.value;

//     // Text Colors
//     previewName.style.color = nameColorInput.value;
//     previewProgram.style.color = programColorInput.value;
//     previewGradYear.style.color = gradYearColorInput.value || "#666"; // Default to gray if no color is selected
//     previewDescription.style.color = descriptionColorInput.value || "#818284"; // Default description color
//     previewUrl.style.color = urlColorInput.value || "#007bff"; // Default URL color
//   }

//   // Generate JSON
//   generateJSONBtn.addEventListener("click", () => {
//     const profileData = {
//       name: nameInput.value || "Enter Your Name", // Default value
//       url: urlInput.value || "#", // Default value
//       urlText: urlTextInput.value || "☆｡･ﾟ✧ My Website ✧･｡☆", // Default URL title
//       graduating_year: graduatingYearInput.value || "202x", // Default value
//       program: programInput.value || "Program", // Default program
//       description: descriptionInput.value || "Short description of your website", // Default description
//       background: backgroundInput.value || "#f9f9f9", // Default background color
//       nameColor: nameColorInput.value || "#000000", // Default name color
//       programColor: programColorInput.value || "#000000", // Default program color
//       gradYearColor: gradYearColorInput.value || "#666", // Default graduating year color
//       descriptionColor: descriptionColorInput.value || "#818284", // Default description color
//       urlColor: urlColorInput.value || "#007bff", // Default URL color
//       fontFamily: fontFamilyInput.value || "BentonSans", // Default font
//     };

//     // Output JSON
//     jsonOutput.textContent = JSON.stringify(profileData, null, 2);
//   });

//   // Event Listeners for inputs
//   nameInput.addEventListener("input", updatePreview);
//   urlInput.addEventListener("input", updatePreview);
//   programInput.addEventListener("input", updatePreview);
//   urlTextInput.addEventListener("input", updatePreview);
//   backgroundInput.addEventListener("input", updatePreview);
//   fontFamilyInput.addEventListener("change", updatePreview);
//   nameColorInput.addEventListener("input", updatePreview);
//   programColorInput.addEventListener("input", updatePreview);
//   descriptionInput.addEventListener("input", updatePreview);
//   graduatingYearInput.addEventListener("input", updatePreview);

//   // New Event Listeners for Color Inputs
//   urlColorInput.addEventListener("input", updatePreview);
//   descriptionColorInput.addEventListener("input", updatePreview);
//   gradYearColorInput.addEventListener("input", updatePreview);

//   // Initial Update
//   updatePreview();
// });

