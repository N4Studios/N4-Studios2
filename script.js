function getPreDir() {
    url = window.location.pathname;

    let domain = "n4-studios.com";
    let path = url.substring(url.indexOf(domain) + domain.length);
    
    subDirAmnt = (path.match(/\//g) || []).length - 1;
    preDir = "";
    for(let i = 0; i < subDirAmnt; i++){
        preDir += "../"
    }
    return preDir;
}

// 1. Define the callback function
function handleResize() {
    $("#content").css("margin-top",($("#head").height()));
}

function toggleSideMenu() {
    handleResize();
    $("#sideMenu").toggleClass("visible");

    if ($("#sideMenu").hasClass("visible")) {
        $("#content").css({
            width: "calc(100% - 64px - 20%)",
            marginLeft: "20%"
        });
        $("#head").css({
            width: "100%",
            marginLeft: "10%"
        });
    } else {
        $("#content").css({
            width: "calc(100% - 64px)",
            marginLeft: "0%"
        });
        $("#head").css({
            width: "100%",
            marginLeft: "0px"
        });
    }
}
// 2. Attach the event listener to the window object
window.addEventListener('resize', handleResize);
$(window).on('scroll', function toggleRows() {

    let scrollTop = $(window).scrollTop();
    let screenHeight = $(window).height();

    $('.blog-row').each(function() {

        let elementTop = $(this).offset().top;
        let elementHeight = $(this).outerHeight();

        // Trigger when 20% of the element is visible
        if (scrollTop + screenHeight > elementTop + elementHeight * 0.1) {
            $(this).addClass('visible');
        } else if (scrollTop + screenHeight < elementTop + elementHeight * 0.1) {
            $(this).removeClass('visible');
        }
    });
});

// Async function to fetch projects from Cloudflare Worker API
async function fetchBlogPosts() {
    try {
        const response = await fetch("https://n4-studios-projects-api.nielsen101004.workers.dev/");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const rawProjects = await response.json();

        // Map database fields to original object property names
        return rawProjects.map(proj => {
            const post = {
                type: proj.type,
                title: proj.title,
                link: proj.link,
                docs: proj.docs || "",
                date: proj.date,
                desc: proj.description || "",
                imageUrl: proj.imageUrl
            };

            if (proj.disabled !== undefined && proj.disabled !== null) {
                post.disabled = Boolean(proj.disabled);
            }

            return post;
        });
    } catch (error) {
        console.error("Failed to load blog posts from Cloudflare:", error);
        return [];
    }
}

async function populateBlogRows() {
    let container = $("#blogContainer").empty(); // clear any existing rows first
    let blogPosts = await fetchBlogPosts();
    let disabledAmount = 0;
    
    blogPosts.forEach(function (post, index) {
        let isLeft = (index + disabledAmount) % 2 === 0;
        if(!post.disabled) {
            createBlogRow(post.title, post.link, post.docs, post.date, post.desc, post.imageUrl, isLeft).appendTo(container);
        } else {
            disabledAmount++;
        }
    });
}

function populateSideMenu(preDir) {
    let sideMenu = $("#sideMenu");
    sideMenu.append(`<li><a href="${preDir}">Home</a></li>`);
    sideMenu.append(`<li><a href="${preDir}Resume/">Resume</a></li>`);
    sideMenu.append(`<li><a href="${preDir}Documents/">Documents</a></li>`);
    sideMenu.append(`<li><a href="${preDir}About/">About</a></li>`);
}

function populateSubNav(preDir) {
    let subNav = $("#subNav");
    subNav.append(`<button class="subNavBtn" onclick="window.location.href='${preDir}Projects/Websites/'">WEBSITES</button>`);
    subNav.append(`<button class="subNavBtn" onclick="window.location.href='${preDir}Projects/Games/'">GAMES</button>`);
    subNav.append(`<button class="subNavBtn" onclick="window.location.href='${preDir}Projects/Software/'">SOFTWARE</button>`);
    subNav.append(`<button class="subNavBtn" onclick="window.location.href='${preDir}Projects/Media/'">VIDEOS & PHOTOS</button>`);
    subNav.append(`<button class="subNavBtn" onclick="window.location.href='${preDir}Projects/Other_Projects/'">OTHER PROJECTS</button>`);
}

// BLOG ROWS
function createBlogRow(title, link, docs, date, desc, imageUrl, isLeft) {
    let blogRow = $('<div class="blog-row visible ' + (isLeft ? 'left' : 'right') + '"></div>');
    let blogImg = $('<img class="blog-blob-img" width="40%" alt="Blog Image">').attr('src', imageUrl);
    let blogContent = $('<div class="blog-content"></div>');
    let blogTitleRow = $('<div class="blog-titleRow"></div>');
    
    let blogTitle;
    if(link) {
        blogTitle = $(`<a class='blog-title' href='${link}'></a>`).html(title);
    } else {
        blogTitle = $(`<p class='blog-title'></p>`).html(title);
    }

    let blogLinks = $(`<div class='blog-links'></div>`);
    if (link) blogLinks.append(`<a href='${link}'><span class='openLink'></span></a>`);
    if (docs) blogLinks.append(`<a href='${docs}'><span class='openDocs'></span></a>`);
    let blogText = $(`<p></p>`);
    let blogDate = $(`<h3></h3>`).html(date);
    let blogDesc = $(`<p></p>`).html(desc);
    blogTitleRow.append(blogTitle, blogLinks);
    blogText.append(blogDate, blogDesc);
    blogContent.append(blogTitleRow, blogText);
    blogRow.append(blogContent, blogImg);
    return blogRow;
}

$(document).ready(function () {
    populateBlogRows();
    populateSideMenu(getPreDir());
    populateSubNav(getPreDir());
});