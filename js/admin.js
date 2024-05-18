const tables = document.querySelector("#tables");
const eventsButtton = document.querySelector("#events-buttton");
const participationsButtton = document.querySelector("#participations-buttton");
const usersButtton = document.querySelector("#users-buttton");
const createEventButton = document.querySelector("#saveEvent");
const createPartButton = document.querySelector("#saveParticipation");

document.addEventListener("DOMContentLoaded", () => {
  printEvents();
});

eventsButtton.addEventListener("click", () => {
  printEvents();
});

participationsButtton.addEventListener("click", () => {
  printParticipations();
});

createEventButton.addEventListener("click", () => {
  saveEvent();
});

createPartButton.addEventListener("click", () => {
  saveParticipation();
});

async function consumirAPIEvents() {
  try {
    const URL = "http://localhost:8080/api/v1/events";
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function consumirAPIParticipations() {
  try {
    const URL = "http://localhost:8080/api/v1/eventParticipation";
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function consumirAPIUsers() {
  try {
    const URL = "http://localhost:8080/api/v1/users";
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function printEvents() {
  const data = await consumirAPIEvents();
  console.log(data);
  cleanHTML(tables);
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
                  <a class="btn btn-primary edit" data-id=${event.id}>
                    <i class="bx bxs-edit-alt"></i>
                  </a>
                  <a class="btn btn-danger delete" data-id=${event.id}>
                    <i class="bx bxs-trash"></i>
                  </a>
                </div>
              </td>
            </tr>
          
        `;
  });

  tables.querySelectorAll(".edit").forEach((button) => {
    button.addEventListener("click", async function () {
      const dataId = this.getAttribute("data-id");
      printFormEvent(dataId);
    });
  });

  tables.querySelectorAll(".delete").forEach((button) => {
    button.addEventListener("click", async function () {
      const dataId = this.getAttribute("data-id");
      await deleteEvent(dataId);
      printEvents();
    });
  });
}

async function printParticipations() {
  const data = await consumirAPIParticipations();
  console.log(data);
  cleanHTML(tables);
  tables.innerHTML += `<div>
      <button class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#modalEventParticipation" id="modalPartButton"> Create a new participation </button>
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

  tables.querySelector("#modalPartButton").addEventListener("click", () => {
    printEventInSelect();
    printusersInSelect();
  });

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
                    <a class="btn btn-primary edit" data-id=${eventPart.id}>
                      <i class="bx bxs-edit-alt"></i>
                    </a>
                    <a class="btn btn-danger delete" data-id=${eventPart.id}>
                      <i class="bx bxs-trash"></i>
                    </a>
                  </div>
                </td>
              </tr>
            
          `;
  });
  tables.querySelectorAll(".edit").forEach((button) => {
    button.addEventListener("click", async function () {
      const dataId = this.getAttribute("data-id");
      printFormParticipation(dataId);
    });
  });

  tables.querySelectorAll(".delete").forEach((button) => {
    button.addEventListener("click", async function () {
      const dataId = this.getAttribute("data-id");
      await deleteParticipation(dataId);
      printParticipations();
    });
  });
}

function cleanHTML(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

async function saveEvent() {
  const name = document.getElementById("nameEvent").value;
  const place = document.getElementById("placeEvent").value;
  const dateInput = document.getElementById("dateEvent").value;
  const capacity = document.getElementById("capacityEvent").value;
  const description = document.getElementById("descriptionEvent").value;
  const eventType = document.getElementById("eventType").value;
  const status = document.getElementById("statusEvent").value;

  const date = new Date(dateInput).toISOString();

  const id = document.getElementById("eventId").value;

  const event = {
    name,
    place,
    date,
    capacity,
    description,
    eventType,
    status,
  };

  if (!id) {
    try {
      const response = await fetch("http://localhost:8080/api/v1/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      console.log(response);

      if (response.ok) {
        alert("Event added");
        printEvents();
      } else {
        console.error("Error adding event");
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  } else {
    updateEvent(id, event);
  }
}

async function saveParticipation() {
  const participantRole = document.getElementById("roleParticipant").value;
  const eventId = document.getElementById("eventParticipation").value;
  const userId = document.getElementById("userParticipation").value;

  const id = document.getElementById("partId").value;

  const participation = {
    participantRole,
    userId,
    eventId,
  };

  if (!id) {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/eventParticipation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(participation),
        }
      );
      console.log(response);

      if (response.ok) {
        alert("participation added");
        printParticipations();
      } else {
        console.error("Error adding participation");
      }
    } catch (error) {
      console.error("Error adding participation:", error);
    }
  } else {
    updateParticipation(id,participation);
  }
}

async function printEventInSelect() {
  const selectEvent = document.querySelector("#eventParticipation");
  cleanHTML(selectEvent);
  selectEvent.innerHTML += `
    <option selected>Select Event</option>
  `;
  const data = await consumirAPIEvents();
  data["content"].forEach((event) => {
    selectEvent.innerHTML += `
    <option value="${event.id}">${event.name}</option>
          `;
  });
}

async function printusersInSelect() {
  const selectUser = document.querySelector("#userParticipation");
  cleanHTML(selectUser);
  selectUser.innerHTML += `
    <option selected>Select User</option>
  `;
  const data = await consumirAPIUsers();
  data["content"].forEach((user) => {
    selectUser.innerHTML += `
    <option value="${user.id}">${user.username}</option>
          `;
  });
}

async function deleteEvent(eventId) {
  const URL = `http://localhost:8080/api/v1/events/${eventId}`;
  try {
    const response = await fetch(URL, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Event deleted");
    } else {
      console.error("Error deleting event");
    }
  } catch (error) {
    console.error("Error deleting event:", error);
  }
}

async function deleteParticipation(eventId) {
  const URL = `http://localhost:8080/api/v1/eventParticipation/${eventId}`;
  try {
    const response = await fetch(URL, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Participation deleted");
    } else {
      console.error("Error deleting Participation");
    }
  } catch (error) {
    console.error("Error deleting Participation:", error);
  }
}

async function updateEvent(eventId, updatedEvent) {
  const URL = `http://localhost:8080/api/v1/events/${eventId}`;
  try {
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    });

    if (response.ok) {
      alert("Event updated");
      printEvents();
    } else {
      console.error("Error updating event");
    }
  } catch (error) {
    console.error("Error updating event:", error);
  }
}

async function updateParticipation(partID, updatedParticipation) {
  const URL = `http://localhost:8080/api/v1/eventParticipation/${partID}`;
  try {
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedParticipation),
    });

    if (response.ok) {
      alert("Event updated");
      printEvents();
    } else {
      console.error("Error updating event");
    }
  } catch (error) {
    console.error("Error updating event:", error);
  }
}

async function getEventById(eventId) {
  const URL = `http://localhost:8080/api/v1/events/${eventId}`;
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(
        `Error fetching event with ID ${eventId}: ${response.statusText}`
      );
    }

    const eventData = await response.json();
    return eventData;
  } catch (error) {
    console.error("Error fetching event:", error);
  }
}

