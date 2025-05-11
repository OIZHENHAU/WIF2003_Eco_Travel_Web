document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('status');
    const taskListElement = document.getElementById('taskList');
    const addTaskForm = document.getElementById('addTaskForm');
    
    // Check backend status
    checkBackendStatus();
    
    // Load tasks
    loadTasks();
    
    // Add task form submission
    addTaskForm.addEventListener('submit', handleAddTask);
    
    // Check backend status function
    function checkBackendStatus() {
        fetch('/api/status')
            .then(response => response.json())
            .then(data => {
                const statusText = `Backend is online! Database: ${data.mongoConnection}. Last check: ${new Date(data.timestamp).toLocaleString()}`;
                statusElement.textContent = statusText;
                statusElement.classList.add('online');
                statusElement.classList.remove('offline');
            })
            .catch(error => {
                statusElement.textContent = 'Backend is offline!';
                statusElement.classList.add('offline');
                statusElement.classList.remove('online');
                console.error('Error checking backend status:', error);
            });
    }
    
    // Load tasks from the backend
    function loadTasks() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(tasks => {
                if (tasks.length === 0) {
                    taskListElement.innerHTML = '<p>No tasks yet. Add one above!</p>';
                    return;
                }
                
                taskListElement.innerHTML = '';
                tasks.forEach(task => {
                    const taskElement = createTaskElement(task);
                    taskListElement.appendChild(taskElement);
                });
            })
            .catch(error => {
                taskListElement.innerHTML = '<p>Error loading tasks. Please try again later.</p>';
                console.error('Error loading tasks:', error);
            });
    }
    
    // Create HTML element for a task
    function createTaskElement(task) {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.dataset.id = task._id;
        
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';
        
        const taskTitle = document.createElement('div');
        taskTitle.className = 'task-title';
        taskTitle.textContent = task.title;
        
        const taskDescription = document.createElement('div');
        taskDescription.className = 'task-description';
        taskDescription.textContent = task.description || 'No description';
        
        taskContent.appendChild(taskTitle);
        taskContent.appendChild(taskDescription);
        
        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';
        
        const toggleButton = document.createElement('button');
        toggleButton.className = 'btn btn-small btn-toggle';
        toggleButton.textContent = task.completed ? 'Mark Incomplete' : 'Mark Complete';
        toggleButton.addEventListener('click', () => toggleTaskStatus(task._id, !task.completed));
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-small btn-delete';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task._id));
        
        taskActions.appendChild(toggleButton);
        taskActions.appendChild(deleteButton);
        
        taskItem.appendChild(taskContent);
        taskItem.appendChild(taskActions);
        
        return taskItem;
    }
    
    // Handle form submission to add a new task
    function handleAddTask(e) {
        e.preventDefault();
        
        const formData = new FormData(addTaskForm);
        const taskData = {
            title: formData.get('title'),
            description: formData.get('description'),
            completed: formData.get('completed') === 'on'
        };
        
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add task');
            }
            return response.json();
        })
        .then(newTask => {
            // Clear form
            addTaskForm.reset();
            
            // Add the new task to the list
            const taskElement = createTaskElement(newTask);
            
            // If there was a "No tasks yet" message, clear it
            if (taskListElement.innerHTML.includes('No tasks yet')) {
                taskListElement.innerHTML = '';
            }
            
            taskListElement.insertBefore(taskElement, taskListElement.firstChild);
        })
        .catch(error => {
            console.error('Error adding task:', error);
            alert('Failed to add task. Please try again.');
        });
    }
    
    // Toggle task completed status
    function toggleTaskStatus(taskId, completed) {
        fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            return response.json();
        })
        .then(updatedTask => {
            // Update the task in the UI
            const taskElement = document.querySelector(`.task-item[data-id="${taskId}"]`);
            if (taskElement) {
                const toggleButton = taskElement.querySelector('.btn-toggle');
                
                if (updatedTask.completed) {
                    taskElement.classList.add('completed');
                    toggleButton.textContent = 'Mark Incomplete';
                } else {
                    taskElement.classList.remove('completed');
                    toggleButton.textContent = 'Mark Complete';
                }
            }
        })
        .catch(error => {
            console.error('Error updating task:', error);
            alert('Failed to update task. Please try again.');
        });
    }
    
    // Delete a task
    function deleteTask(taskId) {
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }
        
        fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            return response.json();
        })
        .then(() => {
            // Remove the task from the UI
            const taskElement = document.querySelector(`.task-item[data-id="${taskId}"]`);
            if (taskElement) {
                taskElement.remove();
                
                // If there are no more tasks, show the empty message
                if (taskListElement.children.length === 0) {
                    taskListElement.innerHTML = '<p>No tasks yet. Add one above!</p>';
                }
            }
        })
        .catch(error => {
            console.error('Error deleting task:', error);
            alert('Failed to delete task. Please try again.');
        });
    }
});