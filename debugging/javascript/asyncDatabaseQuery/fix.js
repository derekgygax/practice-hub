class Database {
  constructor() {
    this.records = [];
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
    try {
      let results = await Promise.all(
        ids.map(async (id) => {
          try {
            const record = await this.fetchRecord(id);
            return record
          } catch (error) {
            console.log(error);
            return null;
          }
        })
      );
      results = results.filter((result) => result !== null);
      // todo could add something here so that repeart records are never entered
      this.records = [...results];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  processRecords() {
    return this.records.map(record => record.value);
  }
}

const db = new Database();
db.fetchMultipleRecords([1, 2, 3, 4]).then(() => {
  console.log("Processed Records:", db.processRecords());
});
