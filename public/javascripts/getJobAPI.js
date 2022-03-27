// console.log('apiId', apiId)
// console.log('apiKey', apiKey)

const getJobs = async (what, where) => {
    const url = `https://api.adzuna.com/v1/api/jobs/au/search/2?app_id=${apiId}&app_key=${apiKey}&results_per_page=10000&what=${what}&sort_by=date`;
    try {
        const res = await axios.get(url)
        const data = res.data.results
        return data
    } catch (e) {
        console.log('Error!', e)
    }
}

