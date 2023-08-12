import express, { application } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather?q=Bangladesh,dhaka&appid=7c121b68272e769f54cfa5e40db4989b&units=metric"
        );
        const result = response.data;
        console.log(result)
        const temp = result.main.temp;
        const icon = result.weather[0].icon;
        const countryesName = result.name;
        const main = result.weather[0].main;
        const description = result.weather[0].description;
        const tempMin = result.main.temp_min;
        const tempMax = result.main.temp_max;
        const weatherIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        res.render("index.ejs", {
            temp: temp,
            icon: weatherIcon,
            countryesName: countryesName,
            main: main,
            description: description,
            temp_min: tempMin,
            temp_max: tempMax
        });
    } catch (error) {
        console.error(error.message);
    }
});

app.post("/", async (req, res) => {
    try {
        let countryName = req.body.countryName;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=7c121b68272e769f54cfa5e40db4989b&units=metric`
        );
        const result = response.data;
        const temp = result.main.temp;
        const icon = result.weather[0].icon;
        const countryesName = result.name;
        const main = result.weather[0].main;
        const description = result.weather[0].description;
        const tempMin = result.main.temp_min;
        const tempMax = result.main.temp_max;
        const weatherIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        res.render("index.ejs", {
            temp: temp,
            icon: weatherIcon,
            countryesName: countryesName,
            main: main,
            description: description,
            temp_min: tempMin,
            temp_max: tempMax
        });
    } catch(error) {
        console.error("There is an error", error.message);
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});