const getTitle  = function() {
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

        console.log("this.author", this.author);

        this.background = background || 'rgba(0,0,0,0)';

        const footerElement = document.createElement('footer');
        footerElement.setAttribute('id', 'title-footer');
        footerElement.setAttribute('style', `background:${this.background}`);

        // const footerParagraph = document.createElement('p');
        // footerElement.appendChild(footerParagraph);


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
    }
};
