const config = {
    defaultSearchTerms: 'javascript',
    defaultSearchOR: 'web',
    defaultSearchExclude: 'senior'
}

// Allow file to be used in both browser and Node
try {
    module.exports = config;
} catch (e) { }