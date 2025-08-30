// Widget Script
(async () => {
    const container = document.getElementById("western-webring");
    if (!container) return;

    const stripTrailingSlash = url => url.replace(/\/$/, "") // Strips trailing slashes from URL

    // constant object config for webring properties
    const config = {
        siteURL: stripTrailingSlash(window.location.origin), // compares domain url (path not included) with json url (for ordering)
        jsonURL: "https://jacobl04.github.io/Western-Webrings/webring.json?nocache=" + Date.now(), // Main webrings URL
        hubURL: "https://github.com/JacobL04/Western-Webrings",
        listURL: "https://jacobl04.github.io/Western-Webrings/index.html",
        
        // Customizable Configurations for the Western Webring
        showList: container.dataset.showList === "true",
        showRandom: container.dataset.showRandom === "true",
        randomText: container.dataset.randomText || "random",
        color: container.dataset.color || "#000",
        logo: (() => {
            const raw = container.dataset.logo || "https://jacobl04.github.io/Western-Webrings/assets/western_geese.png";
            return raw.includes("/") ? raw : `https://jacobl04.github.io/Western-Webrings/assets/${raw}`;
        })(),
        stylePreset: container.dataset.style || "default",
        arrowPrev: container.dataset.arrowPrev || "&lt; Prev",
        arrowNext: container.dataset.arrowNext || "Next &gt;"
    }
    console.log(config.jsonURL) // Debug

    try {
        const res = await fetch(config.jsonURL);
        const sites = await res.json();

        const index = sites.findIndex(site => stripTrailingSlash(site.url) === config.siteURL);
        console.log(sites)

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
        <div class="webring-widget webring-style-${config.stylePreset}" style="color: ${config.color}">
            <div class="webring-top-row">
                <a href="${prev.url}" class="webring-prev webring-arrows" title="Previous Site">${config.arrowPrev}</a>
                <a href="${config.hubURL}" title="Western Webring Hub">
                    <img src="${config.logo}" class="webring-logo">
                </a>
                <a href="${next.url}" class="webring-next webring-arrows" title="Next Site">${config.arrowNext}</a>
            </div>
            ${(config.showRandom || config.showList) ? `
            <div class="webring-bottom-row">
                ${config.showList ? `<a href="${config.listURL}" class="webring-list" title="Webring List">[List]</a>` : ""}
                ${config.showRandom ? `<a href="${random.url}" class="webring-random" title="Random Site">${config.randomText}</a>` : ""}
            </div>` : ""}
        </div>
        `;
        

        container.innerHTML = widgetHTML;
    } catch (error) {
        console.error("Webring widget error:", error);
        container.innerHTML = `<div class="webring-widget-error">Failed to load webring.</div>`;
    }
})();
