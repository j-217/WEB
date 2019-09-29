<template>
    <div class="container">
        <section class="todoapp">
            <header class="header">
                <h1>todos</h1>
                <input class="new-todo" placeholder="What needs to be done?" autofocus @keydown="addOne" ref="toAdd">
            </header>
            <!-- This section should be hidden by default and shown when there are todos -->
            <section class="main">
                <input 
                  id="toggle-all" 
                  class="toggle-all" 
                  type="checkbox" 
                  @click="changeToggleAll" 
                  :checked="toggleAll"
                >
                <label for="toggle-all">Mark all as complete</label>
                <ul class="todo-list"
                  @dblclick="editTitle"
                >
                    <!-- These are here just to show the structure of the list items -->
                    <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
                    <li 
                      v-for="item, index in showList" 
                      :key="item.id" 
                      :class="{completed:item.done, editing: index === whichEditing}"
                    >
                        <div class="view">
                            <input 
                              class="toggle" 
                              type="checkbox" 
                              :checked="item.done" 
                              @click="changeCheck(item.id)"
                            >
                            <label
                              :data-index="index"
                            >{{ item.title }}</label>
                            <button class="destroy" @click="deleteOne(item.id)"></button>
                        </div>
                        <input 
                          class="edit" 
                          :value="item.title"
                          @blur="()=>{ whichEditing = null }"
                          @keydown="saveEdit"
                          :data-index="index"
                          ref="myInput"
                        >
                    </li>
                </ul>
            </section>
            <!-- This footer should hidden by default and shown when there are todos -->
            <footer class="footer">
                <!-- This should be `0 items left` by default -->
                <span class="todo-count"><strong>{{ restNum }}</strong> item left</span>
                <!-- Remove this if you don't implement routing -->
                <ul class="filters">
                    <li>
                        <a :class="{ selected: filterString === 'all' }" href="#/">All</a>
                    </li>
                    <li>
                        <a :class="{ selected: filterString === 'active' }" href="#/active">Active</a>
                    </li>
                    <li>
                        <a :class="{ selected: filterString === 'completed' }" href="#/completed">Completed</a>
                    </li>
                </ul>
                <!-- Hidden if no completed items are left ↓ -->
                <button class="clear-completed" @click="clearCompleted">Clear completed</button>
            </footer>
        </section>
    </div>
</template>

<script>
export default{
  name: 'todoList',
  data(){
    return{
      todoList: JSON.parse(window.localStorage.getItem('vue-todos') || '[]'),
      showList: [],
      restNum: 0,
      toggleAll: false,
      whichEditing: null,
      filterString: String,
    }
  },

  methods: {
    deleteOne:function(deleteId){
      this.todoList.forEach((item, index)=>{
        if(item.id === deleteId){
          this.todoList.splice(index, 1)
          if(!item.done){
            this.restNum -= 1
          }else{
            // 改变页面显示元素出发beforeUpdate钩子函数
            this.restNum += 1
            this.restNum -= 1
          }
        }
      })
    },

    addOne: function(event){
      // 添加todo内容，在按下键盘enter并且输入内容不为空时触发，添加ID时判断当前数组是否为空，如果为空返回1
      if(event.keyCode === 13 && this.$refs.toAdd.value){
        let lastId = this.todoList.length ? this.todoList.slice(-1)[0].id + 1 : 1
        this.todoList.push({
          'id': lastId,
          'title': this.$refs.toAdd.value,
          'done': false,
        })
        this.restNum += 1
        this.isAllCheck()
        this.$refs.toAdd.value = ''      
      }
    },

    changeCheck: function(changeId){
      this.todoList.forEach((item, index)=>{
        if(item.id === changeId){
          item.done = !item.done
          this.restNum += item.done ? -1 : 1
          this.isAllCheck() 
        }
      })
    },

    changeToggleAll: function(){
      if(this.todoList.length){
        this.toggleAll = !this.toggleAll
        for(let item of this.todoList){
          item.done = this.toggleAll
        }
        this.restNum = this.toggleAll ? 0 : this.todoList.length
      }
    },

    isAllCheck: function(){
      if(this.restNum === 0 && this.todoList.length){
        this.toggleAll = true
      }else{
        this.toggleAll = false
      }
    },

    editTitle: function(event){
      // 双击todo列表进入编辑界面

      // 只有在todo内容未完成时才可以进行编辑
      // 双击后再次双击应无法再次获取this.todoList[event.target.dataset.index]否则会报错，无法找到done属性
      // 当被双击的对象是label时才进行后续操作，如果双击为li或input标签则无动作
      if(event.target.nodeName === 'LABEL'){
        let {index} = event.target.dataset
      

        if(index && !this.todoList[index].done){
          this.whichEditing = parseInt(event.target.dataset.index)
        }

        // 在whichEditing属性改变后，input元素display属性改为block，在元素渲染完成后再对其文本内容进行聚焦
        setTimeout(()=>{
          this.$refs.myInput[index].focus()
        }, 10)
      }
      
    },

    saveEdit: function(event){
      // 修改title完成后的操作
      if(event.keyCode === 27){
        this.whichEditing = null
        return
      }else if(event.keyCode === 13){
        this.todoList[event.target.dataset.index].title = event.target.value
        this.whichEditing = null
      }
    },

    clearCompleted: function(){
      // let newList = []
      // for(let item of this.todoList){
      //   if(!item.done){
      //     newList.push(item)
      //   }
      // }
      // this.todoList = newList
      this.todoList = this.todoList.filter(item=>!item.done)
      // beforeUpdate只有在页面元素改变时才触发，在删除完成元素时restNum未改变因此页面没能刷新，将showList重新复制可以触发元素更新，也可以改变restNum触发beforeUpdate
      // this.showList = this.todoList
      this.restNum += 1
      this.restNum -= 1
    },

    getShowList: function(){
      switch(this.filterString){
        case 'all':
          return this.todoList
        case 'active':
          return this.todoList.filter((item) => !item.done)
        case 'completed':
          return this.todoList.filter((item) => item.done)
      } 
    }
  },

  // 生命周期钩子函数
  beforeMount: function(){
    // 初始化数据
    console.log(this.$refs)
    this.restNum = this.todoList.filter((item)=> !item.done ).length
    this.filterString = window.location.hash.substr(2) || 'all'
    this.showList = this.getShowList()
    window.onhashchange = () => {
      let hash = window.location.hash.substr(1)
      switch(hash){
        case '/':
          this.filterString = 'all'
          break;
        case '/active':
          this.filterString = 'active'
          break;
        case '/completed':
          this.filterString = 'completed'
          break;
      }
      this.showList = this.getShowList()
    }  
  },

  beforeUpdate: function(){
    console.log('b update')
    window.localStorage.setItem('vue-todos', JSON.stringify(this.todoList) || '[]')
    this.showList = this.getShowList()
  }
}

</script>

<style>
    
</style>