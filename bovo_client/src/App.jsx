import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginLayout from './layout/loginLayout/LoginLayout'
import Login from './pages/login/Login'
import SignUpLayout from './layout/signUpLayout/SignUpLayout'
import SignUpStep1 from './pages/signUpStep1/SignUpStep1'
import SignUpStep2 from './pages/signUpStep2/SignUpStep2'
import Layout from './layout/basicLayout/Layout'
import Main from './pages/main/Main'
import BookSearch from './pages/bookSearch/BookSearch'
import BookSearchDetail from './pages/bookSearchDetail/BookSearchDetail'
import Archive from './pages/archive/Archive'
import Note from './pages/note/Note'
import NoteDetail from './pages/noteDetail/NoteDetail'
import NoteEdit from './pages/noteEdit/NoteEdit'
import NoteCombine from './pages/noteCombine/NoteCombine'
import NoteArr from './pages/noteArr/NoteArr'
import Forum from './pages/forum/Forum'
import ForumMake from './pages/forumMake/ForumMake'
import ForumChat from './pages/forumChat/ForumChat'
import MyPage from './pages/myPage/MyPage'
import MyProfile from './pages/myProfile/MyProfile'
import ServiceInfo from './pages/serviceInfo/ServiceInfo'
import Exp from './pages/exp/Exp'
import MyProfileEdit from './pages/myProfileEdit/MyProfileEdit'
import Calendar from './pages/calendar/Calendar'
import ErrorPage from './pages/errorPage/ErrorPage'
import KakaoCallback from './pages/login/KakaoCallback'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginLayout />}>
            <Route index element={<Login />}/>
          </Route>
          <Route path='/sign-up' element={<SignUpLayout />}>
            <Route path='/sign-up/step1' element={<SignUpStep1 />} />
            <Route path='/sign-up/step2' element={<SignUpStep2 />} />
          </Route>
          <Route path='/' element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='/search' element={<BookSearch />} />
            {/* <Route path='/search/:isbn' element={<BookSearchDetail />} /> */}
            <Route path='/search/search-detail' element={<BookSearchDetail />} />
            <Route path='/archive' element={<Archive />} />
            {/* <Route path='/archive/:isbn' element={<Note />} /> */}
            <Route path='/note/:book_id' element={<Note />} />
            {/* <Route path='/archive/:isbn/:noteId' element={<NoteDetail />} /> */}
            <Route path='/note/note-detail/:memo_id' element={<NoteDetail />} />
            {/* <Route path='/archive/:isbn/note-edit' element={<NoteEdit />} /> */}
            <Route path='/note/note-edit' element={<NoteEdit />} />
            <Route path='/note/note-edit/:memo_id' element={<NoteEdit />} />
            {/* <Route path='/archive/:isbn/note-combine' element={<NoteCombine />} /> */}
            <Route path='/note/note-combine/:book_id' element={<NoteCombine />} />
            {/* <Route path='/archive/:isbn/note-array' element={<NoteArr />} /> */}
            <Route path='/note/note-array' element={<NoteArr />} />
            <Route path='/forum' element={<Forum />} />
            <Route path='/forum/forum-make' element={<ForumMake />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/mypage/myprofile' element={<MyProfile />} />
            <Route path='/mypage/service-info' element={<ServiceInfo />} />
            <Route path='/mypage/exp' element={<Exp />} />
            <Route path='/mypage/myprofile/edit' element={<MyProfileEdit />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/404' element={<ErrorPage />} />
          </Route>
          <Route path='/auth/kakao/callback' element={<KakaoCallback />} />
          <Route path='/forum/forum-chat' element={<ForumChat />} />
          <Route path='/*' element={<Navigate to={"/404"} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
