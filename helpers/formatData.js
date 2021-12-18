const formatData = (value) => {
    if (value && value !== "") {
        if(!isNaN(value)) return Number(value)
        if(typeof value === 'string') return String(value)
    }
    return null
}

module.exports = formatData