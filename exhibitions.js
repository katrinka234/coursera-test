
const exhibitions_container = document.querySelector('.exhibitions-container');
const search_input = document.querySelector('.search-input');
const loader = document.querySelector('.loader');

const exhibitions_array = [];

setTimeout(() => {
  loader.style.display = 'none';
}, 1500); // 3000 milliseconds = 3 seconds



fetch('http://localhost:5005/exhibitions')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            return response.json();
    })

    .then((result) => {
        if (!result.exhibitions) {
            throw new Error('Exhibitions not found in response');
        }
        result.exhibitions.forEach((exhibition) => {
        exhibitions_array.push(exhibition);
        const startDate = new Date(exhibition.startDate);
        const endDate = new Date(exhibition.endDate);
        exhibitions_container.innerHTML +=
        `
        <div class="card exhibitions-card">
        <img src="${exhibition.image}"/>
        <h3 class="card-text">${exhibition.title}</h3>
        <h5 class="card-text">${exhibition.department}</h5>
        <h6 class="card-text">${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}</h6>
        </div>

        `;
        });
        console.log(exhibitions_array);
    })

    .catch((error) => {
        console.error('Error fetching exhibitions:', error);
});


    
