/* Global Variables */

//================================ Target all divs we need in html file =======================//
var date = document.getElementById('date');
var temp = document.getElementById('temp');
var contentText = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
var CurrentDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


// Api key caredenalities 
const apiToken = '74112b5c0384890639c0d0f82633bfa1';


// Target button generate result
const generateBtn = document.getElementById('generate');

generateBtn.addEventListener('click', async () => {
    const content = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;

    if (!zipCode) {
        alert('please insert zip code first');
    };

    // Api URL 
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiToken}&units=metric`);
    response = await response.json();
    const temperature = response.main.temp;

    //=================== Send a post request to our route ===========//
    await fetch('/postData', {
        method: 'POST',
        headers: { 'content-type': 'Application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
            CurrentDate,
            temperature,
            content
        })
    });


    //=================== Get Data we need to use ===============//
    let resData = await fetch('/getDate', {credentials: 'same-origin'});

    resData = await resData.json();
    console.log('response data => ', resData);
    date.innerText = `The Current Date Is : ${resData.CurrentDate}`;
    temp.innerText = `Temp is equal : ${resData.temperature}C`;
    contentText.innerText = `Today's weather : ${resData.content}`;

});








