package com.wxy.service.impl;

import com.wxy.mapper.BlogUserMapper;
import com.wxy.model.BlogUser;
import com.wxy.model.BlogUserExample;
import com.wxy.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private BlogUserMapper userMapper;

    @Override
    public BlogUser findById(int id) {
        return userMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<BlogUser> findAll() {
        BlogUserExample example = new BlogUserExample();
        return userMapper.selectByExample(example, 0);
    }

    public List<BlogUser> search(BlogUserExample example, Integer pageFlag){
        return userMapper.selectByExample(example, pageFlag);
    }

    @Override
    public boolean deleteById(int id) {
        boolean flag = false;
        try {
            userMapper.deleteByPrimaryKey(id);
            flag = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flag;
    }

    @Override
    public boolean addUser(BlogUser user) {
        boolean flag = false;
        try {
            userMapper.insert(user);
            flag = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flag;
    }

    public BlogUser checkUser(BlogUserExample user) {
        try {
            List<BlogUser> users = userMapper.selectByExample(user, null);
            if (users != null && users.size() > 0) {
                return users.get(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public Long getRecords(BlogUserExample user){
        return userMapper.countByExample(user);
    }

    @Override
    public boolean modifyUser(BlogUser user) {
        userMapper.updateByPrimaryKeySelective(user);
        return true;
    }

}
