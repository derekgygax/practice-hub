class DataProcessor {
  constructor(apiUrls) {
    this.apiUrls = apiUrls;
    this.data = [];
  }

  fetchData() {
    this.apiUrls.map(url => {
      fetch(url)
        .then(response => response.json())
        .then(data => this.data.push(data))
        .catch(error => console.log("Error:", error));
    });
  }

  processData() {
    if (this.data.length === 0) return "No data available";

    let result = this.data.reduce((acc, item) => {
      acc[item.id] = item.value;
      return acc;
    });

    return result;
  }
}

const processor = new DataProcessor([
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3"
]);

processor.fetchData();
console.log("Processed Data:", processor.processData());
