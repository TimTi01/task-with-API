async function getUser() {
    const usersContainer = document.body.querySelector('.users_container')
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET'
    })
    if (response.ok) {
        let users = await response.json()
        for (const user of users) {
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
            userPost.classList.add('hidden')
            del.classList.add('delete-bttn')
            postBttn.classList.add('post-bttn')
            idItem.classList.add('user-style')
            idItem.classList.add('id-style')
            nameItem.classList.add('user-style')
            emailItem.classList.add('user-style')
            postsItem.classList.add('user-style')
            postElem.classList.add('post')
            postComment.classList.add('post_comment')
            postComment.classList.add('hidden')

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
                                                <div class="show-comment"></div>
                                            </div>`
                userPost.append(postComment)
            })

            userElem.append(userTitle, userPost)
            usersContainer.append(userElem)
        }
    }

    let deleteBttn = document.body.querySelectorAll('.delete-bttn')
    deleteBttn.forEach( (elem, item) => {
        elem.addEventListener('click', (event) => {
            event.target.parentElement.parentElement.remove()
            delUser(item+1)
        })
    })

    let showPosts = document.body.querySelectorAll('.post-bttn')
    showPosts.forEach( (elem, item) => {
        elem.addEventListener('click', (event) => {
            // console.log(event.target.parentElement.nextSibling)
            event.target.parentElement.nextSibling.classList.toggle('hidden')
        })
    })

    let showComment = document.body.querySelectorAll('.show-comment')
    showComment.forEach( (elem, item) => {
        elem.addEventListener('click', (event) => {
            // console.log(event.target.parentElement.nextSibling)
            event.target.parentElement.nextSibling.classList.toggle('hidden')
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
