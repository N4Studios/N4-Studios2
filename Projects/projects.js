// DELAYED 2

const projectType = document.title.substring(13);

const projectPosts = {
    Websites: [], 
    Software: [], 
    "Other Projects": [], 
    Media: [], 
    Games: []
};

// Standalone getPreDir helper function without recursive calls
function getPreDir() {
    let url = window.location.pathname;
    let domain = "n4-studios.com";
    let path = url.indexOf(domain) !== -1 ? url.substring(url.indexOf(domain) + domain.length) : url;
    let subDirAmnt = (path.match(/\//g) || []).length - 1;
    let preDir = "";
    for (let i = 0; i < subDirAmnt; i++) {
        preDir += "../";
    }
    return preDir;
}

function resolvePath(pathStr) {
    if (!pathStr) return "";
    return pathStr.replace(/^\$\{getPreDir\(\)\}/, getPreDir());
}

// Global fallback function for toggleRows
window.toggleRows = window.toggleRows || function() {
    let scrollTop = $(window).scrollTop();
    let screenHeight = $(window).height();

    $('.blog-row, .project-row').each(function() {
        let elementTop = $(this).offset().top;
        let elementHeight = $(this).outerHeight();

        if (scrollTop + screenHeight > elementTop + elementHeight * 0.1) {
            $(this).addClass('visible');
        } else if (scrollTop + screenHeight < elementTop + elementHeight * 0.1) {
            $(this).removeClass('visible');
        }
    });
};

async function fetchProjectsDirectly() {
    try {
        const response = await fetch("https://n4-studios-projects-api.nielsen101004.workers.dev/");
        if (!response.ok) throw new Error("API response error");
        const rawProjects = await response.json();
        return rawProjects.map(proj => ({
            type: proj.type,
            title: proj.title,
            link: resolvePath(proj.link),
            docs: resolvePath(proj.docs),
            date: proj.date,
            desc: proj.description || "",
            imageUrl: resolvePath(proj.imageUrl),
            disabled: Boolean(proj.disabled)
        }));
    } catch (e) {
        console.error("Failed to load project posts:", e);
        return [];
    }
}

async function getProjectPosts() {
    let posts = window.blogPosts;

    if (!posts || posts.length === 0) {
        posts = await fetchProjectsDirectly();
        window.blogPosts = posts;
    }

    for (const post of posts) {
        if (post.type === projectType && !post.disabled) {
            if (projectPosts[projectType]) {
                projectPosts[projectType].push(post);
            }
        }
    }
}

async function populateProjectRows() {
    let container = $("#projectContainer").empty();
    
    await getProjectPosts();

    let projectTypePosts = projectPosts[projectType] || [];

    let disabledAmount = 0;
    projectTypePosts.forEach(function (post, index) {
        let isLeft = (index + disabledAmount) % 2 === 0;
        if (!post.disabled) {
            createProjectRow(post.title, post.link, post.docs, post.date, post.desc, post.imageUrl, isLeft).appendTo(container);
        } else {
            disabledAmount++;
        }
    });
    
    window.toggleRows();
}

function createProjectRow(title, link, docs, date, desc, imageUrl, isLeft) {
    let projectRow = $('<div class="project-row visible ' + (isLeft ? 'left' : 'right') + '"></div>');
    let projectImg = $('<img class="project-blob-img" width="40%" alt="Project Image">').attr('src', imageUrl);
    let projectContent = $('<div class="project-content"></div>');
    let projectTitleRow = $('<div class="project-titleRow"></div>');
    
    let projectTitle = link ? $(`<a class='project-title' href='${link}'></a>`).html(title) : $(`<p class='project-title'></p>`).html(title);

    let projectLinks = $(`<div class='project-links'></div>`);
    if (link) projectLinks.append(`<a href='${link}'><span class='openLink'></span></a>`);
    if (docs) projectLinks.append(`<a href='${docs}'><span class='openDocs'></span></a>`);
    let projectText = $(`<p></p>`);
    let projectDate = $(`<h3></h3>`).html(date);
    let projectDesc = $(`<p></p>`).html(desc);
    projectTitleRow.append(projectTitle, projectLinks);
    projectText.append(projectDate, projectDesc);
    projectContent.append(projectTitleRow, projectText);
    projectRow.append(projectContent, projectImg);
    return projectRow;
}

$(document).ready(function () {
    populateProjectRows();
});