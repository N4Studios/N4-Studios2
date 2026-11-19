const projectType = document.title.substring(13);

const projectPosts = {
    Websites: [], 
    Software: [], 
    "Other Projects": [], 
    Media: [], 
    Games: []
};

function getProjectPosts() {
    for (const post of blogPosts) {
        if (post.type === projectType && !post.disabled) {
            if (projectPosts[projectType]) {
                projectPosts[projectType].push(post);
            }
        }
    }
}

function populateProjectRows() {
    let container = $("#projectContainer").empty(); // clear any existing rows first
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

// Project ROWS
function createProjectRow(title, link, docs, date, desc, imageUrl, isLeft) {
    let projectRow = $('<div class="project-row visible ' + (isLeft ? 'left' : 'right') + '"></div>');
    let projectImg = $('<img class="project-blob-img" width="40%" alt="Project Image">').attr('src', imageUrl);
    let projectContent = $('<div class="project-content"></div>');
    let projectTitleRow = $('<div class="project-titleRow"></div>');
    
    let projectTitle;
    if (link) {
        projectTitle = $(`<a class='project-title' href='${link}'></a>`).html(title);
    } else {
        projectTitle = $(`<p class='project-title'></p>`).html(title);
    }

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
    getProjectPosts();
    populateProjectRows();
});