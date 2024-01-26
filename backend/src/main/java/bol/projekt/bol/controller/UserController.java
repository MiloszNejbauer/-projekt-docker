package bol.projekt.bol.controller;

import bol.projekt.bol.model.User;
import bol.projekt.bol.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @PostMapping()
    public String createUser(@RequestParam String name, int age){
        return userService.createUser(name, age);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAll(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping
    public String deleteUser(@RequestParam String id){
        userService.deleteUser(id);
        return "User deleted";
    }

    @PatchMapping
    public User updateUser(@RequestParam String id, @RequestParam String newName, @RequestParam int age){
        return userService.updateUser(id, newName, age);
    }
}
