<script setup>
  import { computed, onMounted } from 'vue';
  const props = defineProps(['arrElements', 'search']);
  const elementEvent = defineEmits(['delete-element', 'change-done-element', 'change-priority']);


  function changeDoneElement(element){
    elementEvent('change-done-element', element)
  }

  function changePriority(element){
    elementEvent('change-priority', element)
  }

  function deleteElement(element){
        
    elementEvent('delete-element',element)


  }

  function checkPriority(priority){
      switch(priority){
          case 0: 
          return 'Low';
          break;
          case 1: 
          return 'Medium';
          break;
          case 2: 
          return 'High';
          break;
      }
  }


  const filterElements = computed(() =>{
    let filterArr =  props.arrElements.filter(el => el.text.includes(props.search));
    filterArr.sort((a,b) => {
        return b.priority-a.priority;
    });
    return filterArr;
  })

  

</script>

<template>
<ul>
            <li v-for="(element, index) in filterElements" :key="element.date" :class="{done:element.done}">
                <label class="container">
                    <input type="checkbox" v-model="element.done" @input="changeDoneElement(element)">
                    <div class="checkmark"></div>
                  </label>
                <div @click="changePriority(element)"  style="padding: 0px 20px; cursor: pointer;">
                    <p style="font-weight: bold; font-size: 1.3em; text-transform: uppercase;">"{{element.text}}"</p>
                    <p><span :class="checkPriority(element.priority)">{{checkPriority(element.priority)}}</span><span style="color: rgb(116, 116, 116); font-size: 0.8em;">{{element.date}}</span></p>
                </div>
                <button class="btn" @click="deleteElement(element)">
                    <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
                    <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                  </svg>
                </button>
    
            </li>
        </ul>
</template>