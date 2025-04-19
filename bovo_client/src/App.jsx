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
import Archive from './pages/archive/Archive'
import KakaoCallback from './pages/login/KakaoCallback'
import { lazy, Suspense, useEffect } from 'react'
import { enableInterceptor } from "./api/Auth.js";
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './store/queryClient/queryClient.js'
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner.jsx'


function App() {
  // Lazy 컴포넌트
  const BookSearchDetail = lazy(() => import('./pages/bookSearchDetail/BookSearchDetail'));
  const Note = lazy(() => import('./pages/note/Note'));
  const NoteDetail = lazy(() => import('./pages/noteDetail/NoteDetail'));
  const NoteEdit = lazy(() => import('./pages/noteEdit/NoteEdit'));
  const NoteCombine = lazy(() => import('./pages/noteCombine/NoteCombine'));
  const Forum = lazy(() => import('./pages/forum/Forum'));
  const ForumMake = lazy(() => import('./pages/forumMake/ForumMake'));
  const ChatLayout = lazy(() => import('./layout/chatLayout/layout/ChatLayout'));
  const ForumChat = lazy(() => import('./pages/forumChat/ForumChat'));
  const MyPage = lazy(() => import('./pages/myPage/MyPage'));
  const MyProfile = lazy(() => import('./pages/myProfile/MyProfile'));
  const MyProfileEdit = lazy(() => import('./pages/myProfileEdit/MyProfileEdit'));
  const ServiceInfo = lazy(() => import('./pages/serviceInfo/ServiceInfo'));
  const Exp = lazy(() => import('./pages/exp/Exp'));
  const Calendar = lazy(() => import('./pages/calendar/Calendar'));
  const ErrorPage = lazy(() => import('./pages/errorPage/ErrorPage'));

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <InterceptorWrapper /> 
          <Routes>
            <Route path='/kakao/bovo-auth' element={<KakaoCallback />} />
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
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
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