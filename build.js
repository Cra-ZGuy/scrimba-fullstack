const fs = require("fs");
const path = require("path");

const BASE_URL = "https://scrimba.jdeo.ca";
const BUILD_DIR = path.join(__dirname, "dist");
const configPath = path.join(__dirname, "config.json");

if (!fs.existsSync(configPath)) {
    console.error(`Error: Configuration file not found at ${configPath}`);
    process.exit(1);
}

const rawConfig = fs.readFileSync(configPath, "utf8");
const cleanJson = rawConfig.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "");
const sites = JSON.parse(cleanJson);

function getHtmlFiles(dir, allFiles = []) {
    if (!fs.existsSync(dir)) return allFiles;

    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getHtmlFiles(filePath, allFiles);
        } else if (file.endsWith(".html")) {
            let relativePath = path.relative(BUILD_DIR, filePath).replace(
                /\\/g,
                "/",
            );
            let cleanPath = "/" +
                relativePath.replace(/(index\.html|(?<!index)\.html)$/, "");
            cleanPath = cleanPath.replace(/\/$/, "") || "/";
            allFiles.push(cleanPath);
        }
    });
    return [...new Set(allFiles)];
}

function generateSitemap() {
    console.log("Generating sitemap...");
    const htmlPaths = getHtmlFiles(BUILD_DIR);
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    htmlPaths.forEach((urlPath) => {
        sitemapContent += `
    <url>
        <loc>${BASE_URL}${urlPath}</loc>
        <changefreq>monthly</changefreq>
        <priority>${urlPath === "/" ? "1.0" : "0.8"}</priority>
    </url>`;
    });

    sitemapContent += `\n</urlset>`;
    fs.writeFileSync(path.join(BUILD_DIR, "sitemap.xml"), sitemapContent);
    console.log(`[Created] sitemap.xml with ${htmlPaths.length} URLs`);
}

function generateRobots() {
    const robotsContent =
        `User-agent: *\nAllow: /\nSitemap: ${BASE_URL}/sitemap.xml\n`;
    fs.writeFileSync(path.join(BUILD_DIR, "robots.txt"), robotsContent);
    console.log(`[Created] robots.txt`);
}

function buildPortfolio() {
    console.log("Starting build...");
    let hasError = false;

    if (fs.existsSync(BUILD_DIR)) {
        fs.rmSync(BUILD_DIR, { recursive: true, force: true });
    }

    fs.mkdirSync(BUILD_DIR, { recursive: true });

    for (const site of sites) {
        const source = path.resolve(__dirname, site.localPath);
        const destination = path.join(BUILD_DIR, site.remotePath);

        if (!fs.existsSync(source)) {
            console.error(`[Error] Source not found: ${source}`);
            hasError = true;
            continue;
        }

        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.cpSync(source, destination, { recursive: true });
        console.log(`[Copied] ${site.localPath} -> ${site.remotePath}`);
    }

    generateSitemap();
    generateRobots();

    if (hasError) {
        console.error("\nBuild completed with errors.");
        process.exit(1);
    } else {
        console.log("\nBuild complete.");
    }
}

buildPortfolio();
