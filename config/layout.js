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
        <a class="site-header__logo" href="/" aria-label="Royal Cut – home">
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
        <p class="site-footer__lead">Royal Cut — barbershop in South Ealing and The Vale, London.</p>

        <nav aria-label="Footer">
            <ul class="site-footer__list">${pages.map((item) => `
                <li><a href="${item.url}">${item.menu}</a></li>`).join('')}
            </ul>
        </nav>

        <ul class="site-footer__list">
            <li>South Ealing — <a href="tel:+442085677342">020 8567 7342</a></li>
            <li>The Vale — <a href="tel:+442070419409">020 7041 9409</a></li>
            <li><a href="${FACEBOOK_URL}" target="_blank" rel="noopener">Facebook ↗</a></li>
        </ul>
    </div>

    <div class="site-footer__bottom">
        <span>© ${new Date().getFullYear()} Royal Cut. All rights reserved.</span>
        <a href="#">Back to top ↑</a>
    </div>
</footer>`;

module.exports = { head, header, footer };
