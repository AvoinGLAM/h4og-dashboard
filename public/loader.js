var loaderRoot = 'https://hack4openglam-visualization-dev.hannolainen.com';
var loadJS = function (url, implementationCode) {
    var scriptTag = document.createElement("script");
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    document.head.appendChild(scriptTag);
};
var el = document.getElementById("hack4openglam-visualization");
el.innerHTML =
    '<div style="text-align: center;"><img src="' + loaderRoot + '/loader.gif" width="32" id="hack4openglam-visualization-loading"></div>';
fetch(loaderRoot)
    .then(response => response.text())
    .then(html => {
        loadJS(
            "https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.2/web-animations.min.js"
        );
        loadJS("https://kit.fontawesome.com/df830c3146.js");
        loadJS(
            "https://cdn.jsdelivr.net/gh/haltu/muuri@0.9.3/dist/muuri.min.js",
            function () {
                el.innerHTML +=
                    '<div id="hack4openglam-visualization-app" style="visibility: hidden;">' +
                    html +
                    "</div>";
                document.getElementById('hack4openglam-visualization').closest('.column').style.paddingLeft = '0'
                document.getElementById('hack4openglam-visualization').closest('.column').style.paddingRight = '0'

                loadJS(
                    loaderRoot + "/script.js",
                    function () {
                        grid.layout(function (items, hasLayoutChanged) {
                            document.getElementById(
                                "hack4openglam-visualization-loading"
                            ).style.display = "none";
                            document.getElementById(
                                "hack4openglam-visualization-app"
                            ).style.visibility = "visible";
                        });
                    }
                );
            }
        );
    })
    .catch(error => {
        console.warn(error);
    });