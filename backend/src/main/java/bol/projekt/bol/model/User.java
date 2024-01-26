package bol.projekt.bol.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Data
@Document(value = "user")
public class User {

    @Id
    private String id;
    private String name;
    private Integer age;

    public User(String name, int age){
        this.name = name;
        this.age = age;
    }
}
