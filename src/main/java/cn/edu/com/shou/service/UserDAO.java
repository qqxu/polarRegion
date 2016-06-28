package cn.edu.com.shou.service;

import cn.edu.com.shou.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by ubuntu on 2015/11/1 0001.
 */
@Repository
public class UserDAO implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;
    public User save(User user){
        return this.userRepository.save(user);
    }
    public User findById(Long userId)
    {
        return this.userRepository.findOne(userId);
    }

    public User findByUserName(String userName)
    {
        return userRepository.findByUserName(userName);
    }

    public List<User> findAll(){
        return this.userRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);
        return  user;
    }
}
