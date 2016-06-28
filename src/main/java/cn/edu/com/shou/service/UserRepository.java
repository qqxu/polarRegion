package cn.edu.com.shou.service;

import cn.edu.com.shou.domain.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by ubuntu on 2015/11/1 0001.
 */
public interface UserRepository extends PagingAndSortingRepository<User,Long> {
    public List<User>findAll();
    @Query(value = "select t.userName from User t where t.userName IS NOT null")
    public List<User> getUsernames();

    public User findByUserName(String username);

    public User findByUserNameAndPassword(String username,String password);

    //根据用户名获取用户
    @Query(value = "select u from User u where u.userName=:userName")
    public User getUserInfoByUserName(@Param("userName")String userName);
}
