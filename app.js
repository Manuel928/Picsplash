const accessKey = "YVvF2erNEy_IaVzmGQKufdps1wNbY2YH9jHo9syFbsM";
const formEl = document.querySelector('form');
const inputEl = document.getElementById('searchInput');
const searchResults = document.querySelector('.searchResults')
const showMoreButton = document.getElementById('showMoreButton')

let inputData = '';
let page = 1;

const searchImages = async () => {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results
    if (page === 1) {
        searchResults.innerHTML = "";
    }
    console.log(results);
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('searchResult')

        // This 'a' tag wraps the image itself inside a link so it can also be clickable and it redirects to the appropiate url
        const a = document.createElement('a')
        const img = document.createElement('img');
        img.src = result.urls.small
        img.alt = result.alt_description
        a.href = result.links.html;
        a.target = "_blank"
        a.appendChild(img)

        // This is the second 'a' tag that contains the link of the image. It works the same as clicking on the image itself
        const imgLink = document.createElement('a');
        imgLink.href = result.links.html;
        imgLink.target = "_blank"
        imgLink.textContent = result.alt_description;

        imageWrapper.appendChild(a)
        imageWrapper.appendChild(imgLink);
        searchResults.appendChild(imageWrapper);

        page++
        if (page > 1) {
            showMoreButton.style.display = 'block';
        }
    })
}
formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})
showMoreButton.addEventListener('click', () => {
    searchImages();
})