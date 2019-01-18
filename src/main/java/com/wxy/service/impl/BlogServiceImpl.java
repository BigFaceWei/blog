package com.wxy.service.impl;

import com.wxy.mapper.BlogMapper;
import com.wxy.model.Blog;
import com.wxy.model.BlogExample;
import com.wxy.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("blogService")
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogMapper blogMapper;

    @Override
    public Blog findById(int id) {
        return blogMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<Blog> findAll() {
        BlogExample example = new BlogExample();
        return blogMapper.selectByExample(example, 0);
    }

    public List<Blog> search(BlogExample example, Integer pageFlag){
        return blogMapper.selectByExample(example, pageFlag);
    }

    @Override
    public boolean deleteById(int id) {
        boolean flag = false;
        try {
            blogMapper.deleteByPrimaryKey(id);
            flag = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flag;
    }

    @Override
    public boolean addUser(Blog blog) {
        boolean flag = false;
        try {
            blogMapper.insert(blog);
            flag = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flag;
    }

    public Blog checkBlog(BlogExample blog) {
        try {
            List<Blog> users = blogMapper.selectByExample(blog, null);
            if (users != null && users.size() > 0) {
                return users.get(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public Long getRecords(BlogExample blog){
        return blogMapper.countByExample(blog);
    }

    @Override
    public boolean modifyUser(Blog blog) {
        blogMapper.updateByPrimaryKeySelective(blog);
        return true;
    }

}
