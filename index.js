import express from 'express';

const app = express();
import cors from 'cors';

//Importing all functions & utils
import {
    fetchSearchGogo,
    fetchSearchAnimix,
    fetchGogoRecentEpisodes,
    fetchPopular,
    fetchAnimeByGenre,
    fetchGogoAnimeInfo,
    fetchAnimixAllAnime,
    fetchAnimixAnimeInfo,
    fetchAnimixEpisodeInfo,
    fetchAnimixEpisodeSource,
    fetchGogoanimeEpisodeSource
} from './scraper/scrape.js';

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json())


// Routes
app.get('/', (req, res) => {
    res.send('Welcome to AnimeAPI!')
});

app.get('/gogoanime/search', async (req, res) => {
    const keyw = req.query.keyw;
    const page = req.query.page;

    const data = await fetchSearchGogo({ keyw: keyw, page: page })
    res.json(data).status(200)
});

app.get('/animix/search', async (req, res) => {
    const keyw = req.query.keyw;

    const data = await fetchSearchAnimix({ keyw: keyw })
    res.json(data).status(200)
});

app.get('/gogoanime/recent-episodes', async (req, res) => {
    const page = req.query.page;
    const type = req.query.type;

    const data = await fetchGogoRecentEpisodes({ page, type });
    res.json(data).status(200)
});


app.get('/popular', async (req, res) => {
    const type = req.query.type;

    const data = await fetchPopular({ type });
    res.json(data).status(200);
});

app.get('/animix/all', async (req, res) => {
    const data = await fetchAnimixAllAnime({});
    res.json(data).status(200)
});

app.get('/genre/:genre', async (req, res) => {
    const genre = req.params.genre;

    const data = await fetchAnimeByGenre({ genre });
    res.json(data).status(200)
});

app.get('/gogoanime/info/:animeId', async (req, res) => {
    const animeId = req.params.animeId;

    const data = await fetchGogoAnimeInfo({ animeId });
    res.json(data).status(200);
})

app.get('/animix/info/:malId', async (req, res) => {
    const malId = req.params.malId;

    const data = await fetchAnimixAnimeInfo({ malId: malId });
    res.json(data).status(200)
});

app.get([
    '/animix/episodes/:malId'
], async (req, res) => {
    const malId = req.params.malId;
    const data = await fetchAnimixAnimeInfo({ malId: malId });
    const data1 = await fetchAnimixEpisodeInfo({ animeId: data.animeId });
    data1.animeId = data.animeId;
    res.json(data1).status(200);
});

app.get('/gogo/episodes/:animeId',async (req, res) => {
    const animeId = req.params.animeId;
    const data = await fetchAnimixEpisodeInfo({ animeId });
    data.animeId = animeId;
    res.json(data).status(200);
})

app.get('/animix/watch/:episodeId', async (req, res) => {
    const episodeId = req.params.episodeId;

    const data = await fetchAnimixEpisodeSource({ episodeId });
    res.json(data).status(200)
});

app.get('/gogoanime/watch/:episodeId', async (req, res) => {
    const episodeId = req.params.episodeId;

    const data = await fetchGogoanimeEpisodeSource({ episodeId });
    res.json(data).status(200)
});

//Start the web-server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`)
});