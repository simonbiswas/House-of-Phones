// Phone Search
const phoneSearch = () => {
    const searchResult = document.getElementById('display');
    searchResult.textContent = "";  //deleting previous grid serach result(if any)  
    let displayInfo = document.getElementById('show_details');
    displayInfo.textContent = "";  //deleting previous top window phone details search result(if any)
    const p = document.getElementById('search_input').value;
    const inputText = p.toLowerCase();
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText} `;
    fetch(url)
        .then(response => response.json())
        .then(data => errorChecking(data))
}

// error checking
const errorChecking = (data) => {
    if (data.status === false) {
        alert("Your search product cannot be found.");
        document.getElementById('search_input').value = "";
    }
    else {
        //console.log(Object.keys(data.data).length);
        display(data.data.slice(0, 20));
    }
}

// display products in grids
const display = (data) => {
    const searchResult = document.getElementById('display');
    searchResult.textContent = "";  //deleting previous grid serach result(if any)
    data.forEach(data => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card container-fluid b2 mt-4 pt-2 display_border ">
        <img src="${data.image}" class="card-img-top text-center" alt="...">
        <div class="card-body">
          <h5 class="card-title">Model: ${data.phone_name}</h5>
          <p class="card-text">Brand: ${data.brand}</p>
          <button onclick="phoneDetail('${data.slug}','${data.phone_name}')" class="btn btn-primary">See Details</button>
        </div>
      </div> `;
        searchResult.appendChild(div);

    })
};

// show details (fetching the details part of the phone through API)
const phoneDetail = (detail, model) => {
    let url = `https://openapi.programming-hero.com/api/phone/${detail}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data, model))
}

// show details in top of the window
const displayDetails = (data, model) => {
    console.log(data);
    let displayInfo = document.getElementById('show_details');
    displayInfo.textContent = "";  //deleting previous top window phone details search result(if any)
    let div = document.createElement('div');
    div.innerHTML = `
    <div class="card h-50">
      <img src="${data.data.image}" class="card-img-top w-25 h-25 m-2" alt="...">
      <div id="whole">
      <h5 class="card-title text-center text-danger">Model: ${model}</h5>
      <p class="card-text text-center">Brand: ${data.data.brand}</p>
      <ul class="">
      <span class="fw-bold text-primary">Main Features:</span>
      <li><span class="fw-bold">chipset: </span> ${data.data.mainFeatures.chipSet}</li>
      <li><span class="fw-bold">display size: </span> ${data.data.mainFeatures.displaySize}</li>
      <li><span class="fw-bold">memory: </span> ${data.data.mainFeatures.memory}</li>
      <li><span class="fw-bold">sensors: </span> ${data.data.mainFeatures.sensors ? data.data.mainFeatures.sensors : "No information found"}</li>
      </ul>
      <p id="other"></ul>
     </div>
   </div> `
    displayInfo.appendChild(div);
    if (data.data.others !== undefined) {
        let p = document.getElementById('other');
        const ul = document.createElement('ul');
        ul.innerHTML = `
        <span class="fw-bold text-primary">Other Features:</span>
        <li><span class="fw-bold text-black">Bluetooth: </span> ${data.data.others.Bluetooth ? data.data.others.Bluetooth : "No information found"}</li>
        <li><span class="fw-bold text-black">GPS: </span> ${data.data.others.GPS ? data.data.others.GPS : "No information found"}</li>
        <li><span class="fw-bold text-black">USB: </span> ${data.data.others.USB ? data.data.others.USB : "No information found"}</li>
        <li><span class="fw-bold text-black">NFC: </span> ${data.data.others.NFC ? data.data.others.NFC : "No information found"}</li>
        <li><span class="fw-bold text-black">Radio: </span> ${data.data.others.Radio ? data.data.others.Radio : "No information found"}</li>
        <li><span class="fw-bold text-black">WLAN: </span> ${data.data.others.WLAN ? data.data.others.WLAN : "No information found"}</li>
        <li><span class="fw-bold text-black">release date: </span> ${data.data.others.releaseDate ? data.data.others.releaseDate : "No  release date found"}</li>
        `
        let m = document.getElementById('whole');
        m.appendChild(ul);
        // displayInfo.appendChild(div);
    }
    displayInfo.appendChild(div);


}




