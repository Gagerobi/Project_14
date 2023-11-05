//Declarations
const body = document.querySelector('body');
const main = document.querySelector('.main-text');
const modeToggle = document.getElementById('mode-toggle');
const modeStatus = document.querySelector('.mode-status');
const projects = document.querySelector('.project-container');

//updating clock
const clock = document.getElementById("clock");     //grabbed clock from my html

function updateTime() {
    const time = new Date();                        //created a new date called time
    let hour = time.getHours();                     //declared the hour, minute and second
    const minute = time.getMinutes();
    const second = time.getSeconds();
    let ampm = "AM";                                //using this to decide if it's am or pm

    if(hour > 12){                                  //using this if statement to change the clock from a 24 hour to a 12 hour
      hour -= 12;                                   //when the time hits 13, the time is subtracted by 12 = 1 and switches to PM
      ampm = "PM";
    }
    else{                                           //if the time is 12 or lower it stays AM
      ampm = "AM";
    }

    //i am using this to organize the way I want the time to show, .toString then .padStart to make sure 1pm would look like 01:00, rather than 1:00...
    const updateClock = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')} ${ampm}`;

    clock.innerText = updateClock;                  //sending the updated clock to the html in the top nav bar
}

updateTime();
setInterval(updateTime, 1000);                      //updating the time every second

//dark mode
let mode;
mode = localStorage.getItem('mode');

function toggleMode() {
  body.classList.toggle('dark-mode');
  if(main !== null) {
    main.classList.toggle('main-dark-mode');
  }
  
  if(projects !== null) {
    projects.classList.toggle('dark-project-container');
  }
  
  if(body.classList.contains('dark-mode')){
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", null);
  }
}
modeToggle.addEventListener('click', toggleMode);

function toggledDark() {
  if (localStorage.getItem("mode") === 'dark') {
    localStorage.setItem("mode", null);
    toggleMode();
  }
}

//slide in effect
const items = document.querySelectorAll('.item:not(:first-child)');
const options = {
  threshold: 0.5
}

function addSlideIn(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-in');
    }
  });
}

const observer = new IntersectionObserver(addSlideIn, options)

//hover text on images
items.forEach(item => {
  observer.observe(item);
});

$('#img-1').on('mouseover', function() {
  $('#img-text-1').fadeIn(10)
});

$('#img-1').on('mouseout', function() {
  $('#img-text-1').fadeOut(10)
});

$('#img-2').on('mouseover', function() {
  $('#img-text-2').fadeIn(10)
});

$('#img-2').on('mouseout', function() {
  $('#img-text-2').fadeOut(10)
});

$('#img-3').on('mouseover', function() {
  $('#img-text-3').fadeIn(10)
});

$('#img-3').on('mouseout', function() {
  $('#img-text-3').fadeOut(10)
});

//DOM elements for validation
const form = document.getElementById('form')
const submitButton = document.querySelector('.submit')
const successMessage = document.getElementById('form-submitted-msg')
const formElements = [ ...form.elements ]

const allInputsValid = () => {
  const valid = formElements.every((element) => {
      return element.checkValidity()
  })
  return valid
}

const handleChange = () => {
  formElements.forEach((element) => {
    if (!element.checkValidity()
          && element.nodeName !== 'BUTTON'
          && element.type !== 'radio'
    ) {
      element.style.borderColor = 'red'
      element.nextElementSibling.style.color = 'red'
      element.nextElementSibling.style.display = 'block'
      element.previousElementSibling.style.color = 'red'
    }
    if (element.checkValidity()
          && element.nodeName !== 'BUTTON'
          && element.type !== 'radio'
    ) {
      element.style.borderColor = '#CED4DA'
      element.nextElementSibling.style.color = '#CED4DA'
      element.nextElementSibling.style.display = 'none'
      element.previousElementSibling.style.color = '#212529'
    }
    if (!element.checkValidity()
          && (element.type === 'radio')
    ) {
      element.style.borderColor = 'red'
      element.nextElementSibling.style.color = 'red'
    }
    if (element.checkValidity()
          && (element.type === 'radio')
    ) {
      element.style.borderColor = '#CED4DA'
      element.nextElementSibling.style.color = '#212529'
    }
  })
  if (allInputsValid()) {
    submitButton.removeAttribute('disabled', '')
  } else {
    submitButton.setAttribute('disabled', '')
  }
}

function handleSubmit(event) {
  event.preventDefault()

  const data = new FormData(event.target);                  //created formdata
  const formJSON = Object.fromEntries(data.entries());      //pulled the keys and values from my form
  formJSON.purpose = data.getAll("purpose");                //radio with the name of purpose wouldn't send so I got it using .getAll
  const JSONdata = document.querySelector('.JSONdata div'); //assigned results to the div section of results
  const myJSON = JSON.stringify(formJSON, null, 2);         //assigned myJSON to formJSON stringify'd for JSON, added a space of 2 to make it look more clean
  JSONdata.innerText = myJSON;                              //added the text of myJSON to the results line in HTML
  
  if (allInputsValid()) {
    successMessage.style.display = 'block'
    form.reset()
    submitButton.setAttribute('disabled', '')
    setTimeout(() => {
      successMessage.style.display = 'none'
    }, 3000)
  }
}

formElements.forEach((element) => {
  element.addEventListener('change', handleChange)
})

form.addEventListener('submit', handleSubmit);