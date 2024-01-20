<script setup>

  import noteList from './noteList.vue';
  import { ref, computed } from 'vue';
  import { useCollection } from 'vuefire'
  import { useFirestore } from 'vuefire';
  import { collection, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore"; 

  let db = useFirestore();
  let search = ref("");

  let list = useCollection(collection(db, 'list'));
console.log(list);

  function deleteElement(element, id){
          deleteDoc(doc(db, "list", id))
      }

      function changeDoneElement(element, id){
        const nota = doc(db, "list", id)
      let indexNotaMod = list.value.findIndex(objeto => objeto.id == id);


      if(list.value[indexNotaMod].done){
        
        updateDoc(nota, {
          done: false
        })
      } else {
        updateDoc(nota, {
          done: true
        })
      }
  }

  function changePriority(element, id){

    const nota = doc(db, "list", id)
      let indexNotaMod = list.value.findIndex(objeto => objeto.id == id);


      if(list.value[indexNotaMod].priority == 2){
        
        updateDoc(nota, {
          priority: 0
        })
      } else {
        updateDoc(nota, {
          priority: list.value[indexNotaMod].priority+1
        })
      }
  }
  
</script>

<template>
    <div class="main" id="main">
        <noteList :arrElements="list" @delete-element="deleteElement"
            @change-done-element="changeDoneElement" :search="search" :esAdmin="true" @change-priority="changePriority"></noteList>
    </div>
</template>