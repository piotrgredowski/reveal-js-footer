const css = `
#title-footer {
    position: absolute;
    bottom: 0;
    left: var(--r-block-margin);
    right: calc(var(--r-block-margin) * 2);
    height: var(--r-main-font-size);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: left;
    gap: var(--r-block-margin);
    opacity: 1;
    background-color: var(--main-bg-color);
    font-style: italic;
    font-size: calc(var(--r-main-font-size) * var(--slide-scale) * 0.5);
    transition: opacity 800ms ease-in-out;
}

#title-footer img {
    height: var(--r-main-font-size);
    width: auto;
    object-fit: contain;
}

#title-footer .author {
    margin-left: 10px;
}

#title-footer .date {
    margin-right: 10px;
}

div.progress[style='display: block;']~#title-footer {
    bottom: calc(3px + 10.5vh);
}

#title-footer {
    bottom: 10.5vh;
}
#title-footer p {
    margin: 0;
}

div.progress[style='display: block;']~footer#title-footer {
    bottom: calc(3px + 4.5vh);
}

footer#title-footer {
    bottom: 3px;
}

.no-title-footer #title-footer {
    opacity: 0;
    transition: opacity 800ms ease-in-out;
}

.no-toc-progress #title-footer {
    opacity: 0;
    transition: opacity 800ms ease-in-out;
}

.overview #title-footer {
    opacity: 0;
    transition: opacity 800ms ease-in-out;
}
`

const getTitle = function () {
    return document.title;
};

const getAuthor = function () {
    const author = document.querySelector('meta[name="presentation_author"]');
    return author ? author.getAttribute('content') : '';
}

const getDate = function () {
    const date = document.querySelector('meta[name="presentation_date"]');
    return date ? date.getAttribute('content') : '';
}

const getLogoUrl = function() {
    const logo = document.querySelector('meta[name="footer_logo"]');
    return logo ? logo.getAttribute('content') : '';
}

const getLogoLink = function() {
    const logoLink = document.querySelector('meta[name="footer_logo_link"]');
    return logoLink ? logoLink.getAttribute('content') : '';
}

/* TitleFooter object and properties declaration with default values */
const TitleFooter = {
    title: '',
    background: 'rgba(0,0,0,0.1)',
    date: '',
    author: '',

    getElementsByTagNames: function(tagNamesList, context = document) {
        const tagNames = tagNamesList.split(',');
        let elements = [];

        tagNames.forEach(tagName => {
            const tags = context.getElementsByTagName(tagName);
            elements = elements.concat(Array.from(tags));
        });

        if (elements.length === 0) {
            return [];
        }

        const testNode = elements[0];
        if (testNode.sourceIndex) {
            elements.sort((a, b) => a.sourceIndex - b.sourceIndex);
        } else if (testNode.compareDocumentPosition) {
            elements.sort((a, b) => 3 - (a.compareDocumentPosition(b) & 6));
        }

        return elements;
    },

    initialize: function(background) {
        this.date = getDate();
        this.author = getAuthor();
        this.title = getTitle();


        this.background = background || 'rgba(0,0,0,0)';

        const footerElement = document.createElement('footer');
        footerElement.setAttribute('id', 'title-footer');
        footerElement.setAttribute('style', `background:${this.background}`);


        const logoAnchor = document.createElement('a');
        logoAnchor.setAttribute('href', getLogoLink());
        const imageElement = document.createElement('img');
        imageElement.setAttribute('src', getLogoUrl());
        imageElement.setAttribute('alt', 'logo');
        logoAnchor.appendChild(imageElement);
        footerElement.appendChild(logoAnchor);

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#/0');
        const text = `${this.title} by ${this.author}, ${this.date}`;
        linkElement.appendChild(document.createTextNode(text));
        footerElement.appendChild(linkElement);

        const revealDiv = document.querySelector('.reveal');
        revealDiv.appendChild(footerElement);

        const styleElement = document.createElement('style');
        styleElement.innerHTML = css;
        document.head.appendChild(styleElement);

    }
};
