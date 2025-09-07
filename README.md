# Western Webrings Widget
**Western Webrings** is a lightweight, customizable webring widget designed for students, alumni and professors of Western University to connect their personal websites. This is a student-led initiative inspired by the early internet era, aiming to foster a closer sense of community through shared web spaces. The goal is to encourage exploration, discovery and meaningful connections within the Western University community.
<br><br>
You can visit our live site [here](https://jacobl04.github.io/Western-Webrings/) to see current members.

## What is a webring?
A **webring** is a collection of websites linked in a circular structure. Each site has a *`previous`* and *`next`* buttons which links to other members of the ring encouraging exploration and connection across personal sites.

## How to Join
1. Insert the webring widget into your website (see **[Embedding the Widget](#Embedding-the-Widget)** section for details). The widget can be added to your webpage's footer, sidebar or wherever you prefer.
2. Before you get accepted you'll see the message `"Site not found in webring."` which is normal and indicates you've sucessfully embedded the widget
3. Fork or clone this repository.
4. Add your entry at the **bottom** of the `webring.json` in the following format:
```json
{
    "name": "Enter Your Name",
    "url": "https://your_website.here",
    "urlText": "☆｡･ﾟ✧ My Website ✧･｡☆",
    "graduating_year": "20xx",
    "program": "Current enrolled program",
    "description": "Short description of your website",
    "background": "https://background_img.gif or #00b34d",
    "nameColor": "white", 
    "programColor": "white",
    "gradYearColor": "white",
    "descriptionColor": "#dedede",
    "urlColor": "white",
    "fontFamily": "monospace"
}
```
5. Open a pull request with your addition. 
6. Once accepted, the widget will update and you'll be officially part of the webring! 
### webring.json customize format
| Property            | Description                                                      |
| ------------------- | ---------------------------------------------------------------- |
| `"name"`            | Your name or alias. Example: `"John Doe"`.|
| `"url"`             | URL to your website. Example: `"https://your_website.here"`.|
| `"urlText"`         | Text to display for the website link. Example: `"Click Me!"`.|
| `"graduating_year"` | Your graduating/graduated year. Example: `"2020"`.|
| `"program"`         | The program you are enrolled in. Example: `"Health Science"`.|
| `"description"`     | A short description of your website. Example: `"My personal blog.."`.|
| `"background"`      | Background image URL or color. Example: `"https://background_img.gif"` or `"#00b34d"`.|
| `"nameColor"`       | Text color for the name. Example: `"white"`.|
| `"programColor"`    | Text color for the program. Example: `"white"`.|
| `"gradYearColor"`   | Text color for the graduation year. Example: `"white"`.|
| `"descriptionColor"`| Text color for the description. Example: `"#dedede"`.|
| `"urlColor"`        | Text color for the URL. Example: `"white"`.|
| `"fontFamily"`      | Font family used in the display. Example: `"arial"`.|

**Note**: You can leave entries blank by having the values be `""`. By default, all the color keys will have a default value if all of them have a blank entry. This will display the default profile card appearance.

## Embedding the Widget
You can quickly embed the webring widget into your website by adding the following components to your HTML file. The widget allows for basic customization, but full customization options are available.

### HTML Embedding
```html
<link rel="stylesheet" href="https://jacobl04.github.io/Western-Webrings/webring.css">

<!-- Default Style -->
<div id="western-webring"
    data-style="default"
    data-color="blue"
    data-show-list="true"
    data-show-random="true"
    data-random-text="[?]"
    data-arrow-prev="&lt; Prev"
    data-arrow-next="Next &gt;"
    >
</div>

<script src="https://jacobl04.github.io/Western-Webrings/webring.js" async></script>
```
### React (JSX) Embedding
```jsx
import React, { useEffect } from 'react';

const WesternWebring = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://jacobl04.github.io/Western-Webrings/webring.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="western-webring"
      data-style="default"
      data-color="blue"
      data-show-list="true"
      data-show-random="true"
      data-random-text="[?]"
      data-arrow-prev="< Prev"
      data-arrow-next="Next >"
    ></div>
  );
};

export default WesternWebring;
```

### Customizing the Widget
To fully customize the widget to match your website's theme, I recommend downloading the `webring.css` file and integrating it directly into your website. You can change things like button styles, text colors, font families, and more.

### Widget Properties
| Attribute          | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| `data-style`       | Basic (premade) Visual style preset (`default`, `minimal`). |
| `data-color`       | Text color for arrows (`blue`, `#ff6600`, etc.). |
| `data-show-list`   | Toggle "list" visibility button in the bottom row (`true` or `false`). |
| `data-show-random` | Toggle "random" visibility button in the bottom row (`true` or `false`). |
| `data-random-text` | Change text or symbol used for the random link (e.g. `?`, `[?]`, `random`). |
| `data-arrow-prev`  | Change text for the "previous" button. |
| `data-arrow-next`  | Change text for the "Next" button. |

## FAQ

### How do I join the webring?

Add your site to the `webring.json` file using the format provided in this README, then submit a pull request.

### I'm not from Western University, can I still join?

Sadly not, this webring is exclusive to Western University students, alumni, and faculty. However, if you're interested in webrings in general, check out the extensive list of public webrings [here](https://brisray.com/web/webring-list.htm).

### The widget is showing "Site not found in webring."

This is normal! If you see `Site not found in webring.` then you've successfully embedded the widget and all you need to do is create a pull request with your `.json` information. Once you do, just sit back and wait until it gets approved!

### Can I use this widget on a React or Next.js site?

Yes, you can. Follow the [React (JSX) instructions](#React-(JSX)-Embedding) above to embed the widget.

### Is there a way to fully customize the widget's design?

Yes! You can modify the widget by either using the provided `data-*` attributes or by downloading and modifying `webring.css`.

### How do I contribute or suggest changes?

If you have ideas for improving the widget, please feel free to submit an issue or open a pull request. The community is always welcome to contribute!

### How are next/prev sites calculated?

The webring reads from the `webring.json` file, checks if you are indexed in the JSON file, then finds your site’s index and then calculates your neighbors (previous index and next index). Like an array.

### Other questions
Got other questions? Send me a message on Discord: `neighbourjack`

## Further Updates and possible features
This webring project is designed to be a long-term resource for the Western University community. As it grows, the plans are to:
1. Continuously improve the widget and provide additional customization options.
2. Create a centralized page showcasing all webring members and their websites.
a. Instead of fetching JSON in the browser, a redirect system like: `https://webring.com/next?site=johndoe.com` would handle prev/next on the server side for faster performance.
4. ~~Theming with custom CSS variables~~
5. ~~Create a front page where it lists all members~~
6. Create a live customizable profile card tool where users could easily customize and export their profile cards in `.json` format

## Inspiration
This repo was inspired by many resources: [History of Webrings](https://brisray.com/web/webring-history.htm), [Build a Modern Day Webring](https://css-tricks.com/how-you-might-build-a-modern-day-webring/), [Web Rings of Power](https://www.kersed.net/posts/webrings-of-power/), [uwatering](https://github.com/JusGu/uwatering), and of course the good old' 90's (pre search engine era).