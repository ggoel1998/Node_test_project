let list=document.getElementById('list');
let add=document.getElementById('add');
let input = document.getElementById('input');
let date = document.getElementById('date');
let clear = document.getElementById('clear');
let sorts = document.getElementById('sort');
let sort_date = document.getElementById('sort_date');
let delall = document.getElementById('delall');


async function getTasks(){
    const resp = await fetch('/todos')
    const todos= await resp.json()
    return todos  

}
async function addTask(taskName) {
    const resp = await fetch('/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: taskName,
        done:false,
        
      }),
    })
    const data = await resp.json()
  
    if (resp.status == 201) {
      window.alert('Todo ' + data.todoId + ' added')
    } else {
      window.alert(data.message)
    }
    console.log("add func is working")
  }

  


// async function removetask(id) {
//     const todos = await getTasks()
//     for(let i=id;i<todos.length-1;i++)
//     {
//         item = todos[i];
//         todos[i] = todos[i+1];
//         todos[i+1] = item;
//     }
// }

function moveup(id) {
    if(id > 0) {
        let temp = tasks[id];
        tasks[id] = tasks[id-1];
        tasks[id-1] = temp;
    }
}

function movedown(id) {
    if(id < tasks.length-1) {
        let temp = tasks[id];
        tasks[id] = tasks[id+1];
        tasks[id+1] = temp;
    }
}

async function renderlist() {
    list.innerHTML='';
    const todos = await getTasks()
    for(const [j, i] of todos.entries()){
        let item = document.createElement('li');
        item.className = 'list-group-item row d-flex';
        let item_name = document.createElement('span');
        item_name.innerText = i.name;
        item_name.className = i.done?'col-4 done':'col-4';
        let item_date = document.createElement('input');
        item_date.type = "date";
        // item_date.value = tasks[i].due_date;  //date is commented rn
        item_date.className = "form-control col-3 mx-2";
        // let btn = document.createElement('button');
        let itembtn = document.createElement('div');
        // itembtn.innerText = 'Remove';
        itembtn.className = 'btn btn-warning col-1 ib mx-2  fas fa-times-circle';
        let itemup = document.createElement('div');
        // itemup.innerText = 'Move Up';
        itemup.className = 'btn btn-success col-1 ib mx-2 fas fa-chevron-circle-up';
        let itemdown = document.createElement('div');
        // itemdown.innerText = 'Move Down';
        itemdown.className = 'btn btn-secondary col-1 ib mx-2 fas fa-chevron-circle-down';
        itembtn.onclick = function() {
           
            todos.splice(j,1);
            renderlist();
        }
        item_name.onclick = function() {
            i.done= !i.done;
            renderlist();
        }
        item_date.onchange = function() {
            tasks[i].due_date = item_date.value;
        }
        itemup.onclick = function() {
            moveup(i);
            renderlist();
        }
        itemdown.onclick = function() {
            movedown(i);
            renderlist();
        }
        item.appendChild(item_name);
        item.appendChild(item_date);
        item.appendChild(itemup);
        item.appendChild(itemdown);
        item.appendChild(itembtn);
        list.appendChild(item);
    }
    console.log("render list is working")

}

function inputtask() {
    if(input.value){
        addTask(input.value);
        input.value='';
        // date.value='';
        console.log("input task is working")
    }
    renderlist();
}


async function cleardone() {
    const todos = await getTasks()
    todos = todos.filter(item => !item.done);
    renderlist();
}

add.onclick = async function() {
    await inputtask()
    await renderlist()
    // console.log("click is working")
  }

input.addEventListener('keypress' , (event) => {
    if(event.keyCode == 13) inputtask();
    console.log("add event listener is working")
})
date.addEventListener('keypress' , (event) => {
    if(event.keyCode == 13) inputtask();
})
clear.addEventListener('click', cleardone);
sorts.addEventListener('click' , function() {
    tasks.sort((a,b) => a.name > b.name);
    renderlist();
})
delall.addEventListener('click', function() {
    tasks=[];
    renderlist();
})
sort_date.addEventListener('click', function() {
    tasks.sort((a,b) => a.due_date > b.due_date);
    renderlist();
})