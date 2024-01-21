getJsonData().then(allJsonData => {
    const macSectionData = allJsonData.macSectionData;
    const airpodsSectionData = allJsonData.airpodsSectionData;
    addProductsScreen(airpodsSection, airpodsSectionData)
    addProductsScreen(macSection, macSectionData)
})

const macSection = document.getElementById("mac")
const airpodsSection = document.getElementById("airpods")
const prodList = document.querySelector(".prod-list");
let prodListIndex = 0;

async function getJsonData() {
    return fetch('./data.json')
        .then(response => response.json())
        .then(data => data)
}

function addProductsScreen(element, jsonData) {
    element.innerHTML = `
          <h2>${jsonData.title}</h2>
          <div class="card-container">
          ${jsonData.products.map(product => `
            <div class="card">
            <img src="${product.imageSrc}" alt="${product.name}">
            <p><strong>${product.name}</strong></p>
            <p><strong>${product.price}</strong> USD</p>
            <div class="actions">
            <button class="primary">Buy</button>
            <button class="secondary">Details</button>
            </div>
            </div>
            `).join('')}
            </div>
            <div class="links">
            <a href="${jsonData.links[0].url}">${jsonData.links[0].text}</a>
            <a href="${jsonData.links[1].url}">${jsonData.links[1].text}</a>
            </div>
            `;
}

function handleSlideShowArrowClick(direction) {
    const childWidth = prodList.children[0].offsetWidth;
    if (prodList.children.length-1=== prodListIndex) {
        prodList.scrollTo({
            behavior: "smooth",
            left: 0
        })
        prodListIndex = 0;
        return;
    }
    prodList.scrollBy({
        behavior: "smooth",
        left: (direction * childWidth)
    })
    prodListIndex++;
}