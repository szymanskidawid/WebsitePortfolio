//Responsible for switching between dark and light mode.
function darkLightMode() 
{
  const body = document.body;
  const navBar = document.querySelector(".nav-bar");
  const icon = document.getElementById("icon-change");

  body.classList.toggle("light-mode-body");
  navBar.classList.toggle("light-mode-nav-bar");

  const isLightMode = body.classList.contains("light-mode-body");

  icon.className = isLightMode ? "fas fa-moon fa-beat" : "fas fa-sun fa-beat";
}

//Responsible for page scrolling depending on which button has been clicked.
function pageScroll()
{
  const topScroll = 0;
  const aboutScroll = 500;
  const resumeScroll = 1000;
  const projectsScroll = 1500;

  const topButton = document.getElementsByClassName("top-button")[0];
  const aboutButton = document.getElementsByClassName("about-button")[0];
  const resumeButton = document.getElementsByClassName("resume-button")[0];
  const projectsButton = document.getElementsByClassName("projects-button")[0];

  ScrollToPosition(topButton, topScroll);
  ScrollToPosition(aboutButton, aboutScroll);
  ScrollToPosition(resumeButton, resumeScroll);
  ScrollToPosition(projectsButton, projectsScroll);
}

//Supporting function to pageScroll that reduces code duplication.
function ScrollToPosition(button, scroll)
{
  button.addEventListener("click", function()
  {
    window.scrollTo({
      top: scroll,
      behavior: 'smooth'
    });
  });
}