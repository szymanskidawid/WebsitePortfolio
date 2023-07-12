// Responsible for switching between dark and light mode.
function darkLightMode() {
  //Get references to website sections.
  const body = document.body;
  const navBar = document.querySelector(".nav-bar");
  const footer = document.querySelector(".footer-section");
  const icons = document.getElementsByClassName("icon-change");
  const sections = document.querySelectorAll("#section");

  //Using CSS visuals in general.css file.
  body.classList.toggle("light-mode-body");
  navBar.classList.toggle("light-mode-nav-bar");
  footer.classList.toggle("light-mode-footer");

  //Loop needed as there are multiple sections with the same id.
  for (let i = 0; i < sections.length; i++)
  {
    sections[i].classList.toggle("light-mode-sections");
  }
  
  const isLightMode = body.classList.contains("light-mode-body");

  for (let i = 0; i < icons.length; i++) {
    icons[i].className = isLightMode ? "icon-change fas fa-moon fa-beat" : "icon-change fas fa-sun fa-beat";
  }
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
  //Get references to website sections.
  const aboutPosition = document.querySelector(".welcome-section");
  const resumePosition = document.querySelector(".about-section");
  const projectsPosition = document.querySelector(".resume-section");

  //Get a reference of navBar height to a variable that can be used to determine exact scroll position.
  const navBarHeight = document.querySelector(".nav-bar")

  //Usage of a function "scrollToPosition" to avoid code duplication.
  scrollToPosition(topButton, topPosition);
  scrollToPosition(aboutButton, aboutPosition.offsetTop + aboutPosition.offsetHeight - navBarHeight.offsetHeight);
  scrollToPosition(resumeButton, resumePosition.offsetTop + resumePosition.offsetHeight - navBarHeight.offsetHeight);
  scrollToPosition(projectsButton, projectsPosition.offsetTop + projectsPosition.offsetHeight - navBarHeight.offsetHeight);
}

// Supporting function to pageScroll that reduces code duplication.
function scrollToPosition(button, position) 
{
  //Button click will trigger a smooth scroll to passed position.
  button.addEventListener("click", function() 
  {
    window.scrollTo(
    {
      top: position,
      behavior: "smooth"
    });
  });
}

//Function will take user to linked websites.
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
      window.open("https://github.com/szymanskidawid", "_blank");
    });
  }
  
  for (let i = 0; i < linkedin.length; i++)
  {
    linkedin[i].addEventListener("click", function ()
    {
      window.open("https://linkedin.com", "_blank");
    });
  }
}

//Function will take user to linked repositories.
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

//Responsible for hide and display of projects using buttons.
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
        fadeIn.style.display = 'grid';
        fadeIn.style.animation = 'fade-in 0.5s ease';
      }, 500);
    }
}

// Function responsible for text translations between English and Polish.
function toggleLanguage(language) 
{
  //Get references to language buttons.
  const englishBtn = document.getElementsByClassName("english-language-button")[0];
  const polishBtn = document.getElementsByClassName("polish-language-button")[0];

  //Usage of function "languageBtnAnimation" for grayscale animation (both ways).
  languageBtnAnimation (englishBtn, polishBtn);
  languageBtnAnimation (polishBtn, englishBtn);

  //Stores references to all elements with a special class added to all text that require translations.
  const elements = document.getElementsByClassName('lang-toggle');

  //Fetch translations from JSON file.
  fetch('languages.json')
    .then(response => response.json())
    .then(data => 
    {
      //Loop through all text that contains "lang-toggle" class.
      for (let i = 0; i < elements.length; i++) 
      {
        //Represents each individual element with "lang-toggle" class.
        const element = elements[i];
        //Each translated text received a "data-key" that has assigned English and Polish text in JSON file.
        const key = element.getAttribute('data-key');
        //Stores default language values.
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

    //Safety catch block that will provide an error if there is a translation problem.
    .catch(error => 
    {
      console.error('Error loading language data:', error);
    });
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