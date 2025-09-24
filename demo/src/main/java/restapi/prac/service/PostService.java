package restapi.prac.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

import restapi.prac.model.Post;
import restapi.prac.repository.PostRepository;

@Service
@Transactional
public class PostService {

    private final PostRepository repo;

    public PostService(PostRepository repo) {
        this.repo = repo;
    }

    public Page<Post> getPosts(Pageable pageable) {
        return repo.findAll(pageable);
    }

    public Optional<Post> getPost(Long id) {
        return repo.findById(id);
    }

    public Post createPost(Post p) {
        p.setId(null);
        return repo.save(p);
    }

    public Optional<Post> updatePost(Long id, Post updated) {
        return repo.findById(id).map(p -> {
            p.setTitle(updated.getTitle());
            p.setContent(updated.getContent());
            return repo.save(p);
        });
    }

    public void deletePost(Long id) {
        repo.deleteById(id);
    }
}
