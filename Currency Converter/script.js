const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const API_KEY = "12bf0bb644d6af229f722504";

// Populate dropdown options from countryList
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = `${currCode} - ${countryList[currCode]}`; // Show code and country name
        newOption.value = currCode;

        // Set default selections
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }

        select.appendChild(newOption);
    }

    // Add event listener to update the flag on selection change
    select.addEventListener("change", function (evt) {
        updateFlag(evt.target);
    });
}

// Function to update the flag dynamically
const updateFlag = function (element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.closest(".select-container").querySelector("img");
    img.src = newSrc;
};

// Initialize flags on page load based on default selected currency
updateFlag(fromCurr); // Update flag for "from" currency
updateFlag(toCurr); // Update flag for "to" currency

btn.addEventListener("click", function (evt) {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async function () {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    try {
        // Dynamically set the base currency from the "from" currency select dropdown
        const baseCurrency = fromCurr.value; // Get selected base currency
        const URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`;

        let response = await fetch(URL);

        if (!response.ok) {
            throw new Error("Failed to fetch exchange rates.");
        }

        let data = await response.json();

        // Check if the API returns the conversion rates
        if (data && data.conversion_rates) {
            const exRate = data.conversion_rates[toCurr.value];

            // Calculate the total exchange rate and format it to 3 decimal places
            const totalExRate = (amtVal * exRate).toFixed(3);

            // Display the result
            msg.innerText = `${amtVal} ${fromCurr.value} = ${totalExRate} ${toCurr.value}`;
        } else {
            msg.innerText = "Exchange rate data not available.";
        }
    } catch (error) {
        console.error(error);
        msg.innerText = "Error fetching exchange rates. Please try again.";
    }
};
