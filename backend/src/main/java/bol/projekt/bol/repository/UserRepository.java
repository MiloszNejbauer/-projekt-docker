package bol.projekt.bol.repository;

import bol.projekt.bol.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    public User findUserById(String id);
}
