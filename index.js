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
