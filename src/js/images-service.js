export default class ImagesApiService{
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchImages() { 
        if (!this.query) { return; }

        const API_URL = "https://pixabay.com/api/"; 
        const key = '29779995-417a1bba921000e7251cb80ce';

        const URL = `${API_URL}?key=${key}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

        return fetch(URL).then(r => r.json());
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }


    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery.split(' ').join('+');
    }
}