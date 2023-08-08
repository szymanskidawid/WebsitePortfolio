// Responsible for switching between dark and light mode.
function darkLightMode() 
{
  //Get references to website's sections and objects.
  const body = document.body;
  const navBar = document.querySelector(".nav-bar");
  const footer = document.querySelector(".footer-section");
  const icons = document.getElementsByClassName("icon-change");
  const sections = document.querySelectorAll(".section");
  const sectionHeaders = document.querySelectorAll(".section-headers");
  const cvLink = document.querySelectorAll(".resume-cv-link");
  const repoLink = document.querySelectorAll(".project-repo-button");
  const zoomText = document.querySelectorAll(".project-zoom-info");

  //Get reference to a colour change button.
  const colourButton = document.querySelector(".color-mode-button");

  //Code below will trigger upon button click.
  colourButton.addEventListener("click", function()
  {
    //Using CSS visuals in general.css file.
    body.classList.toggle("light-mode-body");
    navBar.classList.toggle("light-mode-nav-bar");
    footer.classList.toggle("light-mode-footer");

    //Loops are needed as there are multiple objects with the same classes.
    for (let i = 0; i < sections.length; i++)
    {
      sections[i].classList.toggle("light-mode-sections");
    }

    for (let i = 0; i < sectionHeaders.length; i++)
    {
      sectionHeaders[i].classList.toggle("light-mode-header-borders");
    }

    for (let i = 0; i < cvLink.length; i++)
    {
      cvLink[i].classList.toggle("light-mode-cv-link");
    }

    for (let i = 0; i < repoLink.length; i++)
    {
      repoLink[i].classList.toggle("light-mode-repo-link");
    }

    for (let i = 0; i < zoomText.length; i++)
    {
      zoomText[i].classList.toggle("light-mode-zoom-text");
    }

    //Bolean that returns if Light Mode is on or off.
    const isLightMode = body.classList.contains("light-mode-body");

    //Loop that switches icons depending on which mode is active.
    for (let i = 0; i < icons.length; i++) 
    {
      icons[i].className = isLightMode ? "icon-change fas fa-moon fa-beat" : "icon-change fas fa-sun fa-beat";
    }
  });
}

// Responsible for page scrolling depending on which button has been clicked.
function pageScroll()
{
  //Get references to nav-bar buttons.
  const topButton = document.querySelector(".top-button");
  const aboutButton = document.querySelector(".about-button");
  const resumeButton = document.querySelector(".resume-button");
  const projectsButton = document.querySelector(".projects-button");

  //Set value to a variable used by "Top" button.
  const topPosition = 0;

  //Function that returns fresh NavBar height calculation.
  const CalculateNavBarHeight = () => 
  {
    return document.querySelector(".nav-bar").offsetHeight;
  }

  //Code below will trigger upon button click.
  topButton.addEventListener("click", function() 
  {
    window.scrollTo(
    {
      top: topPosition,
      behavior: "smooth"
    });
  });

  //Code below will trigger upon button click.
  aboutButton.addEventListener("click", function() 
  {
    //Get references to website sections.
    const aboutPosition = document.querySelector(".welcome-section");

    //Get a reference of navBar height to a variable.
    const navBarHeight = CalculateNavBarHeight();

    window.scrollTo(
    {
      top: aboutPosition.offsetTop + aboutPosition.offsetHeight - navBarHeight,
      behavior: "smooth"
    });
  });

  //Code below will trigger upon button click.
  resumeButton.addEventListener("click", function() 
  {
    //Get references to website sections.
    const resumePosition = document.querySelector(".about-section");

    //Get a reference of navBar height to a variable.
    const navBarHeight = CalculateNavBarHeight();

    window.scrollTo(
      {
        top: resumePosition.offsetTop + resumePosition.offsetHeight - navBarHeight,
        behavior: "smooth"
      });
  });

  //Code below will trigger upon button click.
  projectsButton.addEventListener("click", function() 
  {
    //Get references to website sections.
    const projectsPosition = document.querySelector(".resume-section");

    //Get a reference of navBar height to a variable.
    const navBarHeight = CalculateNavBarHeight();

    window.scrollTo(
      {
        top: projectsPosition.offsetTop + projectsPosition.offsetHeight - navBarHeight,
        behavior: "smooth"
      });
  });
}

// Function will take user to linked websites.
function websiteLinks()
{
  //Get references to icon buttons.
  const mail = document.getElementsByClassName("icon-mail");
  const github = document.getElementsByClassName("icon-github");
  const linkedin = document.getElementsByClassName("icon-linkedin");

  //Need to have a for loop for each element as two each share one class.
  for (let i = 0; i < mail.length; i++)
  {
    //Button click will open a passed website in a new window.
    mail[i].addEventListener("click", function ()
    {
      window.open("mailto:dawidszymanski.dev@outlook.com", "_blank");
    });
  }

  for (let i = 0; i < github.length; i++)
  {
    github[i].addEventListener("click", function ()
    {
      window.open("https://www.github.com/szymanskidawid", "_blank");
    });
  }
  
  for (let i = 0; i < linkedin.length; i++)
  {
    linkedin[i].addEventListener("click", function ()
    {
      window.open("https://www.linkedin.com/in/dawid-szymański-15049a238", "_blank");
    });
  }
}

