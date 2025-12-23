class InstagramClone {
    static POSTS = [
        {
            id: "3db2c869-af7b-49bc-8c80-1bf24d2f575c",
            name: "Vincent van Gogh",
            username: "vincey1853",
            location: "Zundert, Netherlands",
            avatar: "images/avatar-vangogh.jpg",
            post: "images/post-vangogh.jpg",
            comment: "just took a few mushrooms lol",
            likes: 2635972,
            comments: 36723
        },
        {
            id: "2e6b836d-2f4e-4274-8b55-2f93d59269be",
            name: "Gustave Courbet",
            username: "gus1819",
            location: "Ornans, France",
            avatar: "images/avatar-courbet.jpg",
            post: "images/post-courbet.jpg",
            comment: "i'm feelin a bit stressed tbh",
            likes: 4,
            comments: 0
        },
        {
            id: "31f1911f-abcb-47f9-8495-4764dde8cfbc",
            name: "Joseph Ducreux",
            username: "jd1735",
            location: "Paris, France",
            avatar: "images/avatar-ducreux.jpg",
            post: "images/post-ducreux.jpg",
            comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
            likes: 999,
            comments: 125
        }
    ];

    static init() {
        this.main = document.querySelector('main');

        this.generatePosts();

        this.main.addEventListener("click", (event) => this.activateToggle(event));
        this.main.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") return;
            this.activateToggle(event);
        });
    }

    static activateToggle(event) {
        const toggle = event.target.closest('.toggle');

        if (!toggle) return;

        InstagramClone.updateToggle(toggle, false, true);
    }

    static updateToggle(toggle, setToggle, isManual) {
        const wasPressed = toggle.getAttribute('aria-pressed') === 'true';
        const isPressed = isManual ? !wasPressed : setToggle;
        toggle.setAttribute('aria-pressed', isPressed);

        const classSet = new Set(toggle.classList);

        if (classSet.has('like')) {
            if (isManual) {
                toggle.classList.add('is-animating');
                setTimeout(() => toggle.classList.remove('is-animating'), 300);
            }

            const id = toggle.closest('article').id;
            const keyLikes = `${id}-likes`;
            const keyLiked = `${id}-liked`;

            let likeCount = JSON.parse(localStorage.getItem(keyLikes) ?? 0);

            const likeEl = toggle.parentElement.querySelector(".like-count");

            if (isPressed && isManual) {
                likeCount++;
                localStorage.setItem(keyLiked, "true");
            } else if (!isPressed && isManual) {
                likeCount--;
                localStorage.setItem(keyLiked, "false");
            }

            localStorage.setItem(keyLikes, likeCount);
            likeEl.textContent = this.formatCount(likeCount);

            if (isPressed) {
                toggle.innerHTML = `
                    <svg aria-label="Unlike" fill="currentColor" height="24" role="img" viewBox="0 0 48 48"
                        width="24">
                        <title>Unlike</title>
                        <path
                            d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z">
                        </path>
                    </svg>
                    `;
            } else {
                toggle.innerHTML = `
                    <svg aria-label="Like" fill="currentColor" height="24" role="img" viewBox="0 0 24 24"
                        width="24">
                        <title>Like</title>
                        <path
                            d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z">
                        </path>
                    </svg>
                    `;
            }
        } else if (classSet.has('save')) {
            const id = toggle.closest('article').id;
            const keySaved = `${id}-saved`;

            if (isPressed && isManual) {
                localStorage.setItem(keySaved, "true");
            } else if (!isPressed && isManual) {
                localStorage.setItem(keySaved, "false");
            }

            if (isPressed) {
                toggle.innerHTML = `
                    <svg aria-label="Remove" fill="currentColor" height="24" role="img" viewBox="0 0 24 24"
                        width="24">
                        <title>Remove</title>
                        <path
                            d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z">
                        </path>
                    </svg>
                    `;
            } else {
                toggle.innerHTML = `
                    <svg aria-label="Save" fill="currentColor" height="24" role="img" viewBox="0 0 24 24"
                        width="24">
                        <title>Save</title>
                        <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
                    </svg>
                    `;
            }
        }
    }

    static generatePosts() {
        for (const post of this.POSTS) {
            const likeCount = localStorage.getItem(`${post.id}-likes`);

            if (!likeCount) {
                localStorage.setItem(`${post.id}-likes`, post.likes);
            }

            const hasLiked = localStorage.getItem(`${post.id}-liked`) === "true" ? true : false;
            const hasSaved = localStorage.getItem(`${post.id}-saved`) === "true" ? true : false;

            const commentCount = localStorage.getItem(`${post.id}-comments`);

            if (!commentCount) {
                localStorage.setItem(`${post.id}-comments`, post.comments);
            }

            this.main.innerHTML += this.getPostHTML(post);

            const postEl = this.main.querySelector(`#${CSS.escape(post.id)}`);
            const toggleLike = postEl.querySelector(".like");
            const toggleSave = postEl.querySelector(".save");

            this.updateToggle(toggleLike, hasLiked, false);
            this.updateToggle(toggleSave, hasSaved, false);
        }
    }

    static getPostHTML(post) {
        return `
        <article class="post" id="${post.id}">
            <div class="post-header">
                <img class="avatar" aria-disabled="false" role="button" tabindex="0" src="${post.avatar}"
                    alt="${post.name}'s profile picture.">
                <div class="post-header-info">
                    <p class="semi-bold">${post.name}</p>
                    <p class="location">${post.location}</p>
                </div>
                <svg class="more-options" aria-label="More options" aria-disabled="false" role="button" tabindex="0"
                    fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <title>More options</title>
                    <circle cx="12" cy="12" r="1.5"></circle>
                    <circle cx="6" cy="12" r="1.5"></circle>
                    <circle cx="18" cy="12" r="1.5"></circle>
                </svg>
            </div>
            <img class="post-img" src="${post.post}" alt="${post.name}'s post.">
            <div class="post-footer">
                <section class="post-footer-bar">
                    <div class="post-footer-btn post-footer-item like toggle" aria-pressed="false" aria-disabled="false" role="button"
                        tabindex="0">
                        <svg aria-label="Like" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <title>Like</title>
                            <path
                                d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z">
                            </path>
                        </svg>
                    </div>
                    <div class="${post.likes <= 0 ? "post-footer-text-empty " : ""}post-footer-item post-footer-text like-count semi-bold">${this.formatCount(post.likes)}</div>
                    <div class="post-footer-btn post-footer-item" aria-disabled="false" role="button" tabindex="0">
                        <svg aria-label="Comment" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <title>Comment</title>
                            <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor"
                                stroke-linejoin="round" stroke-width="2"></path>
                        </svg>
                    </div>
                    <div class="${post.comments <= 0 ? "post-footer-text-empty " : ""}post-footer-item post-footer-text comment-count semi-bold">${this.formatCount(post.comments)}</div>
                    <div class="post-footer-btn post-footer-item" aria-disabled="false" role="button" tabindex="0">
                        <svg aria-label="Share" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <title>Share</title>
                            <path
                                d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z"
                                fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                            <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line>
                        </svg>
                    </div>
                    <div class="post-footer-btn post-footer-item save toggle" aria-pressed="false" aria-disabled="false" role="button"
                        tabindex="0">
                        <svg aria-label="Save" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <title>Save</title>
                            <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor"
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
                        </svg>
                    </div>
                </section>
                <div>
                    <p class="post-footer-description"><a class="semi-bold">${post.username}</a> ${post.comment}</p>
                </div>
            </div>
        </article>
        `;
    }

    static formatCount(num) {
        if (num <= 0) return "";

        return new Intl.NumberFormat('en-US', {
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(num);
    }
}

document.addEventListener("DOMContentLoaded", () => InstagramClone.init());