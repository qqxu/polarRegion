package cn.edu.com.shou;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by ubuntu on 2015/11/2 0002.
 */
public class LoginFilter implements Filter {
    public void doFilter(ServletRequest req,ServletResponse res,FilterChain chain)throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        HttpServletRequest request = (HttpServletRequest) req;
        HttpSession session = request.getSession(true);
        if(session.getAttribute("user")==null)
        {
           response.sendRedirect("/login.html");
        }
        chain.doFilter(req, res);
    }
    public void init(FilterConfig filterConfig) {
    }
    public void destroy() {
    }
}
