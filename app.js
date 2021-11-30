const express = require("express");
var app = express();
const https = require("https");
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {

    var cityName = req.body.city;
    console.log("The city name is: " + cityName);
    var apiKey = "6c8041f8692e6fb9ef9881a4dc91596a";
    var unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    const url2 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&unit=" + unit
    console.log(url2);
    // app.get('/', (req, res) => {
    https.get(url2, function (response) {
        //console.log(response);

        response.on("data", function (data) {
            var data = JSON.parse(data);
            console.log(data)
            var temp = data.main.temp
            var discription = data.weather[0].description;
            var icon = data.weather[0].icon;
            var imageUrl = "openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(discription);
            res.write("<p>The weather discription is " + discription + "</p>")
            res.write("<h1> The temp in " + cityName + " is " + temp + "</h1>");
            res.write("<img src =" + imageUrl + ">");
            res.send();
        });

    });


    // });

    console.log("POST RECEIVED")
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});