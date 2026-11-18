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

const blogPosts = [
    {
        type: "Websites",
        title: "Auto Clipboard", 
        link: `${getPreDir()}c/index.html`, 
        docs: ``,
        date: "November 10, 2026",
        desc: "Allows a user to open the page and have it automatically copy what the user needs (Given the key). Key is provided in this format (<span class='underline'>/?key</span>) of the URL. Each Key and value is submitted through a google form. (Need the form link? Contact <a class='content-link' href='../../About'>Luke Nielsen</a>)", 
        imageUrl: "https://n4-studios.com/Assets/blog/ComputerSimulatorThumbnail.png"
    },
    {
        type: "Media",
        title: "1 Year Mission Update", 
        link: `${getPreDir()}Assets/Mission/WATAC1Year(360p_SM).mp4`, 
        docs: ``,
        date: "March 04, 2025",
        desc: "1 Year update of my Mission in Tacoma, Washington.", 
        imageUrl: "https://n4-studios.com/Assets/blog/ComputerSimulatorThumbnail.png"
    },
    {
        type: "Media",
        title: "6 Month Mission Update", 
        link: `${getPreDir()}Assets/Mission/WATAC6Months(360p_SM).mp4`, 
        docs: ``,
        date: "August 18, 2024",
        desc: `6 Month update of my Mission in Tacoma, Washington.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/ComputerSimulatorThumbnail.png"
    },
    {
        type: "Websites",
        title: "Computer Simulator", 
        link: `${getPreDir()}Projects/ComputerSimulator/index.html`, 
        docs: `${getPreDir()}Docs/ComputerSimulator/index.html`,
        date: "November 06, 2023.",
        desc: "A Computer Simulator created using HTML, Javascript, and CSS. <a href='https://github.com/Hibyehello' class='content-link'>Josh C.</a> helped create it as well.", 
        imageUrl: "https://n4-studios.com/Assets/blog/ComputerSimulatorThumbnail.png"
    },
    {
        type: "Media",
        title: "Logo Render", 
        link: `${getPreDir()}Assets/Blender/logoRenderVideoEevee.mp4`, 
        docs: ``,
        date: "November 05, 2023",
        desc: ``, 
        imageUrl: "https://n4-studios.com/Assets/blog/logoRender.png"
    },
    {
        type: "Blog",
        disabled: true,
        title: "Hawaii Trip", 
        link: `${getPreDir()}Docs/HawaiiTrip/index.html`, 
        docs: ``,
        date: "November 29, 2023",
        desc: ``, 
        imageUrl: "https://n4-studios.com/Assets/blog/HawaiiTrip/HawaiiPlane.jpeg"
    },
    {
        type: "Websites",
        title: "Spectron Industries Website", 
        link: `https://SpectronIndustries.com`, 
        docs: `https://github.com/SpectronIndustries/SpectronIndustries`,
        date: "October 17, 2023",
        desc: `Started Spectron Industries Website. <i>Spectron Industries Inc</i> was created by <a class='content-link' href='https://spectronindustries.com/AboutUs/#:~:text=Head%20of%20Divisions-,Aaron%20Woodland,-Founder'>Aaron Woodland</a>.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/SpectronIndustries/SpectronIndustriesWebV111623c.png"
    },
    {
        type: "Blog",
        disabled: true,
        title: "Nature Walk v2", 
        link: ``, 
        docs: ``,
        date: "October 12, 2023",
        desc: ``, 
        imageUrl: "https://n4-studios.com/Assets/blog/NatureWalks/NatureWalkV2.jpg"
    },
    {
        type: "Media",
        title: "Second Motion Tracking (Blender)", 
        link: `${getPreDir()}Assets/Blender/portalOnCarpet.mp4`, 
        docs: `https://drive.google.com/drive/folders/1BkwKmQXyltKCWEJcsTQPFkZ8Lq2Oy1uv?usp=sharing`,
        date: "October 11, 2023",
        desc: `Created a motion tracking video using Blender`, 
        imageUrl: "https://n4-studios.com/Assets/blog/BlenderProgress/BlenderProgressThumbnail2023.png"
    },
    {
        type: "Websites",
        disabled: true,
        title: "Cashier Tools (STools)", 
        link: `https://stools.nielsen1010041.repl.co/`, 
        docs: ``,
        date: "October 10, 2023",
        desc: `I created some tools for a cashier. Using the STools you can find the Food Calculator, Date Experation Finder, Shift Report Calculator.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/BlenderProgress/BlenderProgressThumbnail2023.png"
    },
    {
        type: "Media",
        title: "First Motion Tracking (Blender)", 
        link: `${getPreDir()}Assets/Blender/motionTracking1.mp4`, 
        docs: `https://drive.google.com/drive/folders/1BkwKmQXyltKCWEJcsTQPFkZ8Lq2Oy1uv?usp=sharing`,
        date: "October 09, 2023",
        desc: `Created a motion tracking video using Blender`, 
        imageUrl: "https://n4-studios.com/Assets/blog/BlenderProgress/BlenderProgressThumbnail2023.png"
    },
    {
        type: "Blog",
        disabled: true,
        title: "Nature Walk v2", 
        link: ``, 
        docs: ``,
        date: "October 01, 2023",
        desc: ``, 
        imageUrl: "https://n4-studios.com/Assets/blog/NatureWalks/NatureWalkV2.jpg"
    },
    {
        type: "Media",
        title: "Blender Progress Video", 
        link: `https://www.youtube.com/watch?v=_lrXsQt7Hn8&feature=youtu.be`, 
        docs: ``,
        date: "September 25, 2023",
        desc: `A video showing all of my Blender projects over the years.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/BlenderProgress/BlenderProgressThumbnail2023.png"
    },
    {
        type: "Media",
        title: "Updated N4-Studios Logo", 
        link: `${getPreDir()}Assets/N4StudiosLong.png`, 
        docs: ``,
        date: "September 20, 2023",
        desc: ``, 
        imageUrl: "https://n4-studios.com/Assets/N4StudiosLong.png"
    },
    {
        type: "Media",
        title: "Car Render", 
        link: `${getPreDir()}Assets/Blender/carRender.mp4`,
        docs: ``,
        date: "September 19, 2023",
        desc: `BMW driving on road created using Blender.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/ComputerSimulatorThumbnail.png"
    },
    {
        type: "Other Projects",
        disabled: true,
        title: "Drive Data Recovery", 
        link: `${getPreDir()}Docs/DriveRecovery/index.html`, 
        docs: ``,
        date: "August 08, 2023",
        desc: `Recovering data from currupted Windows Vista PC.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/ComputerSimulatorThumbnail.png"
    },
    {
        type: "Other Projects",
        disabled: true,
        title: "Ubuntu Server", 
        link: `${getPreDir()}Docs/UbuntuServer/index.html`, 
        docs: ``,
        date: "July 28, 2023",
        desc: `Using old PC to serve as a Home Media Server.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/ComputerSimulatorThumbnail.png"
    },
    {
        type: "Media",
        title: "Best of Pack TV", 
        link: `https://www.youtube.com/watch?v=1oGBa0i3orw&t=185s`, 
        docs: ``,
        date: "May 15, 2023",
        desc: `An outro for Fremont Pack TV for the 2023 Pack TV Recap.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/ComputerSimulatorThumbnail.png"
    },
    {
        type: "Software",
        title: "Flag Finder", 
        link: ``, 
        docs: `https://github.com/N4Studios/Check-files-for-flags`,
        date: "March 01, 2023",
        desc: `Flag Finder is a tool that helps players quickly find flags in cybersecurity games, especially Capture the Flag (CTF) challenges. Instead of manually searching through hundreds of files, it scans files to locate flags automatically, making the process faster and easier.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/FlagFinder.png"
    },
    {
        type: "Other Projects",
        title: "Server Management", 
        link: `${getPreDir()}Docs/ServerManagement1/index.html`, 
        docs: ``,
        date: "January 01, 2023 - May 15, 2023",
        desc: `Setup 3 servers (1 Ubuntu, 2 Windows Server) for Weber Innovation Center.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/Server.jpg"
    },
    {
        type: "Websites",
        title: "Project Manager for TSA Competition", 
        link: ``, 
        docs: ``,
        date: "March 15, 2023",
        desc: `Project Manager for creating a website for the TSA State Competition 2023.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/SpaceTour.png"
    },
    {
        type: "Games",
        title: "Beginners Start", 
        link: `${getPreDir()}Games/BeginnersStart/index.html`, 
        docs: ``,
        date: "August 09, 2022",
        desc: `Followed <a class='content-link' href='https://www.youtube.com/@PlugWorld/'>PlugWorld\'s</a> Youtube <a class='content-link' href='https://www.youtube.com/playlist?list=PL6bQeQE-ybqAYoaWz_ZEE2X4wX6PhwCWR'>Tutorial</a> to create a 2d wave shooter game using Godot Engine.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/FlagFinder.png"
    },
    {
        type: "Games",
        title: "Color Land 5", 
        link: `${getPreDir()}Games/ColorLand5/index.html`, 
        docs: ``,
        date: "May 31, 2022",
        desc: `Created Color Land 5 as a new version of Color Land 3. This game was created using Godot Engine 3.4.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/FlagFinder.png"
    },
    {
        type: "Websites",
        title: "Matthews Contracting", 
        link: `https://github.com/N4Studios/MatthewsContracting`, 
        docs: ``,
        date: "Febuary 11, 2022",
        desc: `Created a contracting website for a class project using PHP, MySQL, Bootstrap, Jquery, HTML, JS, and CSS. (Designed around the facebook page, Matthews Contracting)`, 
        imageUrl: "https://n4-studios.com/Assets/blog/FlagFinder.png"
    },
    {
        type: "Games",
        title: "Space Invaders Remake JAVA", 
        link: ``, 
        docs: ``,
        date: "January 09, 2022",
        desc: `Created a spin off of Space Invaders using Java. Some of the code was created by Lance P. Rhodes.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/FlagFinder.png"
    },
    {
        type: "Games",
        title: "Color Land 4", 
        link: `https://scratch.mit.edu/projects/422580632/`, 
        docs: ``,
        date: "February 27, 2021",
        desc: `Created Color Land 4 using Scratch.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/FlagFinder.png"
    },
    {
        type: "Websites",
        title: "SEMAG Website", 
        link: `https://n4studios.github.io/SEMAG/`, 
        docs: `https://github.com/N4Studios/SEMAG`,
        date: "Febuary 17, 2021",
        desc: `Created a website that is a hub for games that you can play on your browser.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/SemagWebsite.png"
    },
    {
        type: "Games",
        title: "Color Land 3", 
        link: `https://scratch.mit.edu/projects/284392803/`, 
        docs: ``,
        date: "May 09, 2019",
        desc: `Helped create Color land 3. <a class='content-link' href='https://scratch.mit.edu/projects/279197888/'>(New Color Land 2 Alpha)</a>`, 
        imageUrl: "https://n4-studios.com/Assets/blog/ColorLand3.png"
    },
    {
        type: "Games",
        title: "Moc Pac", 
        link: `https://studio.code.org/projects/gamelab/JLdzbBfr0IJ_upCM1JpGNjWKq2dgfsBMf8rImhlldQA`, 
        docs: `https://studio.code.org/projects/gamelab/JLdzbBfr0IJ_upCM1JpGNjWKq2dgfsBMf8rImhlldQA/view`,
        date: "May 14, 2018",
        desc: `Placed 1st place in the Quest Academy Coding Competition using code.org to recreate Pac-Man.`, 
        imageUrl: "https://n4-studios.com/Assets/blog/MocPac.png"
    }
];

