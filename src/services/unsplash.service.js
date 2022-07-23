import axios from 'axios'
import Axios from 'axios'

const KEY = '2wV121X0Ot4ARXG44lcENmjEvAkccm1BugKXKX1yuck'

export const unsplashService = {
    query,
}


async function query(filterBy) {
    try {
        const photos = await axios({
            url: `https://api.unsplash.com/search/photos?query=${filterBy}&client_id=${KEY}&orientation=landscape&per_page=50`,
        })
        return photos.data.results
    } catch (error) {
        console.log('cannot get photos', error);
    }
}