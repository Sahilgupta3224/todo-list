    window.addEventListener('load',()=>{
    todos = JSON.parse(localStorage.getItem('todos'))||[];
    const nameInput = document.querySelector('.name');
    const newTodoform = document.querySelector('#new-todo-form');
    const username = localStorage.getItem('username')||'';
    nameInput.value = username;
    nameInput.addEventListener('change',(e)=>{
        localStorage.setItem('username',e.target.value);
    })

    newTodoform.addEventListener('submit',(e)=>{
        e.preventDefault();

        const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		e.target.reset();

		DisplayTodos()
    })
    DisplayTodos()
})

function DisplayTodos(){
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = "";
    todos.forEach(todo=>{
        const todoItem = document.createElement('div');
        const label = document.createElement('label');
        const span = document.createElement('span');
        const actions = document.createElement('div');
        const content= document.createElement('div');
        const input = document.createElement('input');
        const edit = document.createElement('button');
        const deleteb = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');
        if(todo.category=='Formal'){
            span.classList.add('Formal');
        }
        else{
            span.classList.add('Informal');
        }
        todoItem.classList.add('todo-item');
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteb.classList.add('delete');
        edit.innerHTML = `EDIT`;
        deleteb.innerHTML = `DELETE`;
        const contentInput = document.createElement('input');
        contentInput.type = 'text';
        contentInput.value = todo.content;
        contentInput.readOnly = true;
        if(todo.category){
            //content.innerHTML = `<input type = "text" value =  "${todo.content}(${todo.category})" readonly>`;
            const categorySpan = document.createElement('span');
            categorySpan.textContent = `(${todo.category})`;
            content.appendChild(contentInput);
            content.appendChild(categorySpan);
        }
        else{
            content.innerHTML = `<input type = "text" value =  "${todo.content}" readonly>`;
        }
        
        label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteb);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);
		todoList.appendChild(todoItem);

        if(todo.done){
            todoItem.classList.add('done');
        }

        input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

        edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = input.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()
			})
		})

		deleteb.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})
    })
}

