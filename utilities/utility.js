module.exports = {
    dateFormat: (record) => {
        record.date = record.date.toISOString().slice(0,10)
        return record
    }
}