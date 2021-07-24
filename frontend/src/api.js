const baseResultsUrl = (process.env.NODE_ENV === 'development' ? 'http://localhost:80/api/results' : '/api/results');

async function getResults(queryParams) {
    const resultsUrl = `${baseResultsUrl}?${Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&')}`;

    return fetch(resultsUrl)
    .then(res => res.json())
    .then((json) => {
      return json;
    })
}

const api = {
    getResults
};

export default api;