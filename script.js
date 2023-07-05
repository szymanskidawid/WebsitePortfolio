//Responsible for switching between dark and light mode.
function darkLightMode() {
  const body = document.body;
  const navBar = document.querySelector(".nav-bar");
  const footer = document.querySelector(".footer-section");
  const icons = document.getElementsByClassName("icon-change");

  body.classList.toggle("light-mode-body");
  navBar.classList.toggle("light-mode-nav-bar");
  footer.classList.toggle("light-mode-footer");

  const isLightMode = body.classList.contains("light-mode-body");

  for (let i = 0; i < icons.length; i++) {
    icons[i].className = isLightMode ? "icon-change fas fa-moon fa-beat" : "icon-change fas fa-sun fa-beat";
  }
}

//Responsible for page scrolling depending on which button has been clicked.
function pageScroll()
{
  const topScroll = 0;
  const aboutScroll = 870;
  const resumeScroll = 1730;
  const projectsScroll = 2580;

  const topButton = document.getElementsByClassName("top-button")[0];
  const aboutButton = document.getElementsByClassName("about-button")[0];
  const resumeButton = document.getElementsByClassName("resume-button")[0];
  const projectsButton = document.getElementsByClassName("projects-button")[0];

  scrollToPosition(topButton, topScroll);
  scrollToPosition(aboutButton, aboutScroll);
  scrollToPosition(resumeButton, resumeScroll);
  scrollToPosition(projectsButton, projectsScroll);
}

//Supporting function to pageScroll that reduces code duplication.
function scrollToPosition(button, scroll)
{
  button.addEventListener("click", function()
  {
    window.scrollTo({
      top: scroll,
      behavior: 'smooth'
    });
  });
}

//Function will take user to linked websites.
function websiteLinks()
{
  const mail = document.getElementsByClassName("icon-mail");
  const github = document.getElementsByClassName("icon-github");
  const linkedin = document.getElementsByClassName("icon-linkedin");

  //I need to have a for loop for each element as two each share a class.
  for (let i = 0; i < mail.length; i++)
  {
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

//Responsible for hide and display of projects using buttons.
function projectsDisplay() 
{
  const button1 = document.getElementsByClassName("project-button-1")[0];
  const button2 = document.getElementsByClassName("project-button-2")[0];
  const project1 = document.getElementsByClassName("project-1")[0];
  const project2 = document.getElementsByClassName("project-2")[0];

  button1.addEventListener('click', function() 
  {
    fadeOutAndIn(project2, project1)
  });

  button2.addEventListener('click', function() 
  {
    fadeOutAndIn(project1, project2)
  });
}

//Function responsible for Fade Out and Fade In of two containers.
function fadeOutAndIn (fadeOut, fadeIn)
{
  if (fadeOut.style.opacity !== '0') 
    {
      fadeOut.style.animation = 'fade-out 0.5s ease';
      
      setTimeout(function() 
      {
        fadeOut.style.display = 'none';
        fadeIn.style.display = 'grid';
        fadeIn.style.animation = 'fade-in 0.5s ease';
      }, 500);
    }
}

//Function responsible for text translations between English and Polish.
function toggleLanguage(language) 
{
  const englishBtn = document.getElementsByClassName("english-language-button")[0];
  const polishBtn = document.getElementsByClassName("polish-language-button")[0];

  languageBtnAnimation (englishBtn, polishBtn);
  languageBtnAnimation (polishBtn, englishBtn);

  const elements = document.getElementsByClassName('lang-toggle');

  fetch('languages.json')
    .then(response => response.json())
    .then(data => 
    {
      for (let i = 0; i < elements.length; i++) 
      {
        const element = elements[i];
        const key = element.getAttribute('data-key');
        const defaultText = data.english[key];
        const translatedText = data[language][key];

        if (translatedText) {
          element.innerHTML = translatedText;
          
        } else {
          element.textContent = defaultText;
        }
      }
    })

    .catch(error => 
    {
      console.error('Error loading language data:', error);
    });
}

//Supporting function to toggleLanguage that changes button animations.
function languageBtnAnimation (active, inactive)
{
  active.addEventListener("click", function()
  {
    active.classList.remove("inactive");
    inactive.classList.add("inactive");
  });
}