async function getPartById(partId) {
  const URL = `http://localhost:8080/api/v1/eventParticipation/${partId}`;
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(
        `Error fetching event with ID ${partId}: ${response.statusText}`
      );
    }

    const eventData = await response.json();
    return eventData;
  } catch (error) {
    console.error("Error fetching event:", error);
  }
}

async function printFormEvent(id) {
  const modalElement = document.getElementById("modalEvent");
  const modalInstance = new bootstrap.Modal(modalElement);
  modalInstance.show();
  const data = await getEventById(id);
  console.log(data);
  dateFormat = new Date(data.date).toISOString().split("T")[0];
  document.getElementById("eventId").value = data.id;
  document.getElementById("nameEvent").value = data.name;
  document.getElementById("placeEvent").value = data.place;
  document.getElementById("dateEvent").value = dateFormat;
  document.getElementById("capacityEvent").value = data.capacity;
  document.getElementById("descriptionEvent").value = data.description;
  document.getElementById("eventType").value = data.eventType;
  document.getElementById("statusEvent").value = data.status;
}

async function printFormParticipation(id) {
  const modalElement = document.getElementById("modalEventParticipation");
  const modalInstance = new bootstrap.Modal(modalElement);
  modalInstance.show();
  const data = await getPartById(id);
  console.log(data);
  document.getElementById("roleParticipant").value = data.participantRole;
  // document.getElementById("eventParticipation").value = ;
  // document.getElementById("userParticipation").value = ;
  document.getElementById("partId").value = data.id;
}
