document.addEventListener('DOMContentLoaded', () => {
  const dogsTable = document.querySelector('#table-body');
  const form = document.querySelector('#dog-form');

  function fetchDogs() {
    return fetch('http://localhost:3000/dogs')
    .then(res => res.json())
  }

  function initialize() {
    fetchDogs()
    .then(renderDogs)
  }

  function renderDogs(dogs) {
    dogs.forEach(dog => {
      const row = document.createElement('tr');
      const name = document.createElement('td');
      const breed = document.createElement('td');
      const sex = document.createElement('td');
      const edit = document.createElement('td');
      const editButton = document.createElement('button');

      row.id = `dog${dog.id}`;
      name.textContent = dog.name;
      breed.textContent = dog.breed;
      sex.textContent = dog.sex;
      editButton.textContent = 'Edit Dog';

      edit.append(editButton);
      dogsTable.append(row);
      row.append(name, breed, sex, edit);

      editButton.addEventListener('click', () => {
        fillForm(dog);
      })
    })
  }

  function fillForm(dog) {
    form.name.value = dog.name;
    form.breed.value = dog.breed;
    form.sex.value = dog.sex;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: form.name.value,
          breed: form.breed.value,
          sex: form.sex.value
        })
      })
      .then(res => res.json())
      .then(dog => {
        const dogRow = document.querySelector(`#dog${dog.id}`);

        console.log(dogRow.name);
      })
    })
  }

  initialize();
})