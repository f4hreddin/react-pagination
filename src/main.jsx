import './index.css';
import ReactDOM from 'react-dom/client';
import Main from './pages/Main';
import Room from './pages/Room';
import PaginationRouter from './context/Pagination';

ReactDOM.createRoot(document.getElementById('root')).render(
    <PaginationRouter routes={[
        { path: 'main', component: Main },
        { path: 'room/:id', component: Room },
    ]} />
);