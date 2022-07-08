// WALKING 
get current location
const walkingStartBtn = document.getElementById('walking-start-btn');
walkingStartBtn.addEventListener('click', () => {
    // console.log('clicked');
    var startPos;
    navigator.geolocation.getCurrentPosition(function (position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    })

    navigator.geolocation.watchPosition(function (position) {
        document.getElementById('currentLat').innerHTML = position.coords.latitude;
        document.getElementById('currentLon').innerHTML = position.coords.longitude;
        document.getElementById('distance-walking').innerHTML =
            calculateDistance(startPos.coords.latitude, startPos.coords.longitude,
                position.coords.latitude, position.coords.longitude);
    });
}, false);

function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return parseFloat(d).toFixed(1);
}
Number.prototype.toRad = function () {
    return this * Math.PI / 180;
}

const walkingStopBtn = document.getElementById('walking-stop-btn');
walkingStopBtn.addEventListener('click', () => {
    const watchID = navigator.geolocation.watchPosition((position) => {
        doSomething(position.coords.latitude, position.coords.longitude);
    });

    navigator.geolocation.clearWatch(watchID);
    // console.log('stopped')
    document.getElementById('geo-walk-input').value = document.getElementById('distance-walking').innerText
}, false);

// error handling
window.onload = function () {
    var startPos;
    navigator.geolocation.getCurrentPosition(function (position) {
    }, function (error) {
        alert('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from locaton provider)
        //   3: timed out
    });
};

//CYCLING
get current location
const cyclingStartBtn = document.getElementById('cycling-start-btn');
cyclingStartBtn.addEventListener('click', () => {
    // console.log('clicked');
    var startPos;
    navigator.geolocation.getCurrentPosition(function (position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    })

    navigator.geolocation.watchPosition(function (position) {
        document.getElementById('currentLat').innerHTML = position.coords.latitude;
        document.getElementById('currentLon').innerHTML = position.coords.longitude;
        document.getElementById('distance-cycling').innerHTML =
            calculateDistance(startPos.coords.latitude, startPos.coords.longitude,
                position.coords.latitude, position.coords.longitude);
    });
}, false);

function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return parseFloat(d).toFixed(1);
}
Number.prototype.toRad = function () {
    return this * Math.PI / 180;
}

const cyclingStopBtn = document.getElementById('cycling-stop-btn');
cyclingStopBtn.addEventListener('click', () => {
    const watchID = navigator.geolocation.watchPosition((position) => {
        doSomething(position.coords.latitude, position.coords.longitude);
    });

    navigator.geolocation.clearWatch(watchID);
    // console.log('stopped')
    document.getElementById('geo-cycle-input').value = document.getElementById('distance-cycling').innerText
}, false);

// error handling
window.onload = function () {
    var startPos;
    navigator.geolocation.getCurrentPosition(function (position) {
    }, function (error) {
        alert('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from locaton provider)
        //   3: timed out
    });
};

// PUBLIC TRANSPORT

const publicStartBtn = document.getElementById('public-start-btn');
publicStartBtn.addEventListener('click', () => {
    // console.log('clicked');
    var startPos;
    navigator.geolocation.getCurrentPosition(function (position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    })

    navigator.geolocation.watchPosition(function (position) {
        document.getElementById('currentLat').innerHTML = position.coords.latitude;
        document.getElementById('currentLon').innerHTML = position.coords.longitude;
        document.getElementById('distance-public').innerHTML =
            calculateDistance(startPos.coords.latitude, startPos.coords.longitude,
                position.coords.latitude, position.coords.longitude);
    });
}, false);

function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return parseFloat(d).toFixed(1);
}
Number.prototype.toRad = function () {
    return this * Math.PI / 180;
}

const publicStopBtn = document.getElementById('public-stop-btn');
publicStopBtn.addEventListener('click', () => {
    const watchID = navigator.geolocation.watchPosition((position) => {
        doSomething(position.coords.latitude, position.coords.longitude);
    });

    navigator.geolocation.clearWatch(watchID);
    // console.log('stopped')
    document.getElementById('geo-public-input').value = document.getElementById('distance-public').innerText
}, false);

// error handling
window.onload = function () {
    var startPos;
    navigator.geolocation.getCurrentPosition(function (position) {
    }, function (error) {
        alert('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from locaton provider)
        //   3: timed out
    });
};