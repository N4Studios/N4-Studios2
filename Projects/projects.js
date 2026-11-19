const projectType = document.title.substring(13);

const projectPosts = {
    Websites: [], 
    Software: [], 
    "Other Projects": [], 
    Media: [], 
    Games: []
};

async function getProjectPosts() {
    // If window.blogPosts isn't loaded yet, fetch it now
    if (!window.blogPosts || window.blogPosts.length === 0) {
        if (typeof fetchBlogPosts === "function") {
            await fetchBlogPosts();
        }
    }

    const posts = window.blogPosts || [];
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
    
    // Wait for project data to arrive
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