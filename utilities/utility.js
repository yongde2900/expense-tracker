module.exports = {
  dateFormat: (record) => {
      record.date = record.date.toISOString().slice(0,10)
      return record
  },

  judgeObj: (obj) => {
      if (Object.keys(obj).length  == 0) {
          return false;
      } else {
          return true;
      }
  }
}