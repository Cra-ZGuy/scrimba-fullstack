import blogs from "./blogs.js";

class LearningJournal {
    static blogsGrid = document.getElementById("blogs-grid");
    static blogsLoaded = 0;

    static init() {
        const isHomePage = window.location.pathname.endsWith("/") ||
            window.location.pathname.endsWith("index.html") ||
            window.location.pathname === "";

        if (isHomePage) {
            this.loadBlogs(6);
        } else {
            this.loadBlogs(3, true);
        }

        document.addEventListener("click", this.onClick.bind(this));
    }

    /**
     * @param {MouseEvent} event
     */
    static onClick(event) {
        const { target } = event;

        if (target.id === "view-more") {
            this.loadBlogs(6);
        }
    }

    static loadBlogs(blogLoadCount, reverse = false) {
        const loadStop = this.blogsLoaded + blogLoadCount;

        for (
            this.blogsLoaded;
            this.blogsLoaded < Math.min(loadStop, blogs.length);
            this.blogsLoaded++
        ) {
            const blogIndex = reverse
                ? blogs.length - this.blogsLoaded - 1
                : this.blogsLoaded;

            this.blogsGrid.innerHTML += this.generateBlog(
                blogs[blogIndex],
            );
        }

        if (loadStop > blogs.length) {
            document.getElementById("view-more")?.remove();
        }
    }

    static generateBlog(blogData) {
        return `
        <article id="${blogData.id}" class="blog">
            <a href="${blogData.href}">
                <img class="blog-image" src="${blogData.imagePath}"
                    alt="${blogData.alt}" width="${blogData.imageDimensions[0]}"
                    height="${blogData.imageDimensions[1]}">
                <h3 class="blog-title">${blogData.title}</h3>
                <p class="blog-date">${blogData.date}</p>
                <p class="blog-description">${blogData.description}</p>
            </a>
        </article>
        `;
    }
}

document.addEventListener("DOMContentLoaded", () => LearningJournal.init());