function populateBlogRows() {
    let container = $("#blogContainer").empty(); // clear any existing rows first
    let disabledAmount = 0;
    blogPosts.forEach(function (post, index) {
        let isLeft = (index + disabledAmount) % 2 === 0;
        if(!post.disabled) {
            createBlogRow(post.title, post.link, post.docs, post.date, post.desc, post.imageUrl, isLeft).appendTo(container);
        } else {
            disabledAmount++
        }
    });
}


function populateSideMenu(preDir) {
    let sideMenu = $("#sideMenu");
    sideMenu.append(`<li><a href="${preDir}index.html">Home</a></li>`);
    sideMenu.append(`<li><a href="${preDir}Resume/index.html">Resume</a></li>`);
    sideMenu.append(`<li><a href="${preDir}Documents/index.html">Documents</a></li>`);
    sideMenu.append(`<li><a href="${preDir}About/index.html">About</a></li>`);
}

function populateSubNav(preDir) {
    let subNav = $("#subNav");
    subNav.append(`<button class="subNavBtn" onclick="window.location.href='${preDir}Projects/Websites/index.html'">WEBSITES</button>`)
    subNav.append(`<button class="subNavBtn" onclick="window.location.href='${preDir}Projects/Games/index.html'">GAMES</button>`)
    subNav.append(`<button class="subNavBtn" onclick="window.location.href='${preDir}Projects/Software/index.html'">SOFTWARE</button>`)
    subNav.append(`<button class="subNavBtn" onclick="window.location.href='${preDir}Projects/Media/index.html'">VIDEOS & PHOTOS</button>`)
    subNav.append(`<button class="subNavBtn" onclick="window.location.href='${preDir}Projects/Other_Projects/index.html'">OTHER PROJECTS</button>`)
}

// BLOG ROWS
function createBlogRow(title, link, docs, date, desc, imageUrl, isLeft) {
    let blogRow = $('<div class="blog-row visible ' + (isLeft ? 'left' : 'right') + '"></div>');
    let blogImg = $('<img class="blog-blob-img" width="40%" alt="Blog Image">').attr('src', imageUrl);
    let blogContent = $('<div class="blog-content"></div>');
    let blogTitleRow = $('<div class="blog-titleRow"></div>');
    if(link) {
        let blogTitle = $(`<a class='blog-title' href='${link}'></a>`).html(title);
    } else {
        let blogTitle = $(`<p class='blog-title'></p>`).html(title);
    }
    let blogTitle = $(`<a class='blog-title' href='${link}'></a>`).html(title);
    let blogLinks = $(`<div class='blog-links'></div>`)
    if (link) blogLinks.append(`<a href='${link}'><span class='openLink'></span></a>`)
    if (docs) blogLinks.append(`<a href='${docs}'><span class='openDocs'></span></a>`)
    let blogText = $(`<p></p>`)
    let blogDate = $(`<h3></h3>`).html(date);
    let blogDesc = $(`<p></p>`).html(desc);
    blogTitleRow.append(blogTitle, blogLinks)
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