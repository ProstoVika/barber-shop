// Everything about the site in one place: pages, menu, business details.

const SITE_URL = 'https://royalcut.uk';
const FACEBOOK_URL = 'https://www.facebook.com/p/Royal-cut-100057832162337/';
const SHARE_IMAGE = `${SITE_URL}/product-images/1.jpeg`;

// `url` is the clean URL (same as in _redirects and sitemap.xml).
// `menu` is the label shown in the navigation.
const pages = [
    {
        name: 'home',
        url: '/',
        output: 'index.html',
        menu: 'Who we are',
        title: 'Royal Cut | Barbershop in South Ealing, London',
        description: 'Royal Cut is a barbershop in South Ealing, London, offering haircuts, fades and beard trims. Book your appointment today.',
        structuredData: true,
    },
    {
        name: 'team',
        url: '/team',
        menu: 'Gallery',
        title: 'Gallery | Royal Cut South Ealing',
        description: 'Photos of haircuts, fades and beard trims from Royal Cut barbershop in South Ealing, London.',
    },
    {
        name: 'services',
        url: '/services',
        menu: 'Services &amp; prices',
        title: 'Services & Prices | Royal Cut South Ealing',
        description: 'Haircuts, skin fades, beard trims and more. See services and prices at Royal Cut barbershop in South Ealing, London.',
    },
    {
        name: 'products',
        url: '/products',
        menu: 'Products',
        title: 'Hair & Beard Products | Royal Cut South Ealing',
        description: 'Hair and beard care products available at Royal Cut barbershop in South Ealing, London.',
    },
    {
        name: 'about',
        url: '/about',
        menu: 'Contact',
        title: 'Contact & About Us | Royal Cut South Ealing',
        description: 'Find Royal Cut barbershop in South Ealing, London. Opening hours, address and how to book your next haircut.',
        structuredData: true,
    },
];

// Business details for Google (schema.org). Shown on the home and contact pages.
const locations = [
    {
        name: 'Royal Cut South Ealing',
        url: `${SITE_URL}/`,
        telephone: '+44 20 8567 7342',
        streetAddress: '134A South Ealing Road',
        postalCode: 'W5 4QJ',
        openingHours: ['Mo-Fr 09:00-19:00', 'Sa 09:00-18:00', 'Su 10:00-17:00'],
    },
    {
        name: 'Royal Cut The Vale',
        url: `${SITE_URL}/about`,
        telephone: '+44 20 7041 9409',
        streetAddress: '11 The Vale',
        postalCode: 'W3 7SH',
        openingHours: ['Mo-Sa 10:00-19:00', 'Su 10:00-18:00'],
    },
];

const structuredData = [
    {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Royal Cut',
        url: `${SITE_URL}/`,
    },
    ...locations.map((l) => ({
        '@context': 'https://schema.org',
        '@type': 'HairSalon',
        name: l.name,
        url: l.url,
        image: SHARE_IMAGE,
        logo: `${SITE_URL}/favicon-512x512.png`,
        telephone: l.telephone,
        priceRange: '£12-£27',
        address: {
            '@type': 'PostalAddress',
            streetAddress: l.streetAddress,
            addressLocality: 'London',
            postalCode: l.postalCode,
            addressCountry: 'GB',
        },
        openingHours: l.openingHours,
        sameAs: [FACEBOOK_URL],
    })),
];

module.exports = { SITE_URL, FACEBOOK_URL, SHARE_IMAGE, pages, structuredData };