// Function will take user to linked repositories.
function repositoryLinks()
{
  //Get references to buttons.
  const repoProject1 = document.getElementById("repo-btn-1");
  const repoProject2 = document.getElementById("repo-btn-2");

  //Button click will open a passed website in a new window.
  repoProject1.addEventListener("click", function ()
  {
    window.open("https://github.com/szymanskidawid/WebsitePortfolio", "_blank");
  });

  repoProject2.addEventListener("click", function ()
  {
    window.open("https://github.com/szymanskidawid/EmployeeManagement", "_blank");
  });
}

// Function responsible for text translations between English and Polish.
function toggleLanguage(language) 
{
  //Get references to language buttons.
  const englishBtn = document.getElementsByClassName("english-language-button")[0];
  const polishBtn = document.getElementsByClassName("polish-language-button")[0];

  //Usage of function "languageBtnAnimation" for grayscale animation (both ways).
  languageBtnAnimation(englishBtn, polishBtn);
  languageBtnAnimation(polishBtn, englishBtn);

  //Stores references to all elements with a special class added to all text that require translations.
  const elements = document.getElementsByClassName('lang-toggle');

  //Fetch translations from JSON file.
  fetch('languages.json').then(response => response.json()).then(data => 
  {
    //Loop through all text that contains "lang-toggle" class.
    for (let i = 0; i < elements.length; i++) 
    {
      //Represents each individual element with "lang-toggle" class.
      const element = elements[i];
      //Each translated text received a "data-key" that has assigned English and Polish text in JSON file.
      const key = element.getAttribute('data-key');
      //Stores default language values.s
      const defaultText = data.english[key];
      //Stores translated (Polish) language values.
      const translatedText = data[language][key];

      if (translatedText) 
      {
        //Update language if translatedText exists.
        element.innerHTML = translatedText;
      } 

      else 
      {
        //Use default English text if not.
        element.textContent = defaultText;
      }
    }
  })
}

// Supporting function to toggleLanguage that changes button animations.
function languageBtnAnimation (active, inactive)
{
  //Button click will make the other button "inactive".
  active.addEventListener("click", function()
  {
    active.classList.remove("inactive");
    inactive.classList.add("inactive");
  });
}

// Responsible for hide and display of resumes using buttons.
function resumeDisplay()
{
  //Get references to language buttons that will be used to determine which resume is displayed.
  const englishBtn = document.getElementsByClassName("english-language-button")[0];
  const polishBtn = document.getElementsByClassName("polish-language-button")[0];

  //Get references to resume containers.
  const resumeEng = document.getElementById("resume-eng");
  const resumePl = document.getElementById("resume-pl");

  //Button click will trigger a function "fadeOutAndIn" that reduces code duplication.
  englishBtn.addEventListener('click', function() 
  {
    fadeOutAndIn(resumePl, resumeEng)
  });

  polishBtn.addEventListener('click', function() 
  {
    fadeOutAndIn(resumeEng, resumePl)
  });
}

// Responsible for hide and display of projects using buttons.
function projectsDisplay() 
{
  //Get references to buttons and project containers.
  const button1 = document.getElementsByClassName("project-button-1")[0];
  const button2 = document.getElementsByClassName("project-button-2")[0];
  const project1 = document.getElementById("project-1");
  const project2 = document.getElementById("project-2");

  //Button click will trigger a function "fadeOutAndIn" that reduces code duplication.
  button1.addEventListener('click', function() 
  {
    fadeOutAndIn(project2, project1)
  });

  button2.addEventListener('click', function() 
  {
    fadeOutAndIn(project1, project2)
  });
}

// Function responsible for Fade Out and Fade In of two containers.
function fadeOutAndIn (fadeOut, fadeIn)
{
  //Code triggers when first passed project (fadeOut) is currently visible.
  if (fadeOut.style.opacity !== '0') 
  {
    //First passed project will fade out.
    fadeOut.style.animation = 'fade-out 0.5s ease';
    
    //Code triggers after 0.5s delay.
    setTimeout(function() 
    {
      //First project disappears while second slowly appears.
      fadeOut.style.display = 'none';
      fadeIn.style.display = 'flex';
      fadeIn.style.animation = 'fade-in 0.5s ease';
    }, 500);
  }
}

// Below code executed after HTML script is fully parsed.
// Additionally used to load functions after page open/refresh so that first button click trigger properly.
document.addEventListener('DOMContentLoaded', function() 
{
  darkLightMode();
  pageScroll();
  websiteLinks();
  repositoryLinks();
  toggleLanguage("english");
  resumeDisplay();
  projectsDisplay();

  //Added button click events to Language Buttons.
  document.querySelector(".english-language-button").addEventListener("click", function() {
    toggleLanguage('english');
  });
  
  document.querySelector(".polish-language-button").addEventListener("click", function() {
    toggleLanguage('polish');
  });
});