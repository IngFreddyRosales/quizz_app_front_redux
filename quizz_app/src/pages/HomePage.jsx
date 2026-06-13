import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/thunks/categoriesThunks';
import '../styles/HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const dispatch = useDispatch();
    const { list, status, error } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    if (status === 'loading') {
        return <div className="home-loading">Cargando categorías...</div>;
    }

    if (status === 'failed') {
        return <div className="home-error">{error}</div>;
    }

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>¿Qué quieres practicar hoy?</h1>
                <p>Elige una categoría para comenzar</p>
            </header>

            <div className="categories-grid">
                {list.map((category) => (
                    <div
                        key={category.id}
                        className="category-card"
                    >
                        <Link to={`/quiz/${category.id}`}>
                            <h2>{category.name}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;