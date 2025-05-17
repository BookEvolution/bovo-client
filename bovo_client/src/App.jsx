import PropTypes from 'prop-types';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import LoginLayout from './layout/loginLayout/LoginLayout'
import Login from './pages/login/Login'
import SignUpLayout from './layout/signUpLayout/SignUpLayout'
import SignUp from './pages/signUp/SignUp'
import KakaoSignUp from './pages/kakaosignUp/KakaoSignUp'
import Layout from './layout/basicLayout/Layout'
import Main from './pages/main/Main'
import BookSearch from './pages/bookSearch/BookSearch'
import Archive from './pages/archive/Archive'
import KakaoCallback from './pages/login/KakaoCallback'
import { lazy, Suspense, useEffect, useState } from 'react'
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
          <Routes>
            <Route path='/kakao/bovo-auth' element={<KakaoCallback />} />
            <Route path='/' element={<LoginLayout />}>
              <Route index element={<Login />}/>
            </Route>
            <Route path='/sign-up' element={<SignUpLayout />}>
              <Route path='/sign-up/basic' element={<SignUp />} />
              <Route path='/sign-up/kakao' element={<KakaoSignUp />} />
            </Route>
            <Route path='/main' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Main />} />
              <Route path='/main/search' element={<BookSearch />} />
              <Route path='/main/search/search-detail' element={<BookSearchDetail />} />
              <Route path='/main/archive' element={<Archive />} />
              <Route path='/main/archive/:book_id' element={<Note />} />
              <Route path='/main/archive/:book_id/memo' element={<NoteDetail />} />
              <Route path='/main/archive/edit/:book_id' element={<NoteEdit />} />
              <Route path='/main/archive/edit/:book_id/:memo_id' element={<NoteEdit />} />
              <Route path='/main/archive/:book_id/memos' element={<NoteCombine />} />
              <Route path='/main/forum' element={<Forum />} />
              <Route path='/main/forum/forum-make' element={<ForumMake />} />
              <Route path='/main/mypage' element={<MyPage />} />
              <Route path='/main/mypage/myprofile' element={<MyProfile />} />
              <Route path='/main/mypage/service-info' element={<ServiceInfo />} />
              <Route path='/main/mypage/exp' element={<Exp />} />
              <Route path='/main/mypage/myprofile/edit' element={<MyProfileEdit />} />
              <Route path='/main/calendar' element={<Calendar />} />
              <Route path='/main/404' element={<ErrorPage />} />
            </Route>
            <Route path='/auth/kakao/callback' element={<KakaoCallback />} />
            <Route path='/forum/:roomId' element={<ProtectedRoute><ChatLayout /></ProtectedRoute>}>
              <Route index element={<ForumChat />} />
            </Route>
            <Route path='/*' element={<Navigate to={"/404"} />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

// 보호된 라우트 컴포넌트 (기존 코드와 동일)
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    setIsAuthenticated(!!token);

    if (!token) {
      navigate('/'); // 기본 로그인 페이지로 이동
    } else {
      enableInterceptor(() => {
        navigate("/"); // 토큰 만료 시 로그인 페이지로 이동
      });
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return <LoadingSpinner />; // 초기 인증 상태 확인 중 로딩 표시
  }

  return isAuthenticated ? children : null;
};

// prop types 정의
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // children은 React 노드이며 필수
};

export default App;