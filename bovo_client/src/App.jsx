import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import LoginLayout from './layout/loginLayout/LoginLayout'
import Login from './pages/login/Login'
import SignUpLayout from './layout/signUpLayout/SignUpLayout'
import SignUp from './pages/signUp/SignUp'
import KakaoSignUp from './pages/kakaoSignUp/KakaoSignUp'
import Layout from './layout/basicLayout/Layout'
import Main from './pages/main/Main'
import BookSearch from './pages/bookSearch/BookSearch'
import BookSearchDetail from './pages/bookSearchDetail/BookSearchDetail'
import Archive from './pages/archive/Archive'
import Note from './pages/note/Note'
import NoteDetail from './pages/noteDetail/NoteDetail'
import NoteEdit from './pages/noteEdit/NoteEdit'
import NoteCombine from './pages/noteCombine/NoteCombine'
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
import ChatLayout from './layout/chatLayout/layout/ChatLayout'
import { useEffect } from 'react'
import { enableInterceptor } from "./api/Auth.js";

function App() {

  return (
    <>
      <BrowserRouter>
        {/* <InterceptorWrapper /> useNavigate를 여기에서 사용 */}
        <Routes>
          <Route path='/kakao/bovocallback' element={<KakaoCallback />} />
          <Route path='/login' element={<LoginLayout />}>
            <Route index element={<Login />}/>
          </Route>
          <Route path='/sign-up' element={<SignUpLayout />}>
            <Route path='/sign-up/basic' element={<SignUp />} />
            <Route path='/sign-up/kakao' element={<KakaoSignUp />} />
          </Route>
          <Route path='/' element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='/search' element={<BookSearch />} />
            {/* <Route path='/search/:isbn' element={<BookSearchDetail />} /> */}
            <Route path='/search/search-detail' element={<BookSearchDetail />} />
            <Route path='/archive' element={<Archive />} />
            <Route path='/archive/:book_id' element={<Note />} />
            <Route path='/archive/:book_id/memo' element={<NoteDetail />} />
            <Route path='/archive/edit/:book_id' element={<NoteEdit />} />
            <Route path='/archive/edit/:book_id/:memo_id' element={<NoteEdit />} />
            <Route path='/archive/:book_id/memos' element={<NoteCombine />} />
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
          <Route path='/forum/:roomId' element={<ChatLayout />}>
            <Route index element={<ForumChat />} />
          </Route>
          <Route path='/*' element={<Navigate to={"/404"} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

function InterceptorWrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    enableInterceptor(() => {
      navigate("/login"); // 토큰 만료 시 로그인 페이지로 이동
    });
  }, [navigate]);

  return null; // UI를 렌더링하지 않는 컴포넌트
}

export default App;