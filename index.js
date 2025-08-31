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

        div.innerHTML = `
            <h2>${profile.name}</h2>
            <div class="meta">
                <span class="program">${profile.program}</span>
                <span class="separator">|</span>
                <span class="grad-year">Class of ${profile.graduating_year}</span>
            </div>
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
