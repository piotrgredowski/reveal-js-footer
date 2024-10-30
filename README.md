# reveal-js-footer

Inspired by [Reveal.js-Title-Footer](https://github.com/e-gor/Reveal.js-Title-Footer)

## Demo:

TODO

## Usage

1. Go to newest release and grab url for newest `js` script file.

1. Use below code to find out how to use the plugin

```html
<head>
    <!-- you can specify title here or directly in the plugin config -->
    <title>My Presentation</title>
</head>
<body>
    <!-- ... -->
    <!-- Include the plugin -->
    <script type="module">
    import RevealOkFooter from './src/reveal-js-footer.js';

    Reveal.initialize({
      plugins: [RevealOkFooter],
    });

    Reveal.configure({
      pdfMaxPagesPerSlide: 1,
      pdfSeparateFragments: true,
      okFooter: {
        date: "25.10.2024",
        author: "Jane Doe",
        logoImageUrl: "https://orstedcdn.azureedge.net/-/media/www/images/corp/graphics/icons/favicon.ico",
        logoLink: "https://orsted.com",
        showInPdfPrint: false,
        title: "Custom title for footer", // If not set - will use the document title
        cssClasses: ["footer"], // useful for custom styling
      }
    });

  </script>
</body>
```

1. Final result should look like this:

![Slide with footer](_assets/slide_with_footer.png)
