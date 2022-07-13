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
      const dogId = document.createElement('td');
      const name = document.createElement('td');
      const breed = document.createElement('td');
      const sex = document.createElement('td');
      const edit = document.createElement('td');
      const editButton = document.createElement('button');

      dogId.style.display = 'none';
      row.id = `dog${dog.id}`;
      dogId.textContent = dog.id;
      name.textContent = dog.name;
      breed.textContent = dog.breed;
      sex.textContent = dog.sex;
      editButton.textContent = 'Edit Dog';

      edit.append(editButton);
      dogsTable.append(row);
      row.append(dogId, name, breed, sex, edit);

      editButton.addEventListener('click', () => {
        fillForm(dog);
      })
    })
  }

  function fillForm(dog) {
    form['dog-id'].value = dog.id;
    form.name.value = dog.name;
    form.breed.value = dog.breed;
    form.sex.value = dog.sex;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/dogs/${e.target['dog-id'].value}`, {
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
      let dogInfoElements = document.querySelector(`#dog${dog.id}`).getElementsByTagName('td');

      dogInfoElements[1].textContent = dog.name;
      dogInfoElements[2].textContent = dog.breed;
      dogInfoElements[3].textContent = dog.sex;

      digInfoElements = [];
    })
  })

  initialize();
})