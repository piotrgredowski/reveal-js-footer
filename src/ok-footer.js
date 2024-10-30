const css = `
#ok-footer {
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

#ok-footer img {
    height: var(--r-main-font-size);
    width: auto;
    object-fit: contain;
}

#ok-footer .author {
    margin-left: 10px;
}

#ok-footer .date {
    margin-right: 10px;
}

div.progress[style='display: block;']~#ok-footer {
    bottom: calc(3px + 10.5vh);
}

#ok-footer {
    bottom: 10.5vh;
}
#ok-footer p {
    margin: 0;
}

div.progress[style='display: block;']~footer#ok-footer {
    bottom: calc(3px + 4.5vh);
}

footer#ok-footer {
    bottom: 3px;
}

.no-ok-footer #ok-footer {
    opacity: 0;
    transition: opacity 800ms ease-in-out;
}

.no-toc-progress #ok-footer {
    opacity: 0;
    transition: opacity 800ms ease-in-out;
}

.overview #ok-footer {
    opacity: 0;
    transition: opacity 800ms ease-in-out;
}
`;

const getTitle = function () {
  return document.title;
};

const getAuthor = function () {
  const author = document.querySelector('meta[name="presentation_author"]');
  return author ? author.getAttribute('content') : '';
};

const getDate = function () {
  const date = document.querySelector('meta[name="presentation_date"]');
  return date ? date.getAttribute('content') : '';
};

const getLogoUrl = function () {
  const logo = document.querySelector('meta[name="footer_logo"]');
  return logo ? logo.getAttribute('content') : '';
};

const getLogoLink = function () {
  const logoLink = document.querySelector('meta[name="footer_logo_link"]');
  return logoLink ? logoLink.getAttribute('content') : '';
};

const TitleFooter = {
  title: '',
  background: 'rgba(0,0,0,0.1)',
  date: '',
  author: '',
  logoImageUrl: '',
  logoLink: '',
  showInPdfPrint: false,

  getElementsByTagNames: function (tagNamesList, context = document) {
    const tagNames = tagNamesList.split(',');
    let elements = [];

    tagNames.forEach((tagName) => {
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

  initialize: function (Reveal) {
    const pluginConfig = Reveal.getConfig().okFooter || {};

    const todayAsString = new Date().toLocaleDateString('en-GB');
    pluginConfig.date = pluginConfig.date || todayAsString;
    pluginConfig.author = pluginConfig.author || null;
    pluginConfig.logoImageUrl = pluginConfig.logoImageUrl || null;
    pluginConfig.logoLink = pluginConfig.logoLink || null;
    pluginConfig.showInPdfPrint = pluginConfig.showInPdfPrint || false;
    pluginConfig.cssClasses = pluginConfig.cssClasses || [];
    pluginConfig.title = pluginConfig.title || getTitle();

    const background = 'rgba(0,0,0,0)';

    const footerElement = document.createElement('footer');
    footerElement.setAttribute('id', 'ok-footer');
    footerElement.setAttribute('style', `background:${background}`);

    pluginConfig.cssClasses.forEach((className) => {
      footerElement.classList.add(className);
    });

    if (!!pluginConfig.logoImageUrl) {
      let logoImageContainer;
      if (!!pluginConfig.logoLink) {
        const logoAnchor = document.createElement('a');
        logoAnchor.setAttribute('href', pluginConfig.logoLink);
        logoImageContainer = logoAnchor;
      } else {
        logoImageContainer = document.createElement('span');
      }
      const imageElement = document.createElement('img');
      imageElement.setAttribute('src', pluginConfig.logoImageUrl);
      imageElement.setAttribute('alt', 'logo');
      logoImageContainer.appendChild(imageElement);
      footerElement.appendChild(logoImageContainer);
      console.log(logoImageContainer);
    }

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', '#/0');
    const text = `${pluginConfig.title} by ${pluginConfig.author}, ${pluginConfig.date}`;
    linkElement.appendChild(document.createTextNode(text));
    footerElement.appendChild(linkElement);

    const search = window.location.search;
    const isPdfPrint = (search.match('print-pdf') || []).length > 0;

    if (isPdfPrint && pluginConfig.showInPdfPrint) {
      Reveal.addEventListener('ready', function (event) {
        const containers = document.querySelectorAll('.slide-background');

        containers.forEach((container) => {
          container.appendChild(footerElement.cloneNode(true));
        });
      });
    } else {
      const container = document.querySelector('.reveal');
      container.appendChild(footerElement);
    }

    const styleElement = document.createElement('style');
    styleElement.innerHTML = css;
    document.head.appendChild(styleElement);
  },
};

export default () => ({
  id: 'RevealOkFooter',
  init: (deck) => {
    TitleFooter.initialize(deck);
  },
});
