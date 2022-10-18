export function getList() {
    return fetch('http://localhost:5000/condition')
      .then(data => data.json())
  }