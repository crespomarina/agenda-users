//FETCH
const user = new Users();
const datos = [];

//SELECTORS
const show = document.querySelector('.showing-el');
const order = document.getElementById('select-order');
const userInput = document.querySelector('.keyword-search');
const botones = document.querySelector('.pagination-buttons');
const nextBtn = document.getElementById('btn-next');
const prevBtn = document.getElementById('btn-prev');
const showUsers = document.querySelector('.users-wrapper');

//FUNCIONES
//Ordenar los users en orden ascendente
function ordenarAsc(a,b){
  if(a.name.first === b.name.first){
    return a.name.last < b.name.last ? -1 : 1;
  } else {
  return a.name.first < b.name.first ? -1 : 1;
  }
}

//Ordenar los users en orden descendente
function ordenarDesc(a,b){
  if(a.name.first === b.name.first){
    return a.name.last > b.name.last ? -1 : 1;
  } else {
    return a.name.first > b.name.first ? -1 : 1;
  }
}

//Click en algun boton de navegacion
function clickButton(e) {
  const btnId = String(e.target.id);
  //ponerle el active al boton activo y sacar el resto 
  for(let i = 0; i < 7; i ++){
    if(botones.children[i].classList.contains('active')){
      botones.children[i].classList.remove('active');
    }
  }

  e.target.classList.add('active');
  const nro = btnId.slice(3);

  //Showing x of 100 users 
  show.innerHTML = `Showing ${parseInt(nro)*10+10} of 100 users`;

  const inicial = nro*10;
  const final = inicial+10;
  let idCount = 0;

  for(let i = inicial; i<final; i++){
    document.getElementById(`user-${idCount}`).innerHTML = `
    <div class="image">
      <div class="img" style="
      background-image: url(${datos[i].picture.large});
      width: 100%;
      height: 175px;
      background-position: center;
      background-size: cover;"></div>
        <div class="user">
          <p class="user-name">${datos[i].name.first} 
          ${datos[i].name.last}</p>
          <p class="user-location">${datos[i].location.street.name} 
          ${datos[i].location.street.number}</p>
          <p class="user-login"><img src="clock-solid.svg" class="clock-svg">${datos[i].registered.age}y ago</p>
        </div>
    `;
    idCount++;
  }
}

//Click en boton 'prev'
function clickPrev(e){
  for(let i = 0; i <7; i ++){
    if(botones.children[i].classList.contains('numbtn')){
      let nro = parseInt(botones.children[i].innerHTML);
      botones.children[i].innerHTML = nro-5;
      botones.children[i].setAttribute('id', `btn${nro-6}`);
      console.log("boton", nro-5, "id: ", botones.children[i].id);
    }
  }
}

//Click en boton 'next'
function clickNext(e){
  prevBtn.disabled = false;
  for(let i = 0; i <7; i ++){
    if(botones.children[i].classList.contains('numbtn')){
      let nro = parseInt(botones.children[i].innerHTML);
      botones.children[i].innerHTML = nro+5;
      botones.children[i].setAttribute('id', `btn${nro+4}`);
      console.log("boton ", nro+5, "id: ", botones.children[i].id)
    }
  }
}

//cargar usuarios filtrados en busqueda
function cargarFiltrados(da){
  show.innerHTML = `Showing ${da.length} of ${da.length}`;
  console.log('data', da, 'data size', da.length)
  crearElementos(da); 

  order.addEventListener('change', (e) =>{
    if(e.target.value === 'desc'){
      da.sort(ordenarDesc);
      document.querySelector('.users-filtered').innerHTML = '';
      crearElementos(da);

    } else {
      da.sort(ordenarAsc);
      document.querySelector('.users-filtered').innerHTML = '';
      crearElementos(da);
    }
  })
}

function crearElementos(da){
  for(let i = 0; i < da.length; i++){
    const div = document.createElement('div');
    div.className = `user-container`;
    div.innerHTML = `
    <div class="image">
      <div class="img" style="
      background-image: url(${da[i].picture.large});
      width: 100%;
      height: 175px;
      background-position: center;
      background-size: cover;"></div>
        <div class="user">
          <p class="user-name">${da[i].name.first} 
          ${da[i].name.last}</p>
          <p class="user-location">${da[i].location.street.name} 
          ${da[i].location.street.number}</p>
          <p class="user-login"><img src="clock-solid.svg" class="clock-svg">${da[i].registered.age}y ago</p>
        </div>
    `;
    document.querySelector('.users-filtered').appendChild(div);
  }
}

//.THEN .CATCH
user.getUser()
  .then(data => {
    for(let i = 0; i < 100; i++){
      datos.push(data.results[i])
    }

    //sorting por default ascendete
    datos.sort(ordenarAsc);
    cargarDatos(datos, 10);

    //Evento de order 
    order.addEventListener('change', (e) => {
      if(e.target.value === 'desc'){
        datos.sort(ordenarDesc);
        cargarDatos(datos, 10);
      } else {
        datos.sort(ordenarAsc);
        cargarDatos(datos, 10);
      }
    });

    function cargarDatos(da = datos, num = 10) {
      for(let i = 0; i<num; i++){
        document.getElementById(`user-${i}`).innerHTML = `
        <div class="image">
          <div class="img" style="
          background-image: url(${da[i].picture.large});
          width: 100%;
          height: 175px;
          background-position: center;
          background-size: cover;"></div>
            <div class="user">
              <p class="user-name">${da[i].name.first} 
              ${da[i].name.last}</p>
              <p class="user-location">${da[i].location.street.name} 
              ${da[i].location.street.number}</p>
              <p class="user-login"><img src="clock-solid.svg" class="clock-svg">${da[i].registered.age}y ago</p>
            </div>
        `;
      }
    }

    //FILTRAR
    userInput.addEventListener('keyup', (e) => {
      const text = e.target.value.toLowerCase();
 
      datosFil = [];
      datos.forEach((dato) => {
        if(dato.name.first.toLowerCase() === text || dato.name.last.toLowerCase() === text){
          datosFil.push(dato);
        }
      })
      if(text === ''){
        if(showUsers.style.display === 'none'){
          showUsers.style.display = 'flex';
        }
        cargarDatos();
        document.location.reload();
      } else {
        showUsers.style.display = 'none';
        cargarFiltrados(datosFil);
      }
    });

    //Botones 
    botones.addEventListener('click', clickButton);
    nextBtn.addEventListener('click', clickNext);
    prevBtn.addEventListener('click', clickPrev);

    prevBtn.disabled = true;
  })
  .catch(err => console.log(err));