package com.wxy.service;

import com.wxy.model.Blog;
import com.wxy.model.BlogExample;

import java.util.List;

public interface BlogService {
    Blog findById(int id);

    List<Blog> findAll();

    List<Blog> search(BlogExample example, Integer pageFlag);

    boolean deleteById(int id);

    boolean addUser(Blog user);

    Blog checkBlog(BlogExample user);

    Long getRecords(BlogExample user);

    //根据用户id修改用户信息
    boolean modifyUser(Blog user);
}
