<script setup>
  import { ref } from 'vue';
  

  const addElementEvent = defineEmits(['add-element', 'search-input']);

  let element = ref("");
  let filter = ref(false);
  let search = ref("")
  
  function addElement(){
    addElementEvent('add-element', element.value);
    element.value = "";
    
  }

  function searchInput(){
    addElementEvent('search-input', search.value)
  }

  
</script>

<template>

        <div class="search">
            <input type="text" @input="listElements" v-model="element" @keyup.enter="addElement()" placeholder="Create new task">
            <button @click="addElement()">Add</button><br>
        </div>
        <div class="checkbox-wrapper">
          <input type="text" @input="searchInput" v-model="search" placeholder="Search tasks" v-if="filter" >
          <input v-model="filter" type="checkbox" class="check" id="check1-61">
          <label for="check1-61" class="label">
            <svg width="45" height="45" viewBox="0 0 95 95">
              <rect x="30" y="20" width="50" height="50" stroke="black" fill="none"></rect>
              <g transform="translate(0,-952.36222)">
                <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="black" stroke-width="3" fill="none" class="path1"></path>
              </g>
            </svg>
            <span>Filter</span>
          </label>
        </div>
        
        
        

</template>