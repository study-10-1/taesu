import "../css/create.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apiClient";

let CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            const res = await api.post('/posts', { title, content });
            navigate(`/post/${res.data.id}`);
        } catch (e) {
            setError('등록 실패');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={"create-post-container"}>
            <h1 className={"create-post-title"}>게시글 작성</h1>
            {error && <div>{error}</div>}
            <form className={"create-post-form"} onSubmit={handleSubmit}>
                <div className={"form-group"}>
                    <label htmlFor={"title"}>제목</label>
                    <input id={"title"} type={"text"} placeholder={"제목을 입력하시오"} value={title} onChange={(e)=>setTitle(e.target.value)} />
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"content"}>내용</label>
                    <textarea id={"content"} placeholder={"내용을 입력하시오"} value={content} onChange={(e)=>setContent(e.target.value)} />
                </div>
                <button type={"submit"} className={"submit-button"} disabled={loading}>{loading ? '등록 중...' : '등록'}</button>
            </form>
        </div>
    )
}

export default CreatePost