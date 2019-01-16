package com.wxy.action;

import java.util.List;
import javax.servlet.http.HttpSession;

import com.mysql.jdbc.StringUtils;
import com.opensymphony.xwork2.ActionContext;
import com.wxy.model.BlogUser;
import com.wxy.model.BlogUserExample;
import com.wxy.service.UserService;
import org.apache.struts2.json.annotations.JSON;
import org.apache.struts2.util.Counter;

public class LoginAction extends BaseAction {

    private static final long serialVersionUID = 1L;

    private UserService userService;
    private String result;
    private BlogUser user = new BlogUser();
    private Integer pageNum = 1;
    private Integer maxPage = -1;
    private static Integer pageSize = 10;

    /**
     * @return
     */
    public String login() {
        return "login";
    }

    /**
     * @return
     */
    public String exist() {
        HttpSession session = request.getSession();
        session.removeAttribute("uid");
        result = "true";
        return SUCCESS;
    }

    /**
     * @return
     */
    public String loginCheck() {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        BlogUserExample user = new BlogUserExample();
        user.createCriteria().andUserAccountEqualTo(username).andUserPasswordEqualTo(password).andBlogUserIdIsNotNull();

        try {
            BlogUser retUser = userService.checkUser(user);

            if (retUser != null ) {
                HttpSession session = request.getSession();
                session.setAttribute("uid", retUser.getBlogUserId());
                session.setAttribute("username", retUser.getUserAccount());
                result = "true";
            } else {
                result = "false";
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return SUCCESS;
    }

    public String index() {
        try {
            HttpSession session = request.getSession();
            String userId = session.getAttribute("uid").toString();
            if (StringUtils.isNullOrEmpty(userId)) return "login";

            BlogUser user = userService.findById(Integer.parseInt(userId));
            request.setAttribute("user", user);
            ActionContext ac = ActionContext.getContext();
            List<BlogUser> users = userService.findAll();

            Long size = userService.getRecords(new BlogUserExample());
            maxPage = (int)((size - 1) / pageSize ) + 1;

            ac.put("maxPage", maxPage);
            ac.put("users", users);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "index";
    }

    @JSON(serialize = false)
    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public BlogUser getUser() {
        return user;
    }

    public void setUser(BlogUser user) {
        this.user = user;
    }

    public Integer getPageNum() {
        return pageNum;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    public Integer getMaxPage() {
        return maxPage;
    }

    public void setMaxPage(Integer maxPage) {
        this.maxPage = maxPage;
    }

    public static Integer getPageSize() {
        return pageSize;
    }

    public static void setPageSize(Integer pageSize) {
        LoginAction.pageSize = pageSize;
    }
}
