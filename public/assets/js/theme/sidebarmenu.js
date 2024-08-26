var at = document.documentElement.getAttribute("data-layout");

function getModuleName(url) {
    const parts = url.split('/');
    return parts[parts.length - 2]; // Get the second last part of the URL
}

if ((at = "vertical")) {

    function findMatchingElement() {
        var currentUrl = window.location.href;
        var anchors = document.querySelectorAll("#sidebarnav a");
        for (var i = 0; i < anchors.length; i++) {
            if (getModuleName(currentUrl).includes(getModuleName(anchors[i].href))) {
                return anchors[i];
            }
        }
        return null;
    }

    var elements = findMatchingElement();

    if (elements) {
        elements.classList.add("active");
    }

    document.querySelectorAll("ul#sidebarnav ul li a.active").forEach(function (link) {
        link.closest("ul").classList.add("in");
        link.closest("ul").parentElement.classList.add("selected");
    });

    document.querySelectorAll("#sidebarnav li").forEach(function (li) {
        const isActive = li.classList.contains("selected");
        if (isActive) {
            const anchor = li.querySelector("a");
            if (anchor) {
                anchor.classList.add("active");
            }
        }
    });

    document.querySelectorAll("#sidebarnav a").forEach(function (link) {
        link.addEventListener("click", function (e) {
            const isActive = this.classList.contains("active");
            const parentUl = this.closest("ul");
            if (!isActive) {
                parentUl.querySelectorAll("ul").forEach(function (submenu) {
                    submenu.classList.remove("in");
                });
                parentUl.querySelectorAll("a").forEach(function (navLink) {
                    navLink.classList.remove("active");
                });

                const submenu = this.nextElementSibling;
                if (submenu) {
                    submenu.classList.add("in");
                }
                this.classList.add("active");
            } else {
                this.classList.remove("active");
                parentUl.classList.remove("active");
                const submenu = this.nextElementSibling;
                if (submenu) {
                    submenu.classList.remove("in");
                }
            }
        });
    });
}

if ((at = "horizontal")) {
    function findMatchingElement() {
        var currentUrl = window.location.href;
        var anchors = document.querySelectorAll("#sidebarnavh ul#sidebarnav a");
        for (var i = 0; i < anchors.length; i++) {
            if (anchors[i].href === currentUrl) {
                return anchors[i];
            }
        }
        return null;
    }
    var elements = findMatchingElement();

    if (elements) {
        elements.classList.add("active");
    }

    document.querySelectorAll("#sidebarnavh ul#sidebarnav a.active").forEach(function (link) {
        link.closest("a").parentElement.classList.add("selected");
        link.closest("ul").parentElement.classList.add("selected");
    });
}
