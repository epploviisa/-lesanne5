(function () {
    "use strict";

    //clock

  document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let ampm = h >= 12 ? "pm":"am";
            h = h%12;
            h = h?h:12;
            m = m<10?"0"+m:m;


            c.innerHTML = h + ":" + m + ":" + s + ampm;
            
        };
        
    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function hasNumber(myString) {
        return /\d/.test(myString);
    }

    function estimateDelivery(event) {
        event.preventDefault();

        let linn = document.getElementById("linn");

        if (linn.value === "") {

            alert("Palun valige linn nimekirjast");

            linn.focus();

            return;
        }
        const fname = document.getElementById("fname")
        const lname = document.getElementById("lname")
        if (!fname.value || !lname.value) {
            alert("Palun täitke nime väljad")
            return
        } if (hasNumber(fname.value) || hasNumber(lname.value)) {
            alert("Nimes ei tohi olla numbreid")
            return
        }
        const radios = document.querySelector('input[name="speed"]:checked');

        if (!radios) {
            alert("Palun valige kiirus")
            return
        }

        let value = 0
        if (linn.value === "tln") value = 0
        if (linn.value === "trt") value = 2.5
        if (linn.value === "nrv") value = 2.5
        if (linn.value === "prn") value = 3


        e.innerHTML = value + " &euro;";


        console.log("Tarne hind on arvutatud");
    }

})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {

    "use strict";

    let point1 = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );
    let point2 = new Microsoft.Maps.Location(
        59.4370,
        24.7536
    );

    let centerPoint = new Microsoft.Maps.Location(
        58.8,
        25.7
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    let infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox.setMap(map);
    let pushpin1 = new Microsoft.Maps.Pushpin(point1, {
        title: 'Tartu Ülikool',
    });
    let pushpin2 = new Microsoft.Maps.Pushpin(point2, {
        title: 'Tallinn',
    });
    pushpin1.metadata = {
        title: 'Tartu Ülikool',
        description: 'Ule keskmise hea kool'
    };
    pushpin2.metadata = {
        title: 'Tallinn',
        description: 'Mu pealinn'
    };
    function pushpinClicked(e) {
        if (e.target.metadata) {
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }
    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);
    map.entities.push(pushpin1);
    map.entities.push(pushpin2);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

