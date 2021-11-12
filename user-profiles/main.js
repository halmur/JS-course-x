const userProfiles = document.querySelector('#user-profiles')

// async function for all possible fetching
const fetchData = async api => {
  const response = await fetch(api)
  const responseData = await response.json()
  return responseData
}

const createUserProfiles = async () => {
  fetchData('https://jsonplaceholder.typicode.com/users')
  .then(users => {
    users.forEach(user => {
      const profileCard = document.createElement('div')
      profileCard.className = 'profile-card'
      
      const userName = document.createElement('p')
      userName.className = 'user-name'
      userName.textContent = user.username
      
      const showInfoBtn = document.createElement('button')
      showInfoBtn.className = 'show-info-btn'
      showInfoBtn.textContent = 'show info'
      
      const deleteBtn = document.createElement('button')
      deleteBtn.className = 'delete-btn'
      deleteBtn.textContent = 'delete'
      
      profileCard.appendChild(userName)
      profileCard.appendChild(showInfoBtn)
      profileCard.appendChild(deleteBtn)
      userProfiles.appendChild(profileCard)
      
      // removes specific user profile
      deleteBtn.addEventListener('click', _ => {
        if (confirm(`this will delete ${user.username}'s profile`)) {
          userProfiles.removeChild(profileCard)
        }
      })
      
      // will display more info about individual users post and todos
      const showUserInfo = _ => {
        showInfoBtn.removeEventListener('click', showUserInfo)

        const nameAndLocation = document.createElement('p')
        nameAndLocation.innerHTML = `name: <span>${user.name}</span> location: <span>${user.address.city}</span>`
        nameAndLocation.className = 'name-and-location'
        profileCard.appendChild(nameAndLocation)

        // fetch users post
        fetchData(`https://jsonplaceholder.typicode.com/posts/?userId=${user.id}`).then(respPost => {
          const postSection = document.createElement('section')
          postSection.className = 'post-section'
          
          const postHeading = document.createElement('h3')
          postHeading.textContent = '5 post with comments'
          postHeading.className = 'headingh3'
          postSection.appendChild(postHeading)
          
          // limit the code to 5 post then fetch 5 comments for each post
          respPost.forEach((p, i) => {
            if (i > 4) {
              return
            }

            const post = document.createElement('div')
            post.className = 'post'
            
            const postTitle = document.createElement('p')
            postTitle.className = 'post-title'
            postTitle.textContent = p.title
            postTitle.style.cursor = 'pointer'
            
            post.appendChild(postTitle)
            postSection.appendChild(post)

            // fetch commments for respective post title
            const showComments = _ => {
              fetchData(`https://jsonplaceholder.typicode.com/comments?postId=${p.id}`)
              .then(comments => {
                const postComments = document.createElement('ul')
                postComments.className = 'post-comments'

                comments.forEach(c => {
                  const comment = document.createElement('li')
                  comment.className = 'comment'
                  comment.textContent = c.name
                  postComments.appendChild(comment)
                })
                post.appendChild(postComments)
              })
              postTitle.removeEventListener('click', showComments)
            }
            postTitle.addEventListener('click', showComments)
          })
          profileCard.appendChild(postSection)
        })
        
        // fetch and display user todos
        fetchData(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`).then(respTodos => {
          const todoSection = document.createElement('section')
          todoSection.className = 'todo-section'

          const todosHeading = document.createElement('h3')
          todosHeading.className = 'headingh3'
          todosHeading.textContent = 'compleated todos'
          todoSection.appendChild(todosHeading)

          const todos = document.createElement('div')
          todos.className = 'todos'

          respTodos.forEach((t, i) => {
            if (!t.completed) {
              return
            }
            const todo = document.createElement('p')
            todo.className = 'todo'
            todo.innerHTML = `<span>${i}</span> - ${t.title}`
            todos.appendChild(todo)
          })

          todoSection.appendChild(todos)
          profileCard.appendChild(todoSection)
        })
      }
      showInfoBtn.addEventListener('click', showUserInfo)
    });
  })
}
createUserProfiles()