import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/detail.css"
import { useEffect, useState } from "react";
import api from "../apiClient";
let PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await api.get(`/posts/${id}`);
                setPost(res.data);
            } catch (e) {
                setError("게시글을 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    const handleDelete = async () => {
        try {
            await api.delete(`/posts/${id}`);
            navigate("/");
        } catch (e) {
            alert("삭제 실패");
        }
    };

    return (
        <div className="post-detail-container">
            {loading && <div>로딩 중...</div>}
            {error && <div>{error}</div>}
            {post && (
                <>
                    <h1 className="post-detail-title">{post.title}</h1>
                    <p className="post-detail-content">{post.content}</p>
                </>
            )}
            <div className="button-group">
                <Link to={`/post/edit/${id}`} className="edit-button">
                    수정하기
                </Link>
                <button onClick={handleDelete} className="delete-button">
                    삭제하기
                </button>
            </div>
        </div>
    );
};

export default PostDetail;
