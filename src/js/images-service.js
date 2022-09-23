export default class ImagesApiService{
    constructor() { 
        this.searchQuery = '';
    }
    
    fetchImages() { 
        const API_URL = "https://pixabay.com/api/"; 
        const key = '29779995-417a1bba921000e7251cb80ce';

        return fetch(API_URL + "?key=" + key+"&q="+encodeURIComponent(searchQuery)+"&image_type=photo"+"&orientation=horizontal"+"&safesearch=true"+"&per_page=40").then(r => r.json())
    }

    
}