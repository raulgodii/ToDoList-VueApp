<script setup>
  import headerv from './components/headerv.vue';
  import addNote from './components/addNote.vue';
  import noteList from './components/noteList.vue';
  import { ref, computed } from 'vue';
  import { useCollection } from 'vuefire'
  import { useFirestore } from 'vuefire';
  import { collection, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore"; 
  import { connectStorageEmulator } from 'firebase/storage';

  let db = useFirestore();

  const list = useCollection(collection(db, 'list'));


  
  window.onload = () => {
    const storedListElements = localStorage.getItem("listElements");

    if (storedListElements) {
      listElements.value = JSON.parse(storedListElements);
    } else {
      listElements.value = [];
    }
  }


  

  let listElements = ref([]);
  let search = ref("")

  function addElement(element){
      listElements.value.push({
          text: element, 
          priority: 0,
          date: setDate(Date.now()),
          done: false, 
      }
      );

      const docRef = addDoc(collection(db, "list"), {
          text: element, 
          priority: 0,
          date: setDate(Date.now()),
          done: false, 
    });
      
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

  function searchInput(searchin){
    search.value = searchin;
  }

  const countElements = computed(() =>{
    return listElements.value.filter(el => !el.done).length;
  })
  
</script>

<template>
  <headerv></headerv>
  <div id="main">
    <addNote @add-element="addElement" @search-input="searchInput"></addNote>
    <p> {{listElements.length==0 ? 'No tasks yet': 'There are ' + listElements.length + ' tasks'}}</p>
    <p>You have {{countElements}} tasks pending of {{listElements.length}}</p>
    <noteList :arrElements="listElements" :search="search" @delete-element="deleteElement" @change-done-element="changeDoneElement" @change-priority="changePriority"></noteList>
  </div>

  <footer>
      <p>© Raúl González | 2023</p>
      <p>Open code in <a href="#" style="color: rgb(184, 114, 17);">GitHub</a></p>
  </footer>
  
  
</template>

<style>
</style>