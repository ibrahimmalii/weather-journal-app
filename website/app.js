/* Global Variables */

//================================ Target all divs we need in html file =======================//
var date = document.getElementById('date');
var temp = document.getElementById('temp');
var contentText = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();

//====================== Because months started with index 0 ====================================//
let month = d.getMonth() + 1;
var CurrentDate = month + '.' + d.getDate() + '.' + d.getFullYear();


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
    date.innerHTML = `<p>The Current Date Is : ${resData.CurrentDate}</p>`;
    temp.innerHTML = `<p>Temp is equal : ${resData.temperature}C</p>`;
    contentText.innerHTML = `<p>Today's weather : ${resData.content}</p>`;

});








