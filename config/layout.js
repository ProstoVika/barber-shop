// Shared HTML for every page: <head> extras, header with menu, footer.
// Injected into the page templates by HtmlWebpackPlugin.

const { SITE_URL, FACEBOOK_URL, pages, structuredData } = require('./site');

const head = (page) => `
    <link rel="canonical" href="${SITE_URL}${page.url}">
    <link rel="icon" href="/favicon.ico" sizes="48x48">
    <link rel="icon" href="/favicon-192x192.png" sizes="192x192" type="image/png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#141410">
    ${page.structuredData ? `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>` : ''}`;

const navLink = (item, current) => `
                <li><a class="site-nav__link" href="${item.url}"${item.url === current.url ? ' aria-current="page"' : ''}>${item.menu}</a></li>`;

const header = (page) => `
<header class="site-header">
    <div class="site-header__inner">
        <a class="site-header__logo" href="/" aria-label="Royal Cut home page">
            <img src="/product-images/6.png" alt="Royal Cut barbershop logo" width="734" height="156">
        </a>

        <button class="menu-toggle" type="button" aria-controls="site-menu" aria-expanded="false" aria-label="Open menu">
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                <line class="menu-toggle__line" x1="3" y1="7" x2="21" y2="7"/>
                <line class="menu-toggle__line" x1="3" y1="12" x2="21" y2="12"/>
                <line class="menu-toggle__line" x1="3" y1="17" x2="21" y2="17"/>
            </svg>
        </button>

        <nav class="site-nav" id="site-menu" aria-label="Main">
            <ul class="site-nav__list">${pages.map((item) => navLink(item, page)).join('')}
            </ul>
        </nav>
    </div>
    <div class="scroll-progress" aria-hidden="true"></div>
</header>`;

const footer = () => `
<footer class="site-footer">
    <div class="site-footer__grid">
        <p class="site-footer__lead">Royal Cut. Barbershop in South Ealing and The Vale, London.</p>

        <nav aria-label="Footer">
            <ul class="site-footer__list">${pages.map((item) => `
                <li><a href="${item.url}">${item.menu}</a></li>`).join('')}
            </ul>
        </nav>

        <ul class="site-footer__list">
            <li><span>South Ealing</span> <a href="tel:+442085677342">020 8567 7342</a></li>
            <li><span>The Vale</span> <a href="tel:+442070419409">020 7041 9409</a></li>
            <li>
                <a class="site-footer__social" href="${FACEBOOK_URL}" target="_blank" rel="noopener" aria-label="Royal Cut on Facebook">
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
                        <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1z"/>
                    </svg>
                </a>
            </li>
        </ul>
    </div>

    <div class="site-footer__bottom">
        <span>© ${new Date().getFullYear()} Royal Cut. All rights reserved.</span>
        <a class="site-footer__top" href="#">Back to top
            <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4">
                <path d="M8 14V2M3 7l5-5 5 5"/>
            </svg>
        </a>
    </div>
</footer>`;

module.exports = { head, header, footer };
