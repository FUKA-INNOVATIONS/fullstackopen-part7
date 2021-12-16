import React, { useState, useEffect, useRef } from 'react'
import Post from './components/Post'
import blogService from './services/blogService'
import Footer from './components/Footer'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'
import PostForm from './components/PostForm'
import { Notification } from './components/Notification'
import Togglable from './components/Togglable'
import axios from 'axios'
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createMessage, resetMessage } from './reducers/notificationReducer'
import { initPosts, addNewPost } from './reducers/postReducer'
import { setUser } from './reducers/userReducer'
import Users from './components/Users'
import UserDetail from './components/UserDetail'
import SinglePost from './components/SinglePost'

const HomeLoggedIn = (props) => {
  return (
      <div>
        <p>{props.user.username} logged in <button onClick={props.handleLogout}>Logout</button></p>

        {props.postForm()}

        <div>
          <h2>Blog posts</h2>
          <ul style={ulStyle}>
            {props.posts.map(post =>
                <Post key={post.id}
                      post={post}
                      deletePost={props.deletePost}
                      likePost={props.likePost} />
            )}
          </ul>
        </div>
      </div>
  )
}

const HomeLoggedOut = (props) => {
  return (
      props.loginForm()
  )
}

const NavigationMenu = () => {
  const paddingNav = {
    paddingRight: 5
  }
  return (
      <div>
        <Link to='/' style={paddingNav}>Home</Link>
        <Link to='/users' style={paddingNav}>Users</Link>
      </div>
  )
}

const App = () => {
  const posts = useSelector(state => state.posts)
  const postFormRef = useRef()
  const [postDeleted, setPostDeleted] = useState(false)
  const [postLiked, setPostLiked] = useState(false)
  const [postsUpdated, setPostsUpdated] = useState(false)

  const dispatch = useDispatch()
  const [ notification ] = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
    .getAll().then(initialPosts => {
      // Sort posts by most likes
      initialPosts.sort((a, b) => {
        return b.likes - a.likes
      }).map(post => {
        if (user !== null) {
          post.isOwner = (user.username === post.user.username)
        }
      })
      dispatch(initPosts(initialPosts))
    })
    setPostDeleted(false)
    setPostLiked(false)
    setPostsUpdated(false)
  }, [postDeleted, postLiked, postsUpdated, user])


  const showMessage = ( content, type ) => {
    dispatch(createMessage({ content, type }))
    setTimeout( () => {
      dispatch(resetMessage())
    }, 5000 )
  }

  const addPost = async (newPost) => {
    console.log('addPost called')
    postFormRef.current.toggleVisibility()
    try {
      const postCreated = await blogService.create(newPost)
      showMessage(`a new blog ${postCreated.title} by ${postCreated.author} added`, 'success')
      dispatch(addNewPost(postCreated))
      setPostsUpdated(true)
    } catch ( exception ) {
      showMessage('Creation of new blog post failed!', 'error')
    }
  }

  // // 7.11: redux, step3: LIKETYS ei vaadi refaktorointia, toimii sellaisenaan!
  const likePost = async (postId, currentLikes) => {
    const likeIncremented = currentLikes + 1
    await axios.put(`/api/posts/${postId}`, { likes: likeIncremented })
    setPostLiked(true)
  }

  // 7.11: redux, step3: POISTO ei vaadi refaktorointia, toimii sellaisenaan!
  const deletePost = async (postId) => {
    const token = user.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    try {
      await axios.delete(`api/posts/${postId}`, config)
      showMessage('Post successfully deleted!', 'success')
      setPostDeleted(true)
    } catch (exception) {
      showMessage('Post deletion failed!', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
    showMessage('Logged out successfully!', 'success')
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (exception) {
      //showMessage('Login failed!', 'error')
      showMessage('login failed', 'error')
    }
  }

  const loginForm = () => {
    return (
        <Togglable buttonLabel={'Login'}>
          <LoginForm
              handleLogin={handleLogin}
          />
        </Togglable>
    )
  }


  const postForm = () => {
    return (
        <Togglable buttonLabel={'Create new post'} ref={postFormRef}>
          <PostForm
              createPost={addPost}
              token={user.token}
          />
        </Togglable>
    )
  }

  const notificationContent = notification ? <Notification message={notification.message} /> : null

  return (
      <div>
        { notificationContent }

        { user === null && <HomeLoggedOut loginForm={loginForm} /> }


        {user && <NavigationMenu />}

        {user &&
        <Routes>
          <Route path={'/'} element={<HomeLoggedIn
              user={user}
              handleLogout={handleLogout}
              postForm={postForm}
              posts={posts}
              deletePost={deletePost}
              likePost={likePost}
          />} />
          <Route path={'/users'} element={<Users />} />
          <Route path={'/users/:id'} element={<UserDetail />} />
          <Route path={'/posts/:id'} element={<SinglePost likePost={likePost} />} />
        </Routes>
        }

        <Footer />
      </div>
  )
}

const ulStyle = {
  listStyleType: 'none',
}


export default App