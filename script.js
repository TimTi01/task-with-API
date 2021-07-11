async function getUser() {
    const usersContainer = document.body.querySelector('.users_container')
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET'
    })
    if (response.ok) {
        response.json().then(data => {
            data.forEach(async (user) => {
                const {id, name, email} = user

                const userElem = document.createElement('div')
                const userTitle = document.createElement('div')
                const userPost = document.createElement('div')
                const del = document.createElement('div')
                const postBttn = document.createElement('div')
                const idItem = document.createElement('div')
                const nameItem = document.createElement('div')
                const emailItem = document.createElement('div')
                const postsItem = document.createElement('div')
                const postElem = document.createElement('div')
                const postComment = document.createElement('div')



                userElem.classList.add('user')
                userTitle.classList.add('user_title')
                userPost.classList.add('user_post')
                del.classList.add('delete-bttn')
                postBttn.classList.add('post-bttn')
                idItem.classList.add('user-style')
                nameItem.classList.add('user-style')
                emailItem.classList.add('user-style')
                postsItem.classList.add('user-style')
                postElem.classList.add('post')
                postComment.classList.add('post_comment')

                idItem.innerText = id
                nameItem.innerText = name
                emailItem.innerText = email
                del.innerText = '✖'

                userTitle.append(idItem, nameItem, emailItem, postBttn, del)

                let comments = await getComments(id)
                comments.forEach((item) => {
                    postComment.innerHTML += `<div class="post_comment">
                                                <div class="post_comment-email">${item.email}</div>
                                                <div class="post_comment-body">${item.body}</div>
                                               </div>`
                })

                let posts = await getPosts(id)
                posts.forEach((item) => {
                    userPost.innerHTML += `<div class="post">
                                                <div class="post_cont">
                                                <div class="post_title">${item.title}</div>
                                                <div class="post_body">${item.body}</div>
                                                </div>
                                            </div>`
                    userPost.append(postComment)
                })

                userElem.append(userTitle, userPost)
                usersContainer.append(userElem)
            })
        })
        let deleteBttn = await document.body.querySelectorAll('.delete-bttn')
        console.log(await deleteBttn)
    }

    let deleteBttn = document.body.querySelectorAll('.delete-bttn')
    deleteBttn.forEach( (elem, item) => {
        elem.addEventListener('click', (event) => {
            event.target.parentElement.remove()
            delUser(item+1)
        })
    })
}


async function getPosts(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`, {
        method: 'GET'
    })
    return await response.json()
}

async function getComments(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
        method: 'GET'
    })
    return await response.json()
}


async function delUser(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE'
    })
}

getUser()
