(function() {
    function createAppTitle(title) {
        let appTitle = document.createElement('h2')
        appTitle.innerHTML = title
        return appTitle
    }

    function createTodoItemForm() {
        let form = document.createElement('form')
        let input = document.createElement('input')
        let buttonWrapper = document.createElement('div')
        let button = document.createElement('button')

        form.classList.add('input-group', 'mb-3')
        input.classList.add('form-control')
        input.placeholder = 'Введите название вашего дела'
        buttonWrapper.classList.add('input-group-append')
        button.classList.add('btn', 'btn-primary')
        button.textContent = 'Добавить дело'

        buttonWrapper.append(button)
        form.append(input)
        form.append(buttonWrapper)

        return {
            form,
            input,
            button
        }
    }

    function createTodoList() {
        let list = document.createElement('ul')
        list.classList.add('list-group')
        return list
    }

    function createTodoItem(name) {
        let item = document.createElement('li')

        let buttonGroup = document.createElement('div')
        let doneButton = document.createElement('button')
        let deleteButton = document.createElement('button')


        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
        item.textContent = name

        buttonGroup.classList.add('btn-group', 'btn-group-sm')
        doneButton.classList.add('btn', 'btn-success')
        doneButton.textContent = 'Готово'
        deleteButton.classList.add('btn', 'btn-danger')
        deleteButton.textContent = 'Удалить'

        buttonGroup.append(doneButton)
        buttonGroup.append(deleteButton)
        item.append(buttonGroup)

        doneButton.addEventListener('click', function() {
            item.classList.toggle('list-group-item-success')
            localStorage.removeItem('me')
            saveTodoList()
        })

        deleteButton.addEventListener('click', function() {
            if (confirm('Вы уверены?')) {
                item.remove()  
                localStorage.removeItem('me')
                saveTodoList()
            }
        })
        
        return {
            item,
            doneButton,
            deleteButton
        }
    }
    

    function saveTodoList(storageName) {
        let todoItemsParent = document.querySelector('.list-group')
        let todoItemsList = todoItemsParent.innerHTML

        localStorage.setItem(storageName, todoItemsList)
    }

    function getTodoList(storageName) {
        if (localStorage.getItem(storageName) !== null) {
            let todoItemsParent = document.querySelector('.list-group')
            todoItemsParent.innerHTML = localStorage.getItem(storageName)

            document.querySelectorAll('.list-group-item').forEach(card =>{
                card.addEventListener('click', function(e) {
                    if (e.target.closest('.btn-success')) {
                        card.classList.toggle('list-group-item-success')
                        localStorage.removeItem(storageName)
                        saveTodoList(storageName)
                    }
                    
                    if (e.target.closest('.btn-danger')) {
                        if (confirm('Вы уверены')) {
                            card.remove()
                            localStorage.removeItem(storageName)
                            saveTodoList(storageName)
                        }
                    }
                    
                })
            })
        }
    }


    function createTodoApp(container, title = 'Список дел', localStorageItemName) {
        
        let todoAppTitle = createAppTitle(title)
        let todoItemForm = createTodoItemForm()
        let todoList = createTodoList() 
    
        container.append(todoAppTitle)
        container.append(todoItemForm.form)
        container.append(todoList)

        getTodoList(localStorageItemName)

        if (todoItemForm.input.value === '') {
            todoItemForm.button.disabled = true
        }

        todoItemForm.input.addEventListener('input', function() {
            if (todoItemForm.input.value === '') {
                todoItemForm.button.disabled = true
            } else {
                todoItemForm.button.disabled = false
            }
        })


        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault()  

            if (!todoItemForm.input.value) {
                return
            }

            let todoItem = createTodoItem(todoItemForm.input.value)
            
            todoList.append(todoItem.item)

            saveTodoList(localStorageItemName)

            todoItemForm.button.disabled = true
            todoItemForm.input.value = ''
        })

    }

    window.createTodoApp = createTodoApp
}) ()