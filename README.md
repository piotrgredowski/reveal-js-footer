# reveal-js-footer

Inspired by [Reveal.js-Title-Footer](https://github.com/e-gor/Reveal.js-Title-Footer)

# Usage:

1. Go to newest release and grab url for newest `js` and `css` files.

2. Use below code to find out how to use the plugin

```html
<head>
    <!-- you can specify values which will be rendered in the footer -->
    <title>My Presentation</title>
    <meta name="presentation_author" content="John Doe">
    <meta name="presentation_date" content="01.01.1990">
    <meta name="footer_logo" content="https://orstedcdn.azureedge.net/-/media/www/images/corp/graphics/icons/favicon.ico">
    <meta name="footer_logo_link" content="https://orsted.com">
    <!-- ... -->
    <!-- Include styles for the plugin -->
    <link rel="stylesheet" href="link.css">
</head>
<body>
    <!-- ... -->
    <!-- Include the plugin -->
    <script src="link.js"></script>
    <script type="module">

    Reveal.initialize({
        ...
    });

    // Initialize the plugin
    TitleFooter.initialize();

  </script>
</body>
```

3. Final result should look like this:

![Slide with footer](_assets/slide_with_footer.png)
