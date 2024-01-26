package bol.projekt.bol.service;

import bol.projekt.bol.model.User;
import bol.projekt.bol.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepostiory;

    public String createUser(String name,int age) {
        User user = new User(name, age);

        userRepostiory.save(user);

        return name;
    }
    public List<User> getAllUsers(){
        return userRepostiory.findAll();
    }

    public void deleteUser(String id){
       User user = userRepostiory.findUserById(id);

       userRepostiory.delete(user);
    }

    public User updateUser(String id, String newName, int age) {
        User user = userRepostiory.findUserById(id);

        if(!newName.isEmpty()) {
         user.setName(newName);
        }
        if(age > -1) {
            user.setAge(age);
        }
        else{
            throw new RuntimeException("zly wiek xd");
        }

        userRepostiory.save(user);
        return user;
    }
}
