
export async function fetchPoster(external_Id) {
    const externalId = external_Id.trim();
    const url = `https://api.themoviedb.org/3/find/${externalId}?external_source=imdb_id`;

    const headers = {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTFmZjQ1ZDU4YWNhNjNkMWFjZjM4ODc2YmM5MTlkZSIsInN1YiI6IjY2MzVjYzRiMzU4ZGE3MDEyNDU1Yzc5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i5aGeKHERj7ecdbOLpoqD4kfwbCBjPmnRJQGJ4Gc0jU",
        accept: "application/json"
    };

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data for external ID ${externalId}`);
        }

        const data = await response.json();
        
        if (!data['movie_results'] || data['movie_results'].length === 0) {
            throw new Error(`No movie results found for external ID ${externalId}`);
        }

        const posterPath = data['movie_results'][0]['poster_path'];
        if (!posterPath) {
            throw new Error(`No poster path found for external ID ${externalId}`);
        }

        const path = "https://image.tmdb.org/t/p/w500/" + posterPath;
        return path;
    } catch (error) {
        console.error('Error fetching poster:', error.message);
        throw error;
    }
}

