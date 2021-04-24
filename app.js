// 1. HELPER FUNCTIONS

// 1.1 Collapse Category in Mobile Menu
const closeCategories = () => {
    categories.forEach(c => {
        c.parentElement.classList.remove("active");
        changeMaxHeight(c.nextElementSibling, 0);
    });
};

// 1.2 Set the Transition Duration of the Mobile Menu
const bypassTransition = (duration = 0) => {
    mobileNav.style.transitionDuration = duration;
};

// 1.3 Change the maximum Height of an Element
const changeMaxHeight = (element, height, extra = 0) => {
    if (height === 0) {
        element.style.maxHeight = 0;
    } else {
        element.style.maxHeight = element.scrollHeight + extra + "px";
    };
};

// 1.4 Copy a shortened Link
const copyLink = button => {
    clearButtons();
    const fakeInput = document.createElement("input");
    fakeInput.type = "text";
    fakeInput.value = button.previousElementSibling.innerHTML;
    document.body.append(fakeInput);
    fakeInput.select();
    document.execCommand("copy");
    fakeInput.remove();
    button.innerHTML = "Copied!";
    button.classList.add("copied");
};

// 1.5 Shorten a Link and create a new Card on the Page
const makeCard = link => {
    allLinks.style.height = "auto";
    allLinks.style.opacity = 1;
    const card = document.createElement("div");
    card.classList.add("loading");
    card.classList.add("shortenedLink");
    card.style.maxHeight = 0;
    const oldLink = document.createElement("p");
    oldLink.classList.add("oldLink");
    const output = document.createElement("div");
    output.classList.add("output");
    output.classList.add("loading");
    const loader = document.createElement("div");
    loader.classList.add("loader");
    oldLink.innerHTML = link;
    output.innerHTML = '<p class="newLink">New Link</p><button>Copy</button>';
    loader.innerHTML = '<div></div>';
    card.append(oldLink, output, loader);
    allLinks.prepend(card);
    localStorage.setItem(linkList, card);
    card.style.maxHeight = card.scrollHeight + "px";
    setTimeout(() => {
        card.classList.remove("loading");
    }, 500);
    loader.classList.toggle("right");
    const loading = setInterval(() => loader.classList.toggle("right"), 1000);
    fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data.result.short_link;
        })
        .then(newLink => {
            output.innerHTML = `<p class="newLink">${newLink}</p><button>Copy</button>`;
            output.lastElementChild.addEventListener("click", () => copyLink(output.lastElementChild));
            loader.classList.add("loading");
            setTimeout(() => {
                output.classList.remove("loading");
                clearInterval(loading);
                loader.remove();
                clearButton.classList.remove("inactive");
                localStorage.setItem("linksHTML", allLinks.innerHTML);
            }, 500);
        })
        .catch(error => {
            console.log(`Something went wrong. Error: ${error}`)
        });
};

// 1.6 Reset Buttons of previously copied Links
const clearButtons = () => {
    const buttons = document.querySelectorAll(".copied");
    buttons.forEach(b => {
        b.classList.remove("copied");
        b.innerHTML = "Copy";
    });
};


// 2. DOM ELEMENTS & VARIABLES

// 2.1 Header Section
const navToggle = document.querySelector(".navToggle");
const mobileNav = document.querySelector("#mobileNav");
const categories = document.querySelectorAll("#mobileNav h4");

// 2.2 Shortening Tool Section
const startButtons = document.querySelectorAll(".getStarted");
const tool = document.querySelector("#shorteningTool");
const form = document.querySelector("form");
const input = document.querySelector("#userInput input");
const urlFormat = /[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

// 2.3 Link List Section
const linkList = document.querySelector("#linkList");
const allLinks = linkList.firstElementChild;
allLinks.innerHTML = localStorage.getItem("linksHTML");
const clearButton = document.querySelector("#clearLinks");
const copyButtons = document.querySelectorAll(".shortenedLink button");


// 3. PAGE FUNCTIONALITY

// 3.1 Load the Page including previous shortened Links

copyButtons.forEach(b => {
    b.addEventListener("click", () => copyLink(b));
})
clearButtons();
if (copyButtons.length > 0) {
    clearButton.classList.remove("inactive");
}

// 3.2 Toggle the Mobile Menu
navToggle.addEventListener("click", () => {
    navToggle.style.pointerEvents = "none";
    mobileNav.classList.toggle("active");
    navToggle.classList.toggle("active");
    if (mobileNav.classList.contains("active")) {
        changeMaxHeight(mobileNav)
        setTimeout(() => {
            bypassTransition();
            changeMaxHeight(mobileNav, "", 144);
            navToggle.style.pointerEvents = "all";
        }, 500);
    } else {
        bypassTransition();
        changeMaxHeight(mobileNav);
        bypassTransition("0.5s");
        changeMaxHeight(mobileNav, 0)
        setTimeout(() => {
            closeCategories();
            navToggle.style.pointerEvents = "all";
        }, 500);
    };
});

// 3.3 Toggle Categories within the Mobile Menu
categories.forEach(category => category.addEventListener("click", () => {
    if (category.parentElement.classList.contains("active")) {
        closeCategories();
    } else {
        closeCategories();
        category.parentElement.classList.add("active");
        changeMaxHeight(category.nextElementSibling);
    };
}));

// 3.4 Scroll to the Link Shortening Tool
startButtons.forEach(b => b.addEventListener("click", () => {
    tool.scrollIntoView({ behavior: "smooth" });
}));

// 3.5 Shorten a new Link
form.addEventListener("submit", event => {
    event.preventDefault();
    if (input.value === "" || !input.value.match(urlFormat)) {
        input.parentElement.classList.add("error");
    } else {
        makeCard(input.value);
    };
});

// 3.6 Remove the Error Class from the Form
input.addEventListener("input", () => input.parentElement.classList.remove("error"));

// 3.7 Clear all previous Links
clearButton.addEventListener("click", () => {
    tool.scrollIntoView({ behavior: "smooth" });
    input.value = "";
    localStorage.clear();
    allLinks.style.height = allLinks.scrollHeight + "px";
    allLinks.style.opacity = 0;
    clearButton.classList.add("inactive");
    setTimeout(() => {
        allLinks.innerHTML = "";
        allLinks.style.height = 0;
    }, 500);
});