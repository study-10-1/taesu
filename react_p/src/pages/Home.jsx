import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './../css/Home.css';
import api from '../apiClient';

function Home() {

    const postsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchPosts = async (page) => {
        try {
            setLoading(true);
            setError('');
            const res = await api.get('/posts', { params: { page: page - 1, size: postsPerPage } });
            setPosts(res.data.content || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (e) {
            setError('목록을 불러오지 못했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="home-container">
            <h1 className="home-title">게시글 목록</h1>
            {loading && <div>로딩 중...</div>}
            {error && <div>{error}</div>}
            {!loading && !error && (
                <div className="posts-list">
                    {posts.map(post => (
                        <div key={post.id} className="post-card">
                            <h2 className="post-title">
                                <Link to={`/post/${post.id}`}>{post.title}</Link>
                            </h2>
                            <p className="post-content">{post.content}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* 페이지 번호 네비게이션 */}
            <div className="pagination">
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        className={`page-btn ${number === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(number)}
                    >
                        {number}
                    </button>
                ))}
            </div>

            <Link to="/create" className="create-link">게시글 작성하기</Link>
        </div>
    );
}

export default Home;
