<script setup>
  import headerv from './components/headerv.vue';
  import addNote from './components/addNote.vue';
  import noteList from './components/noteList.vue';
  import { ref } from 'vue';

  
  window.onload = () => {
    const storedListElements = localStorage.getItem("listElements");

    if (storedListElements) {
      listElements.value = JSON.parse(storedListElements);
    } else {
      listElements.value = [];
    }
  }

  let listElements = ref([]);

  function addElement(element){
      listElements.value.push({
          text: element, 
          priority: 0,
          date: setDate(Date.now()),
          done: false, 
      }
      );
      
      function setDate(milisegundos) {
          const fecha = new Date(milisegundos);

          const dia = fecha.getDate();
          const mes = fecha.getMonth() + 1;
          const anio = fecha.getFullYear();
          const horas = fecha.getHours();
          const minutos = fecha.getMinutes();
          const segundos = fecha.getSeconds();

          const fechaLegible = `${anio}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia} ${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;

          return fechaLegible;
      }

      localStorage.setItem("listElements", JSON.stringify(listElements.value) );
  }

  function deleteElement(element){
        
          const index = listElements.value.indexOf(element);
          if (index !== -1) {
              listElements.value.splice(index, 1);
              localStorage.setItem("listElements", JSON.stringify(listElements.value) );
          }
      }

      function changeDoneElement(element){
      element.done = true;
      localStorage.setItem("listElements", JSON.stringify(listElements.value) );
  }

  function changePriority(element){
      element.priority++;
      if(element.priority >=3){
          element.priority=0;
      }
      localStorage.setItem("listElements", JSON.stringify(listElements.value) );
  }

  
</script>

<template>
  <headerv></headerv>
  <div id="app">
    <addNote @add-element="addElement"></addNote>
    <p> {{listElements.length==0 ? 'No tasks yet': 'There are ' + listElements.length + ' tasks'}}</p>
    <p>You have {{countElements}} tasks pending of {{listElements.length}}</p>
    <noteList :filterElements="listElements" @delete-element="deleteElement" @change-done-element="changeDoneElement" @change-priority="changePriority"></noteList>
  </div>

  <footer>
      <p>© Raúl González | 2023</p>
      <p>Open code in <a href="#" style="color: rgb(184, 114, 17);">GitHub</a></p>
  </footer>
  
  
</template>

<style>
body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }

        header {
            background-color: #2c3e50;
            color: #ecf0f1;
            text-align: center;
            padding: 20px 0;
        }

        header i {
            font-size: 2rem;
            margin-right: 10px;
        }

        header h1 {
            display: inline-block;
            font-size: 1.5rem;
            margin: 0;
        }

        #app {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .search {
            margin-bottom: 20px;
        }

        input[type="text"] {
            padding: 8px;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-right: 10px;
            margin-top: 10px;
            margin-bottom: 10px;
        }

        .search button {
            padding: 8px 12px;
            font-size: 1rem;
            background-color: #3498db;
            color: #ffffff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .search input[type="checkbox"] {
            margin-left: 10px;
        }

        li>div{
            width: 100%;
        }

        ul {
            list-style: none;
            padding: 0;
            width: 100%;
        }

        li {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 20px;
            transition: 0.3s;
        }

        li span {
            cursor: pointer;
        }

        li button {
            background-color: #e74c3c;
            color: #ffffff;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
        }

        footer {
            text-align: center;
            margin-top: 20px;
            padding: 10px 0;
            background-color: #34495e;
            color: #ecf0f1;
        }

        footer a {
            color: #ecf0f1;
            text-decoration: none;
        }

        li:hover{
            transform: scale(1.05);
        }

        /* Hide the default checkbox */
.container input {
 position: absolute;
 opacity: 0;
 cursor: pointer;
 height: 0;
 width: 0;
}

.container {
 display: block;
 position: relative;
 cursor: pointer;
 font-size: 20px;
 user-select: none;
}

/* Create a custom checkbox */
.checkmark {
 position: relative;
 top: 0;
 left: 0;
 height: 1.3em;
 width: 1.3em;
 background-color: #ccc;
 border-radius: 25px;
 transition: 0.15s;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
 background-color: limegreen;
 border-radius: 25px;
 transition: 0.15s;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
 content: "";
 position: absolute;
 display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
 display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
 left: 0.45em;
 top: 0.25em;
 width: 0.25em;
 height: 0.5em;
 border: solid white;
 border-width: 0 0.15em 0.15em 0;
 transform: rotate(45deg);
}

.btn {
  background-color: transparent;
  position: relative;
  border: none;
}

.btn::after {
  position: absolute;
  top: -130%;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  height: fit-content;
  background-color: rgb(168, 7, 7);
  padding: 4px 8px;
  border-radius: 5px;
  transition: .2s linear;
  transition-delay: .2s;
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
}

.icon {
  transform: scale(1.2);
  transition: .2s linear;
}

.btn:hover > .icon {
  transform: scale(1.5);
}

.btn:hover > .icon path {
  fill: rgb(168, 7, 7);
}

.btn:hover::after {
  visibility: visible;
  opacity: 1;
  top: -160%;
}

.checkbox-wrapper input[type="checkbox"] {
  visibility: hidden;
  display: none;
}

.checkbox-wrapper *,
  .checkbox-wrapper ::after,
  .checkbox-wrapper ::before {
  box-sizing: border-box;
  user-select: none;
}

.checkbox-wrapper {
  position: relative;
  display: block;
  overflow: hidden;
}

.checkbox-wrapper .label {
  cursor: pointer;
}

.checkbox-wrapper .check {
  width: 50px;
  height: 50px;
  position: absolute;
  opacity: 0;
}

.checkbox-wrapper .label svg {
  vertical-align: middle;
}

.checkbox-wrapper .path1 {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  transition: .5s stroke-dashoffset;
  opacity: 0;
}

.checkbox-wrapper .check:checked + label svg g path {
  stroke-dashoffset: 0;
  opacity: 1;
}

.done{
background-color: rgb(154, 245, 192);
}

.done p{
    text-decoration: line-through;
}

.High, .Low, .Medium{
    margin: 5px;
    padding: 8px;
    color: white;
    border-radius: 15px;
}

.High{
    background-color: rgb(187, 10, 10);
}

.Medium{
    background-color: rgb(177, 177, 5);
}

.Low{
    background-color: rgb(20, 99, 20);
}

.done span:first-child{
    background-color: #212d38;
}
</style>
