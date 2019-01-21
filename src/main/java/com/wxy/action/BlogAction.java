package com.wxy.action;

import com.mysql.jdbc.StringUtils;
import com.opensymphony.xwork2.ActionContext;
import com.wxy.model.Blog;
import com.wxy.model.BlogExample;
import com.wxy.service.BlogService;
import org.apache.struts2.json.annotations.JSON;

import javax.servlet.http.HttpSession;
import java.util.List;

public class BlogAction extends BaseAction {
    private static final long serialVersionUID = 2L;

    private BlogService blogService;
    private String result;

    private Blog blog = new Blog();
    private Integer pageNum = 1;
    private Integer maxPage = 1;
    private Integer blogId;

    private String userId;
    private String blogImgs;
    private String blogTitle;
    private String blogTime;
    private String blogKindBig;
    private String blogKindLabel;
    private String blogContent;
    private static Integer pageSize = 10;

    public String index() {
        try {
            HttpSession session = request.getSession();
            String userId = session.getAttribute("uid").toString();
            if (StringUtils.isNullOrEmpty(userId)) return "login";

            Blog blog = blogService.findById(Integer.parseInt(userId));
            request.setAttribute("blog", blog);
            ActionContext ac = ActionContext.getContext();
            List<Blog> blogs = blogService.findAll();

            Long size = blogService.getRecords(new BlogExample());
            maxPage = (int) ((size - 1) / pageSize) + 1;

            ac.put("maxPage", maxPage);
            ac.put("blogs", blogs);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "index";
    }

//    public String search() {
//        BlogExample userExample = new BlogExample();
//        if (!StringUtils.isNullOrEmpty(userAccount)) {
//            userExample.createCriteria().andUserAccountLike("%" + userAccount.trim() + "%");
//        }
//
//        List<BlogUser> users = userService.search(userExample, (pageNum - 1) * 10);
//        Long size = userService.getRecords(new BlogExample());
//        ActionContext ac = ActionContext.getContext();
//        ac.put("users", users);
//
//        maxPage = (int) ((size - 1) / pageSize) + 1;
//        ac.put("maxPage", maxPage);
//        return "index";
//    }

    public String goAdd() {
        HttpSession session = request.getSession();
        Object object = session.getAttribute("uid");
        if (object == null) {
            return "login";
        }
        ActionContext ac = ActionContext.getContext();
        ac.put("userId", object.toString());

        return "goAdd";
    }

    public String add() {
        if (blogService.addBlog(blog)) {
            goIndex();
            return "index";
        }
        return "login";
    }

//    public String edit() {
//        if (blogUserId != -1) {
//            blog = userService.findById(blogUserId);
//            return "edit";
//        }
//        return ERROR;
//    }


//    public String upd() {
//        if (userService.modifyUser(blog)) {
//            goIndex();
//            return "index";
//        }
//        return ERROR;
//    }

//    public String del() {
//        if (blogUserId != -1 && userService.deleteById(blogUserId)) {
//            goIndex();
//            return "index";
//        }
//        return ERROR;
//    }

    private void goIndex() {
        ActionContext ac = ActionContext.getContext();
        List<Blog> blogs = blogService.findAll();
        ac.put("blogs", blogs);

        Long size = blogService.getRecords(new BlogExample());
        maxPage = (int) ((size - 1) / pageSize) + 1;
        ac.put("maxPage", maxPage);
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    @JSON(serialize = false)
    public BlogService getBlogService() {
        return blogService;
    }

    public void setBlogService(BlogService blogService) {
        this.blogService = blogService;
    }

    public Blog getBlog() {
        return blog;
    }

    public void setBlog(Blog blog) {
        this.blog = blog;
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

    public Integer getBlogId() {
        return blogId;
    }

    public void setBlogId(Integer blogId) {
        this.blogId = blogId;
    }

    public String getBlogImgs() {
        return blogImgs;
    }

    public void setBlogImgs(String blogImgs) {
        this.blogImgs = blogImgs;
    }

    public String getBlogTitle() {
        return blogTitle;
    }

    public void setBlogTitle(String blogTitle) {
        this.blogTitle = blogTitle;
    }

    public String getBlogTime() {
        return blogTime;
    }

    public void setBlogTime(String blogTime) {
        this.blogTime = blogTime;
    }

    public String getBlogKindBig() {
        return blogKindBig;
    }

    public void setBlogKindBig(String blogKindBig) {
        this.blogKindBig = blogKindBig;
    }

    public String getBlogKindLabel() {
        return blogKindLabel;
    }

    public void setBlogKindLabel(String blogKindLabel) {
        this.blogKindLabel = blogKindLabel;
    }

    public String getBlogContent() {
        return blogContent;
    }

    public void setBlogContent(String blogContent) {
        this.blogContent = blogContent;
    }

    public static Integer getPageSize() {
        return pageSize;
    }

    public static void setPageSize(Integer pageSize) {
        BlogAction.pageSize = pageSize;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
