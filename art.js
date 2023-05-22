
const art_container = document.querySelector('.art_container');
const search_input = document.querySelector('.search-input');
const loader = document.querySelector('.loader');

const art_array = [];

setTimeout(() => {
  loader.style.display = 'none';
}, 10000); // 8000 milliseconds = 8 seconds

function generateRandomId() {
  return Math.floor(Math.random() * 55015);
}


const fetchMasterpiece = async () => {
    const randomId = generateRandomId();
    const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`
    );
    const masterpiece = await response.json();
    return masterpiece;

};


const masterpieces = [];


const fetchMasterpieces = async () => {

  await fetchMasterpiece().then(masterpiece => {

  if (masterpiece.message !== "ObjectID not found" && masterpiece.primaryImage !== ""){
  
   masterpieces.push(masterpiece);
  }

  if (masterpieces.length != 20){
    fetchMasterpieces();
  } else {
    for (const masterpieces_item of masterpieces) {
      createCard(masterpieces_item);
    }
  }

  })

};

const createCard = (masterpiece) => {
    art_array.push(masterpiece);
    art_container.innerHTML += 
    `
    <div class="grid-card">

    <div>
      <img src="${masterpiece.primaryImage}" width="180px" height="230px"></img>
      <div class="characteristics">
        <h1>${masterpiece.objectName}</h1>
        <p>Artist: ${masterpiece.artistDisplayName}</p>
        <p>${masterpiece.medium}</p> 
        <p>Credit: ${masterpiece.creditLine}</p>
      </div>
    </div>
    
   </div>
    `
}
fetchMasterpieces();   

search_input.addEventListener('input', searchMasterpiece); 

function searchMasterpiece(event) {
  event.preventDefault();

  const searched_masterpieces = art_array.filter((masterpiece) => masterpiece.objectName.includes(event.target.value));
  console.log(searched_masterpieces);

  art_container.innerHTML = '';

  searched_masterpieces.forEach((searched_masterpiece) => {
    art_container.innerHTML += 
    `
    <div class="grid-card">

    <div>
      <img src="${searched_masterpiece.primaryImage}" width="180px" height="230px"></img>
      <div class="characteristics">
        <h1>${searched_masterpiece.objectName}</h1>
        <p>Artist: ${searched_masterpiece.artistDisplayName}</p>
        <p>${searched_masterpiece.medium}</p> 
        <p>Credit: ${searched_masterpiece.creditLine}</p>
      </div>
    </div>
    
   </div>
    `
  });
}
