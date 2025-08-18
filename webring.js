// Widget Script
(async () => {
    const container = document.getElementById("western-webring");
    if (!container) return;

    const stripTrailingSlash = url => url.replace(/\/$/, "") // Strips trailing slashes from URL

    // constant object config for webring properties
    const config = {
        siteURL: stripTrailingSlash(window.location.origin), // compares domain url (path not included) with json url (for ordering)
        jsonURL: "https://jacobl04.github.io/Western-Webrings/webring.json", // Main webrings URL
        hubURL: "https://github.com/JacobL04/Western-Webrings",
        
        // Customizable Configurations for the Western Webring
        showRandom: container.dataset.showRandom === "true",
        color: container.dataset.color || "#000",
        logo: container.dataset.logo || "assets/western.png",
        style: container.dataset.style || "default",
    }

    // Debugging here

    console.log(config.jsonURL)

    // Debugging ends

    try {
        const res = await fetch(config.jsonURL);
        const sites = await res.json();

        const index = sites.findIndex(site => stripTrailingSlash(site.url) === config.siteURL);
        if (index === -1) {
            container.innerHTML = `<div class="webring-widget-error">Site not found in webring.</div>`;
            return;
        }

        /* 
            prev: goes to previous site in index
            next: goes to the next site in index
            random: goes to a random site in index
        */
        const prev = sites[(index - 1 + sites.length) % sites.length];
        const next = sites[(index + 1) % sites.length];
        const random = sites[Math.floor(Math.random() * sites.length)];

        /* webring html */
        const widgetHTML = `
        <div class="webring-widget" style="color: ${config.color}">
            <a href="${prev.url}" class="webring-prev webring-arrows" title="Previous Site" >⇦</a>
            <a href="${config.hubURL}" class="webring-logo" title="Western Webring Hub"><img src="${config.logo}" style="height:30px"></a>
            ${config.showRandom ? `<a href="${random.url}" class="webring-random" title="Random Site">?</a>` : ""}
            <a href="${next.url}" class="webring-next webring-arrows" title="Next Site">⇨</a>
        </div>
        `;

        container.innerHTML = widgetHTML;
    } catch (error) {
        console.error("Webring widget error:", error);
        container.innerHTML = `<div class="webring-widget-error">Failed to load webring.</div>`;
    }
})();
