# Western-Webrings
**Western Webrings** is a lightweight and customizable webring widget that connects students' (and alumni) websites from western university. Inspired by the charm of early internet, webrings help fosters a tighter sense of community by connecting peers through their individual websites which encourages curiosity, discovery and can create meaningful connection across the web.

## What is a webring?
A **webring** is a collection of websites linked in a circular structure. Each site has a *previous* and *next* buttons which links to other members of the ring encouraging exploration and connection across personal sites.

## How to Join
1. Fork or clone this repository.
2. Add your entry at the **bottom** of the `webring.json` in the following format:
```json
{
    "name": "Enter Your Name",
    "url": "https://your_website.here",
    "graduating_year": "20xx",
    "program": "Your current enrolled program",
    "description": "A short description of your website"
}
```
3. Open a pull request with your addition.
4. Once accepted, embed the webring widget on your website using the provided code snippet.

## Embedding the Widget
```html
<link rel="stylesheet" href="https://jacobl04.github.io/Western-Webrings/webring.css">

<div id="western-webring"
    data-style="default"
    data-color="blue"
    data-show-list="true"
    data-show-random="true"
    data-random-text="[?]"
    data-arrow-prev="&lt; Prev"
    data-arrow-next="Next &gt;"
    data-logo="western_purple.png"
    >
</div>

<script src="https://jacobl04.github.io/Western-Webrings/webring.js" async></script>
```
- I highly recommend to customize the webrings by downloading the `webring.css` and `webring.js` script to integrate it into your website.

### Widget Properties
| Attribute          | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| `data-style`       | Visual style preset (`default`, `minimal`). |
| `data-color`       | Text color for arrows (`blue`, `#ff6600`, etc.). |
| `data-show-list`   | Toggle "list" visibility button in the bottom row (`true` or `false`). |
| `data-show-random` | Toggle "random" visibility button in the bottom row (`true` or `false`). |
| `data-random-text` | Change text or symbol used for the random link (e.g. `?`, `[?]`, `random`). |
| `data-arrow-prev`  | Change text for the "previous" button. |
| `data-arrow-next`  | Change text for the "Next" button. |
| `data-logo`        | Chnage logo image file or URL shown in the center of the widget. |

## FAQ

### How do I join the webring?

Add your site to the `webring.json` file using the format provided in this README, then submit a pull request.


### Can I customize the widget style?

Yes! Use the `data-style` attribute (e.g., `default`, `minimal`) for fast styling or you can also override styles with your own CSS by downloading the scripts and modifying it locally.


### Does my site need to use any specific platform?

No. As long as your site supports HTML and JS, you can embed the widget.


### How are next/prev sites calculated?

The webring reads from the `webring.json` file, checks if you are indexed in the JSON file, then finds your site’s index and then calculates your neighbors (previous index and next index). Like an array.


### Can I use a custom logo?

Yes! But try keeping it somewhat Western themed. Use the `data-logo` attribute to point to an image file (e.g. `data-logo="assets/mylogo.png"`).

Got other questions? Send me a message on Discord: `neighbourjack`

## Further Updates and possible features
1. Server-side redirect links
a. Instead of fetching JSON in the browser, a redirect system like: `https://webring.com/next?site=johndoe.com` would handle prev/next on the server side for faster performance.
2. Adding more default preset styles
3. Theming with custom CSS variables