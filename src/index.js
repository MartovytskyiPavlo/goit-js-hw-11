import Notiflix from 'notiflix';
import ImagesApiService from './js/images-service'

const gallery = document.querySelector(".gallery");
const searchForm = document.querySelector(".search-form");
const loadMoreBtn = document.querySelector(".load-more");

const imagesApiService = new ImagesApiService();

searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim(); 
  imagesApiService.resetPage();
  
  // await fetchImages(searchQuery).then(renderCard);
  await imagesApiService.fetchImages().then(renderCard);  
}


// https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
// async function fetchImages(searchQuery) {
//   return fetch(API_URL + "?key=" + key+"&q="+encodeURIComponent(searchQuery)+"&image_type=photo"+"&orientation=horizontal"+"&safesearch=true"+"&per_page=40").then(r => r.json())
// }

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
  //  const result = data.map();
    
    return result;
}

function renderCard(data) {
  gallery.innerHTML = "";
    if (data.hits.length===0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      gallery.innerHTML = prepareList(data.hits);  
    }
}

function hideLoadMoreBtnVisibility() {
  loadMoreBtn.hidden = true;
}