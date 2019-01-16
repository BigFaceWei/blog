package com.wxy.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.mysql.jdbc.StringUtils;
import com.opensymphony.xwork2.ActionContext;
import com.wxy.model.BlogUser;
import com.wxy.model.BlogUserExample;
import com.wxy.service.UserService;
import net.sf.json.JSONObject;

import javax.servlet.http.HttpSession;

public class UserAction extends BaseAction {

    private static final long serialVersionUID = 2L;

    private UserService userService;
    private String result;

    private BlogUser user = new BlogUser();

    private Integer blogUserId = -1;

    private String userAccount;

    private String userPassword;

    private String userIsAdmin;

    private Integer pageNum = 1;
    private Integer maxPage = -1;
    private static Integer pageSize = 10;

    private List<String> pages = new ArrayList<String>();
    private String page = "1";

    public String findAll() {
        try {
            List<BlogUser> users = userService.findAll();
            if (users != null) {
                goIndex();
                result = "true";
            } else {
                result = "false";
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return SUCCESS;
    }

    public String search() {
        BlogUserExample userExample = new BlogUserExample();
        if (!StringUtils.isNullOrEmpty(userAccount)){
            userExample.createCriteria().andUserAccountLike("%"+ userAccount.trim() + "%");
        }

        List<BlogUser> users = userService.search(userExample, (pageNum - 1)*10);
        Long size = userService.getRecords(new BlogUserExample());
        ActionContext ac = ActionContext.getContext();
        ac.put("users", users);

        maxPage = (int)((size - 1) / pageSize ) + 1;
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
        }
        return "index";
    }

    public String edit() {
        if(blogUserId != -1){
            user = userService.findById(blogUserId);
            return "edit";
        }
        return ERROR;
    }


    public String upd() {
        if(userService.modifyUser(user)){
            goIndex();
            return "index";
        }
        return ERROR;
    }

    public String del() {
        if(blogUserId != -1 && userService.deleteById(blogUserId)){
            goIndex();
            return "index";
        }
        return ERROR;
    }

    private void goIndex(){
        ActionContext ac = ActionContext.getContext();
        List<BlogUser> users = userService.findAll();
        ac.put("users", users);

        Long size = userService.getRecords(new BlogUserExample());
        maxPage = (int)((size - 1) / pageSize ) + 1;
        ac.put("maxPage", maxPage);
    }

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

    public List<String> getPages() {
        return pages;
    }

    public void setPages(List<String> pages) {
        this.pages = pages;
    }

    public String getPage() {
        return page;
    }

    public void setPage(String page) {
        this.page = page;
    }
}
