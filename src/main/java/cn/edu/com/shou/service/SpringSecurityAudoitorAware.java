package cn.edu.com.shou.service;

import cn.edu.com.shou.domain.User;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * Created by ubuntu on 2015/11/1 0001.
 */
@Component
public class SpringSecurityAudoitorAware implements AuditorAware<User>{
    @Override
    public User getCurrentAuditor() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object temp = ((auth != null) ? auth.getPrincipal() :  null);
        if (temp!=null && temp.getClass()==User.class )
        {
            return (User) temp;
        }else
            return null;
    }
}
