
// Use async await
class DataProcessor {
  constructor(apiUrls) {
    this.apiUrls = apiUrls;
    this.data = [];
  }

  async fetchData() {
    try {
      this.data = await Promise.all(
        this.apiUrls.map(async (url) => {
          try {
            const response = await fetch(url);
            return await response.json();
          } catch (error) {
            console.error(`error ${error}`);
            return null;
          }
        }));
      this.data = this.data.filter(item => item !== null);
    } catch (error) {
      console.error(`Error ${error}`)
    }
  }

  processData() {
    if (this.data.length === 0) return "No data available";

    let result = this.data.reduce((acc, item) => {
      acc[item.id] = item.title;
      return acc;
    }, {});

    return result;
  }
}

const processor = new DataProcessor([
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicde.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3"
]);

processor.fetchData().then(() => {
  console.log("Processed Data:", processor.processData());
});






// class DataProcessor {
//   constructor(apiUrls) {
//     this.apiUrls = apiUrls;
//     this.data = [];
//   }

//   fetchData() {
//     return Promise.all(
//       this.apiUrls.map(url => {
//         return fetch(url)
//           .then(response => response.json())
//           .catch(error => console.log("Error:", error));
//       })).then((data) => {
//         this.data = data;
//       });
//   }
//   // fetchDakta() {
//   //   return Promise.all(
//   //     this.apiUrls.map(url =>
//   //       fetch(url)
//   //         .then(response => response.json())
//   //         .catch(error => console.log("Error:", error))
//   //     )
//   //   ).then(results => {
//   //     this.data = results;
//   //   });
//   // }

//   processData() {
//     if (this.data.length === 0) return "No data available";

//     let result = this.data.reduce((acc, item) => {
//       acc[item.id] = item.title;
//       return acc;
//     }, {});

//     return result;
//   }
// }

// const processor = new DataProcessor([
//   "https://jsonplaceholder.typicode.com/todos/1",
//   "https://jsonplaceholder.typicode.com/todos/2",
//   "https://jsonplaceholder.typicode.com/todos/3"
// ]);

// processor.fetchData().then(() => {
//   console.log("Processed Data:", processor.processData());
// });
