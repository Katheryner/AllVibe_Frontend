const tables = document.querySelector("#tables");
const eventsButtton = document.querySelector("#events-buttton");
const participationsButtton = document.querySelector("#participations-buttton");
const usersButtton = document.querySelector("#users-buttton");

document.addEventListener("DOMContentLoaded", () => {
    consumirAPIEvents();
  });

eventsButtton.addEventListener("click", () => {
  consumirAPIEvents();
});

participationsButtton.addEventListener("click", () => {
    consumirAPIParticipations();
  });

async function consumirAPIEvents() {
  const URL = "http://localhost:8080/api/v1/events";
  const response = await fetch(URL);
  const data = await response.json();

  printEvents(data);
}

function printEvents(data) {
  console.log(data);
  cleanHTML();
  tables.innerHTML += `<div>
    <button class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#modalEvent"> Create a new event </button>
  </div>

  <table class="table table-striped table-hover table-dark">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Status</th>
        <th scope="col">Date</th>
        <th scope="col">Capacity</th>
        <th scope="col">Place</th>
        <th scope="col">Descripion</th>
        <th scope="col">EventType</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody></tbody>
    </table>`;
  data["content"].forEach((event) => {
    const fecha = new Date(event.date);

    const año = fecha.getFullYear();
    const mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
    const día = ("0" + fecha.getDate()).slice(-2);

    event.date = `${año}-${mes}-${día}`;

    tables.querySelector("tbody").innerHTML += `
        
            <tr>
              <td scope="row">${event.id}</td>
              <td>${event.name}</td>
              <td>${event.status}</td>
              <td>${event.date}</td>
              <td>${event.capacity}</td>
              <td>${event.place}</td>
              <td>${event.description}</td>
              <td>${event.eventType}</td>
              <td>
                <div class="d-flex gap-1">
                  <a class="btn btn-primary" data-id=${event.id}>
                    <i class="bx bxs-edit-alt"></i>
                  </a>
                  <a class="btn btn-danger" data-id=${event.id}>
                    <i class="bx bxs-trash"></i>
                  </a>
                </div>
              </td>
            </tr>
          
        `;
  });
}

async function consumirAPIParticipations() {
    const URL = "http://localhost:8080/api/v1/eventParticipation";
    const response = await fetch(URL);
    const data = await response.json();
    printParticipations(data);
  }
  
  function printParticipations(data) {
    console.log(data);
    cleanHTML();
    tables.innerHTML += `<div>
      <button class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#modalEventParticipation"> Create a new participation </button>
    </div>
  
    <table class="table table-striped table-hover table-dark">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Username</th>
          <th scope="col">Role in event</th>
          <th scope="col">Event name</th>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
          <th scope="col">Place</th>
          <th scope="col">EventType</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
      </table>`;
    data["content"].forEach((eventPart) => {
      const fecha = new Date(eventPart.simpleEventResponse.date);
  
      const año = fecha.getFullYear();
      const mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
      const día = ("0" + fecha.getDate()).slice(-2);
  
      eventPart.simpleEventResponse.date = `${año}-${mes}-${día}`;
  
      tables.querySelector("tbody").innerHTML += `
          
              <tr>
                <td scope="row">${eventPart.id}</td>
                <td>${eventPart.simpleUserResponse.username}</td>
                <td>${eventPart.participantRole}</td>
                <td>${eventPart.simpleEventResponse.name}</td>
                <td>${eventPart.simpleEventResponse.status}</td>
                <td>${eventPart.simpleEventResponse.date}</td>
                <td>${eventPart.simpleEventResponse.place}</td>
                <td>${eventPart.simpleEventResponse.eventType}</td>
                <td>
                  <div class="d-flex gap-1">
                    <a class="btn btn-primary" data-id=${eventPart.id}>
                      <i class="bx bxs-edit-alt"></i>
                    </a>
                    <a class="btn btn-danger" data-id=${eventPart.id}>
                      <i class="bx bxs-trash"></i>
                    </a>
                  </div>
                </td>
              </tr>
            
          `;
    });
  }

function cleanHTML() {
  while (tables.firstChild) {
    tables.removeChild(tables.firstChild);
  }
}
