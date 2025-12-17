const fs = require("fs");
const path = require("path");

const BASE_URL = "https://scrimba.jdeo.ca";
const BUILD_DIR = path.join(__dirname, "dist");

const configPath = path.join(__dirname, "config.json");

if (!fs.existsSync(configPath)) {
    console.error(`Error: Configuration file not found at ${configPath}`);
    process.exit(1);
}

const rawConfig = fs.readFileSync(configPath);
const sites = JSON.parse(rawConfig);

function generateSitemap(sites) {
    console.log("Generating sitemap...");

    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${BASE_URL}/</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>`;

    for (const site of sites) {
        let urlSegment = site.remotePath.replace(/\\/g, "/");

        if (!urlSegment.startsWith("/")) {
            urlSegment = "/" + urlSegment;
        }

        if (urlSegment === "/" || urlSegment === "") return;

        sitemapContent += `
    <url>
        <loc>${BASE_URL}${urlSegment}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`;
    }

    sitemapContent += `
</urlset>`;

    fs.writeFileSync(path.join(BUILD_DIR, "sitemap.xml"), sitemapContent);
    console.log(`[Created] ${path.join(BUILD_DIR, "sitemap.xml")}`);
}

function generateRobots() {
    const robotsContent = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml
`;
    fs.writeFileSync(path.join(BUILD_DIR, "robots.txt"), robotsContent);
    console.log(`[Created] ${path.join(BUILD_DIR, "robots.txt")}`);
}

function buildPortfolio() {
    console.log(`Starting build...`);

    if (!fs.existsSync(BUILD_DIR)) {
        fs.mkdirSync(BUILD_DIR, { recursive: true });
    }

    for (const site of sites) {
        const source = path.resolve(__dirname, site.localPath);
        const destination = path.join(BUILD_DIR, site.remotePath);

        if (!fs.existsSync(source)) {
            console.warn(`[Warning] Source not found (skipping): ${source}`);
            continue;
        }

        fs.mkdirSync(path.dirname(destination), { recursive: true });

        fs.cpSync(source, destination, { recursive: true });
        console.log(`[Copied] ${site.localPath} -> ${site.remotePath}`);
    }

    generateSitemap(sites);
    generateRobots();

    console.log("\nBuild complete.");
}

buildPortfolio();
