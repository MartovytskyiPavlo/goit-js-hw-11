import Notiflix from 'notiflix';

const API_URL = "https://pixabay.com/api/";

const gallery = document.querySelector(".gallery");
const searchForm = document.querySelector(".search-form");
const loadMoreBtn = document.querySelector(".load-more");

const key = '29779995-417a1bba921000e7251cb80ce';
let page = 1;

searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.searchQuery.value.trim(); 

  if (!searchQuery) { return; }
  
  await fetchImages(searchQuery).then(renderCard);
    
}


// https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
async function fetchImages(name) {
  return fetch(API_URL + "?key=" + key+"&q="+encodeURIComponent(name)+"&image_type=photo"+"&orientation=horizontal"+"&safesearch=true"+"&per_page=40").then(r => r.json())
}

function getOneImage(item) {
    return `<div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${item.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${item.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${item.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${item.downloads}
    </p>
  </div>
</div>`;
}

 function prepareList(data) {
    let result = "";
    for (const item of data) {
        result += getOneImage(item);
    }

    return result;
}

function renderCard(data) {
  gallery.innerHTML = "";
    if (data.hits.length===0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      Notiflix.Notify.success('Hooray! We found '+data.totalHits+' images.');
      console.log(data.hits);
        gallery.innerHTML = prepareList(data.hits);  
    }
}

function hideLoadMoreBtnVisibility() {
  loadMoreBtn.hidden = true;
}