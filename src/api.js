const URL = 'https://restedblog.herokuapp.com/michael/api/';
class Api {
  constructor () {
    this.url = URL;
  }
  index () {
    return new Promise(resolve => {
      fetch(this.url).then(response => {
        response.json().then(function(data) {
          resolve(data);
        });
      });
    })
  }
  get (record) {
    return new Promise(resolve => {
      fetch(this.url + record.id).then(response => {
        response.json().then(function(data) {
          resolve(data);
        });
      });
    })
  }
  create (record) {
    return new Promise(resolve => {
      var data = new FormData();
      data.append( "json", JSON.stringify({text: record.text, title: record.title}) );
      fetch(`${this.url}`, { method: 'POST', body: data }).then(response => {
        response.json().then(function(data) {
          window.refetch();
          resolve(data);
        });
      });
    })
  }
  update (record) {
    return new Promise(resolve => {
      var data = new FormData();
      data.append( "json", JSON.stringify({text: record.text, title: record.title}) );
      fetch(`${this.url}${record.id}`, { method: 'POST', body: data }).then(response => {
        response.json().then(function(data) {
          resolve(data);
        });
      });
    })
  }
  updateRecord (record) {
    if (record.id === undefined || record.id === null) {
      this.create(record);
    } else {
      this.update(record).then(data => {
        // API was erroring
        console.log('record updated')
      });
    }
    return false;
  }
  deleteRecord (record) {
    return new Promise(resolve => {
      fetch(`${this.url}${record.id}`, { method: 'DELETE' }).then(response => {
        resolve(window.refetch());
      });
    })
  }
  deleteAll () {
    return new Promise(resolve => {
      fetch(`${this.url}`, { method: 'DELETE' }).then(response => {
        alert('Everything was deleted');
        resolve(true);
      });
    })
  }
  generateSampleData () {
    // Use manually from the browser
  }
}

export default Api;
