const url =
  "https://airbnb13.p.rapidapi.com/search-location?location=Paris&checkin=2023-10-22&checkout=2023-10-24&adults=1&children=0&infants=0&pets=0&page=1&currency=USD";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "502c163c67mshb1fac510a6733f4p1e6fb9jsn99c488e3e3e8",
    "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
  },
};

const monthMap = {
  0: "Jan",
  1: "Feb",
  2: "March",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

async function fetchData(options) {
  try {
    let location = localStorage.getItem("location");
    let checkInDate = localStorage.getItem("checkInDate");
    let checkOutDate = localStorage.getItem("checkOutDate");
    let guestCount = localStorage.getItem("guestCount");

    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${checkInDate}&checkout=${checkOutDate}&adults=${guestCount}&children=0&infants=0&pets=0&page=0&currency=USD`;

    const response = await fetch(url, options);
    const result = await response.json();

    const displayLocation = document.getElementById("location");
    const displayDate = document.getElementById("date");
    const displayguestCount = document.getElementById("guestCount");

    checkInDate = new Date(checkInDate);
    checkOutDate = new Date(checkOutDate);
    let month = monthMap[checkOutDate.getMonth()];

    displayLocation.innerText = location;
    displayDate.innerText = `${month} ${checkInDate.getDate()}-${checkOutDate.getDate()}`;
    displayguestCount.innerText = guestCount;

    let data = result.results;

    // console.log(data.length);
    // let iframe = document.getElementById("iframe");
    // iframe.src = `https://maps.google.com/maps?q=${location}%20Dates%20hotels&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed`;
    displayData(data);
  } catch (error) {
    console.error(error);
  }
}

function displayData(dataArray) {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  if (dataArray && dataArray.length > 0) {
    for (let i = 0; i < dataArray.length; i++) {
      let dataObject = dataArray[i];
      let cardDiv = createCard(dataObject);
      cardsContainer.appendChild(cardDiv);
    }
  } else {
    cardsContainer.innerHTML = "No results found.";
    console.log("No Data!")
  }
}

function createCard(dataObject) {
  // create div for card
  let cardDiv = document.createElement("div");
  cardDiv.className = "card";
  //   create image element
  let image = document.createElement("img");
  image.src = dataObject.images[0];

  cardDiv.appendChild(image);

  //   create a div for right section

  let div = document.createElement("div");

  let likeImage = document.createElement("img");
  likeImage.src = "./assets/experiences/heart.svg";
  likeImage.id = "like";

  let divChild1 = document.createElement("div");

  let divChild1p1 = document.createElement("p");
  divChild1p1.innerText = dataObject.type;
  divChild1p1.className = "type";

  let divChild1p2 = document.createElement("p");
  divChild1p2.innerText = dataObject.name;
  divChild1p2.className = "title";

  divChild1.append(divChild1p1, divChild1p2);

  //   create ul
  let ul = document.createElement("ul");

  for (let i = 0; i < dataObject.previewAmenities.length; i++) {
    let li = document.createElement("li");
    li.innerText = dataObject.previewAmenities[i];
    ul.appendChild(li);
  }
  let li1 = document.createElement("li");
  li1.innerText = `${dataObject.bedrooms} bedrooms`;

  ul.appendChild(li1);

  //   create divChild2
  let divChild2 = document.createElement("div");
  divChild2.className = "card-row-3";

  let divChild2Child1 = document.createElement("div");

  let divChild2Child1p1 = document.createElement("p");
  divChild2Child1p1.innerText = dataObject.rating;

  let divChild2Child1Image = document.createElement("img");
  divChild2Child1Image.src = "./assets/experiences/star.svg";

  let divChild2Child1p2 = document.createElement("p");
  divChild2Child1p2.innerText = `(${dataObject.reviewsCount} reviews)`;

  divChild2Child1.append(
    divChild2Child1p1,
    divChild2Child1Image,
    divChild2Child1p2
  );

  let divChild2Child2 = document.createElement("div");
  divChild2Child2.innerHTML = `$<span class="price">${dataObject.price.rate}</span> /night`;

  divChild2.append(divChild2Child1, divChild2Child2);

  div.append(likeImage, divChild1, ul, divChild2);

  cardDiv.appendChild(div);

  return cardDiv;
}

fetchData(options);
