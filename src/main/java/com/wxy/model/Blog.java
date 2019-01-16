package com.wxy.model;

public class Blog {
    private Integer blogId;

    private String blogImgs;

    private String blogTitle;

    private String blogTime;

    private String blogKindBig;

    private String blogKindLabel;

    private String blogContent;

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
        this.blogImgs = blogImgs == null ? null : blogImgs.trim();
    }

    public String getBlogTitle() {
        return blogTitle;
    }

    public void setBlogTitle(String blogTitle) {
        this.blogTitle = blogTitle == null ? null : blogTitle.trim();
    }

    public String getBlogTime() {
        return blogTime;
    }

    public void setBlogTime(String blogTime) {
        this.blogTime = blogTime == null ? null : blogTime.trim();
    }

    public String getBlogKindBig() {
        return blogKindBig;
    }

    public void setBlogKindBig(String blogKindBig) {
        this.blogKindBig = blogKindBig == null ? null : blogKindBig.trim();
    }

    public String getBlogKindLabel() {
        return blogKindLabel;
    }

    public void setBlogKindLabel(String blogKindLabel) {
        this.blogKindLabel = blogKindLabel == null ? null : blogKindLabel.trim();
    }

    public String getBlogContent() {
        return blogContent;
    }

    public void setBlogContent(String blogContent) {
        this.blogContent = blogContent == null ? null : blogContent.trim();
    }
}