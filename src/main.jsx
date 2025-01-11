import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'
import './index.css'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Protectedauth from './components/Protectedauth.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='login' element={<Protectedauth status={false}><Login/></Protectedauth>} />
      <Route path='signup' element={<Protectedauth status={false}><Signup/></Protectedauth>} />
      <Route path='allposts' element={<Protectedauth><AllPosts/></Protectedauth>} />
      <Route path='addpost' element={<Protectedauth><AddPost/></Protectedauth>} />
      <Route path='edit-post/:slug' element={<Protectedauth><EditPost/></Protectedauth>} />
      <Route path='post/:slug' element={<Protectedauth><Post/></Protectedauth>} />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
