const postEditedTodo = (d) => {
  console.log(d);
  fetch(`http://localhost:3000/todos/${d.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(d),
  })
    .then((res) => res.json())
    .then((data) => {
      const modal = document.getElementById("exampleModal");
      modal.style.display = "none";
      fetchAllData();
    })
    .catch((e) => console.log(e));
};

const createSingleRow = (d) => {
  const row = document.createElement("div");
  row.setAttribute("class", "row mb-2word");
  row.setAttribute("id", d.id);
  const idCol = document.createElement("div");
  idCol.setAttribute("class", "col-2");
  idCol.innerText = d.id;
  const titleCol = document.createElement("div");
  titleCol.setAttribute("class", "col-3");
  titleCol.innerText = d.title;
  const descriptionCol = document.createElement("div");
  descriptionCol.setAttribute("class", "col-5");
  descriptionCol.innerText = d.description;
  const delCol = document.createElement("div");
  delCol.setAttribute("class", "col-2");
  const del = document.createElement("button");
  del.setAttribute("class", "btn btn-outline-info");
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fa-sharp fa-solid fa-trash");
  del.appendChild(deleteIcon);
  const edit = document.createElement("button");
  edit.setAttribute("class", "btn btn-info text-white");
  edit.setAttribute("data-bs-target", "#exampleModal");
  edit.setAttribute("data-bs-toggle", "modal");
  const editIcon = document.createElement("i");
  editIcon.setAttribute("class", "fa-sharp fa-solid fa-pen-to-square");
  edit.appendChild(editIcon);
  delCol.appendChild(del);
  delCol.appendChild(edit);
  del.onclick = () => {
    fetch(`http://localhost:3000/todos/${d.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const currRow = document.getElementById(d.id);
        currRow.remove();
      })
      .catch((e) => console.log("Error : ", e));
  };

  edit.onclick = () => {
    const id = document.getElementById("id-modal");
    id.innerText = d.id;
    const title = document.getElementById("title-modal");
    title.value = d.title;
    const description = document.getElementById("description-modal");
    description.value = d.description;

    const submit = document.getElementById("submit-modal");
    submit.onclick = () => {
      // alert(title.value);

      postEditedTodo({
        id: d.id,
        title: title.value,
        description: description.value,
      });
    };
  };

  row.appendChild(idCol);
  row.appendChild(titleCol);
  row.appendChild(descriptionCol);
  row.appendChild(delCol);

  return row;
};

const createTableWithData = (data) => {
  const table = document.getElementById("table");
  table.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const row = createSingleRow(data[i]);
    table.appendChild(row);
  }
};

const fetchAllData = () => {
  let resData;

  fetch("http://localhost:3000/todos")
    .then((res) => res.json())
    .then((data) => createTableWithData(data))
    .catch((e) => console.log("Error : ", e));
};

const postTodo = () => {
  //   e.preventDefault();

  const title = document.getElementById("title").value;
  const des = document.getElementById("description").value;
  console.log(title, des);

  fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description: des,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const row = createSingleRow({
        title,
        description: des,
        id: data.id,
      });
      const table = document.getElementById("table");
      table.appendChild(row);
    })
    .catch((e) => console.log(e));
};
