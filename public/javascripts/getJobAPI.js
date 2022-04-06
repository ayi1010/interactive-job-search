const getJobs = async (what, what_or, what_exclude) => {
    const url = `https://api.adzuna.com/v1/api/jobs/au/search/3?app_id=${apiId}&app_key=${apiKey}&results_per_page=10&what=${what}&what_or=${what_or}&what_exclude=${what_exclude}&sort_by=date`;
    try {
        const res = await axios.get(url)
        const data = res.data.results
        return data
    } catch (e) {
        console.log('Error!', e)
    }
}

