openTab = function(evt, tabName)
{
    "use strict"
    let tabContent, tabLinks;

    tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    tabLinks = document.getElementsByClassName("tab-links");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    if(tabName == 'main-tab' || tabName == 'weapons-tab')
    {
        document.getElementById(tabName).style.display= 'grid';
    }
    else
    {
        document.getElementById(tabName).style.display = "block";
    }
    evt.currentTarget.className += " active";
}