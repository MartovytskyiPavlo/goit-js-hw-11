import Notiflix from 'notiflix';
import ImagesApiService from './js/images-service'

const gallery = document.querySelector(".gallery");
const searchForm = document.querySelector(".search-form");
const loadMoreBtn = document.querySelector(".load-more");

const imagesApiService = new ImagesApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim(); 
  imagesApiService.resetPage();
  gallery.innerHTML = "";
  
  if (imagesApiService.query === '') return;

  await imagesApiService.fetchImages().then(renderCard);  
  hideLoadMoreBtnVisibility();

}

async function onLoadMore() {
  await imagesApiService.fetchImages().then(renderCard);  
  hideLoadMoreBtnVisibility();
}


 function prepareList(data) {
   const markup = data
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${downloads}
          </p>
        </div>
      </div>`;
    })
    .join("");
    
  return markup;
}

function renderCard(data) {
    if (!data.totalHits) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      if (data.page===1) { Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`); }
      gallery.insertAdjacentHTML("beforeend", prepareList(data.hits));
    }
}

function hideLoadMoreBtnVisibility() {
  if (imagesApiService.enableNextPage) { loadMoreBtn.classList.remove('visually-hidden') }
  else {
    loadMoreBtn.classList.add('visually-hidden');
  }
}