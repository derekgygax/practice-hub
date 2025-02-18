class Database {
  constructor() {
    this.records = {};
  }

  async fetchRecord(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id % 2 === 0) {
          resolve({ id, value: `Record ${id}` });
        } else {
          reject(`Record ${id} not found`);
        }
      }, 500);
    });
  }

  async fetchMultipleRecords(ids) {
    let results = [];
    ids.forEach(async (id) => {
      try {
        const record = await this.fetchRecord(id);
        results.push(record);
      } catch (error) {
        console.log(error);
      }
    });
    return results;
  }

  processRecords() {
    return this.records.map(record => record.value);
  }
}

const db = new Database();
db.fetchMultipleRecords([1, 2, 3, 4]).then(() => {
  console.log("Processed Records:", db.processRecords());
});
