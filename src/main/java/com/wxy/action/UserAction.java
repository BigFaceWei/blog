package com.wxy.action;

import java.util.List;

import com.wxy.model.BlogUser;
import com.mysql.jdbc.StringUtils;
import com.wxy.service.UserService;
import com.wxy.model.BlogUserExample;
import com.opensymphony.xwork2.ActionContext;
import org.apache.struts2.json.annotations.JSON;

import javax.servlet.http.HttpSession;

public class UserAction extends BaseAction {
    private static final long serialVersionUID = 1L;

    private UserService userService;
    private String result;
    private Integer blogUserId = -1;
    private String userAccount;
    private String userPassword;
    private String userIsAdmin;
    private BlogUser user = new BlogUser();
    private Integer pageNum = 1;
    private Integer maxPage = 1;
    private static Integer pageSize = 10;

    public String login() {
        return "login";
    }

    public String exist() {
        HttpSession session = request.getSession();
        session.removeAttribute("uid");
        result = "true";
        return SUCCESS;
    }

    public String loginCheck() {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        BlogUserExample user = new BlogUserExample();
        user.createCriteria().andUserAccountEqualTo(username).andUserPasswordEqualTo(password).andBlogUserIdIsNotNull();

        try {
            BlogUser retUser = userService.checkUser(user);

            if (retUser != null) {
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
            maxPage = (int) ((size - 1) / pageSize) + 1;

            ac.put("maxPage", maxPage);
            ac.put("users", users);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "index";
    }

    public String search() {
        BlogUserExample userExample = new BlogUserExample();
        if (!StringUtils.isNullOrEmpty(userAccount)) {
            userExample.createCriteria().andUserAccountLike("%" + userAccount.trim() + "%");
        }

        List<BlogUser> users = userService.search(userExample, (pageNum - 1) * 10);
        Long size = userService.getRecords(new BlogUserExample());
        ActionContext ac = ActionContext.getContext();
        ac.put("users", users);

        maxPage = (int) ((size - 1) / pageSize) + 1;
        ac.put("maxPage", maxPage);
        return "index";
    }

    public String goAdd() {
        HttpSession session = request.getSession();
        Object object = session.getAttribute("uid");

        if (object != null) {
            blogUserId = Integer.valueOf(object.toString());
        }

        ActionContext ac = ActionContext.getContext();
        ac.put("blogUserId", blogUserId);

        return "goAdd";
    }

    public String add() {
        if (userService.addUser(user)) {
            goIndex();
            return "index";
        }
        return "login";
    }

    public String edit() {
        if (blogUserId != -1) {
            user = userService.findById(blogUserId);
            return "edit";
        }
        return ERROR;
    }


    public String upd() {
        if (userService.modifyUser(user)) {
            goIndex();
            return "index";
        }
        return ERROR;
    }

    public String del() {
        if (blogUserId != -1 && userService.deleteById(blogUserId)) {
            goIndex();
            return "index";
        }
        return ERROR;
    }

    private void goIndex() {
        ActionContext ac = ActionContext.getContext();
        List<BlogUser> users = userService.findAll();
        ac.put("users", users);

        Long size = userService.getRecords(new BlogUserExample());
        maxPage = (int) ((size - 1) / pageSize) + 1;
        ac.put("maxPage", maxPage);
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
        UserAction.pageSize = pageSize;
    }

    public Integer getBlogUserId() {
        return blogUserId;
    }

    public void setBlogUserId(Integer blogUserId) {
        this.blogUserId = blogUserId;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserIsAdmin() {
        return userIsAdmin;
    }

    public void setUserIsAdmin(String userIsAdmin) {
        this.userIsAdmin = userIsAdmin;
    }
}
