package bol.projekt.bol;

import bol.projekt.bol.model.User;

import bol.projekt.bol.repository.UserRepository;
import bol.projekt.bol.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

	@Mock
	private UserRepository userRepository;

	@InjectMocks
	private UserService userService;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void testCreateUser() {
		String name = "John";
		int age = 30;
		User user = new User(name, age);

		when(userRepository.save(user)).thenReturn(user);

		String createdUserName = userService.createUser(name, age);

		assertEquals(name, createdUserName);
		verify(userRepository, times(1)).save(user);
	}

	@Test
	void testGetAllUsers() {
		User user1 = new User("John", 30);
		User user2 = new User("Alice", 25);
		List<User> userList = Arrays.asList(user1, user2);

		when(userRepository.findAll()).thenReturn(userList);

		List<User> retrievedUserList = userService.getAllUsers();

		assertEquals(userList.size(), retrievedUserList.size());
		assertTrue(retrievedUserList.containsAll(userList));
		verify(userRepository, times(1)).findAll();
	}

	@Test
	void testDeleteUser() {
		String id = "123";
		User user = new User("John", 30);
		user.setId(id);

		when(userRepository.findUserById(id)).thenReturn(user);

		userService.deleteUser(id);

		verify(userRepository, times(1)).delete(user);
	}

	@Test
	void testUpdateUser() {
		String id = "123";
		String newName = "John";
		int age = 35;
		User user = new User("Alice", 25);
		user.setId(id);

		when(userRepository.findUserById(id)).thenReturn(user);

		User updatedUser = userService.updateUser(id, newName, age);

		assertEquals(newName, updatedUser.getName());
		assertEquals(age, updatedUser.getAge());
		verify(userRepository, times(1)).save(user);
	}

	@Test
	void testUpdateUserWithInvalidAge() {
		String id = "123";
		String newName = "John";
		int age = -1;
		User user = new User("Alice", 25);
		user.setId(id);

		when(userRepository.findUserById(id)).thenReturn(user);

		assertThrows(RuntimeException.class, () -> userService.updateUser(id, newName, age));
		verify(userRepository, never()).save(user);
	}
}
