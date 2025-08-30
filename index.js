fetch("https://raw.githubusercontent.com/JacobL04/Western-Webrings/refs/heads/main/webring.json")
    .then(response => response.json())
    .then(data => {
    const container = document.getElementById("profiles");

    data.forEach(profile => {
        const div = document.createElement("div");
        div.classList.add("container");

        div.innerHTML = `
            <h1>${profile.name}</h1>
            <p>${profile.program}</p>
            <p>Graduating Year: <span>${profile.graduating_year}</span></p>
            <p class="description">${profile.description}</p>
            <a href="${profile.url}" target="_blank">Visit my website</a>
        `;

        container.appendChild(div);
    });
    })
    .catch(error => {
        console.error("Error loading JSON:", error);
        document.getElementById("profiles").innerHTML = `<p>Failed to load profiles.</p>`;
});
