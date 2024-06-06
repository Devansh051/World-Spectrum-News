const apiKey = 'e86ba346e8734411816b2f2204af0b54';
let latestNewsSection = document.querySelector(".latest-news-section");

const fetchLatestNews = async() => {
    const apiUrl = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&pageSize=4&apiKey=e86ba346e8734411816b2f2204af0b54';
    const response = await fetch(apiUrl);
    const data = await response.json();

    data.articles.forEach((element)=> {

    let latestNewsDiv = document.createElement('div');
    latestNewsDiv.classList.add('latest-news')

    const latestImageNewsDiv = document.createElement('div');
    latestImageNewsDiv.classList.add('latest-image-news')

    const imageElement = document.createElement('img');
    imageElement.src = element.urlToImage;
    imageElement.alt = 'latest-image';

    latestImageNewsDiv.appendChild(imageElement);

    const latestDescDiv = document.createElement('div');
    latestDescDiv.classList.add('latest-desc')

    const timeLatestDiv = document.createElement('div');
    timeLatestDiv.classList.add('time-latest')

    const sourceHeading = document.createElement('h4');
    sourceHeading.innerText = element.source.name;


    let timeParagraph = document.createElement('p');
   
    timeParagraph.innerText =moment(element.publishedAt).format('MMM DD YYYY')
    console.log(element.publishedAt)

    timeLatestDiv.appendChild(sourceHeading);
    timeLatestDiv.appendChild(timeParagraph);

    const latestHeadingWithDescDiv = document.createElement('div');
    latestHeadingWithDescDiv.classList.add('latest-heading-with-desc')

    const headingElement = document.createElement('h3');
    const truncatedTitle = element.title.length > 41 ? element.title.slice(0, 40) + "..." : element.title;
    headingElement.textContent = truncatedTitle;

    const descriptionParagraph = document.createElement('p');
    const truncatedDescription = element.description.length > 100? element.description.slice(0, 95) + "..." : element.description; 
    descriptionParagraph.textContent = truncatedDescription;

    latestHeadingWithDescDiv.appendChild(headingElement);
    latestHeadingWithDescDiv.appendChild(descriptionParagraph);

    latestDescDiv.appendChild(timeLatestDiv);
    latestDescDiv.appendChild(latestHeadingWithDescDiv);

    latestNewsDiv.appendChild(latestImageNewsDiv);
    latestNewsDiv.appendChild(latestDescDiv);

    latestNewsSection.appendChild(latestNewsDiv);

    latestNewsDiv.addEventListener("click", () => {
        window.open(element.url, "_blank");
      })
})
}
fetchLatestNews();

const fetchBusinessNews = async() => {
    const apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=e86ba346e8734411816b2f2204af0b54';
    const response = await fetch(apiUrl);
    const data = await response.json();

    const filteredData = data.articles.filter((data)=> data.content !== null || data.description !== null )
    filteredData.filter((ele)=>ele.title !== "[Removed]").forEach((element) => {
     
    let rightHeadlines = document.querySelector(".right-headlines");

    const subHeadlinesDiv = document.createElement('div');
    subHeadlinesDiv.classList.add('sub-headlines');

    const timeHeadingDiv = document.createElement('div');
    timeHeadingDiv.classList.add('time-heading');

    const stockMarketHeading = document.createElement('h4');
    stockMarketHeading.innerText = 'Stock Market';
    timeHeadingDiv.appendChild(stockMarketHeading);

    const timeHeading = document.createElement('p');
    timeHeading.innerText = '4 hours ago';
    timeHeadingDiv.appendChild(timeHeading);

    subHeadlinesDiv.appendChild(timeHeadingDiv);

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');

    const paragraph = document.createElement('p');
    const truncatedDescription = element.description.length > 100? element.description.slice(0, 95) + "..." : element.description; 
    paragraph.innerText = truncatedDescription ;
    detailsDiv.appendChild(paragraph);


    const rightImageDiv = document.createElement('div');
    rightImageDiv.classList.add('right-image');


    const image = document.createElement('img');
    image.src = element.urlToImage;
    image.alt = '';
    rightImageDiv.appendChild(image);

    detailsDiv.appendChild(rightImageDiv);

    subHeadlinesDiv.appendChild(detailsDiv);

    rightHeadlines.appendChild(subHeadlinesDiv);

    subHeadlinesDiv.addEventListener("click", () => {
        window.open(element.url, "_blank");
      })
})
}

fetchBusinessNews();

// cards

let cardContainer = document.querySelector(".cards");
let thirdSearchInput = document.querySelector(".third-search-input");
let thirdSearchBtnIcon = document.querySelector(".third-search-btn-icon");

thirdSearchBtnIcon.addEventListener("click", ()=> {

    const query  = thirdSearchInput.value.trim(); 
    fetchWorldNews(query); 
    if(thirdSearchInput.value){
        while(cardContainer.hasChildNodes()){
          cardContainer.removeChild(cardContainer.firstChild);
       }
      }
      searchBox.value = "";
})


thirdSearchInput.addEventListener("click",() => {
    thirdSearchInput.removeAttribute("placeholder");
})

const fetchWorldNews = async(query) => {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2024-05-06&sortBy=publishedAt&apiKey=e86ba346e8734411816b2f2204af0b54`;
    const response = await fetch (apiUrl);
    const data = await response.json();
        
    data.articles.forEach((element)=> {



    const listItem = document.createElement('li');
    listItem.className = 'cards__item';


    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';


    const cardImageDiv = document.createElement('div');
    cardImageDiv.className = 'card__image';
    

    cardImageDiv.style.backgroundImage = `url(${element.urlToImage})`

    const cardContentDiv = document.createElement('div');
    cardContentDiv.className = 'card__content';

    const cardTitleDiv = document.createElement('div');
    cardTitleDiv.className = 'card__title';
    const truncatedTitle = element.title.length > 41 ? element.title.slice(0, 40) + "..." : element.title;
    cardTitleDiv.innerText = element.title;


    const cardTextParagraph = document.createElement('p');
    cardTextParagraph.className = 'card__text';
    cardTextParagraph.innerText = element.description; 

    const button = document.createElement('button');
    button.className = 'btn btn--block card__btn';
    button.innerText = 'Read more';


    cardContentDiv.appendChild(cardTitleDiv);
    cardContentDiv.appendChild(cardTextParagraph);
    cardContentDiv.appendChild(button);


    cardDiv.appendChild(cardImageDiv);
    cardDiv.appendChild(cardContentDiv);



    listItem.appendChild(cardDiv);

    cardContainer.appendChild(listItem);

    listItem.addEventListener("click", ()=> {
        window.open(element.url, "_blank");
    })

    })
}
fetchWorldNews();








 
  

