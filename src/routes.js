import HomeBase from './pages/home/Base';
import PostsPage from './pages/posts/PostsPage';
import Sentiment from './pages/sentiment/Sentiment';
import UserPage from './pages/user-page/UserPage';


export default [
  { name: 'home', path: '/', component: HomeBase },
  { name: 'posts', path: '/posts', component: PostsPage },
  { name: 'sentiment', path: '/sentiment', component: Sentiment },
  { name: 'userPage', path: '/user-page', component: UserPage },
];
