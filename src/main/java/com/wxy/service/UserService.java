package com.wxy.service;

import com.wxy.model.BlogUser;
import com.wxy.model.BlogUserExample;

import java.util.List;

public interface UserService {
   
    BlogUser findById(int id);

    List<BlogUser> findAll();

    List<BlogUser> search(BlogUserExample example, Integer pageFlag);

    boolean deleteById(int id);

    boolean addUser(BlogUser user);

    BlogUser checkUser(BlogUserExample user);

    Long getRecords(BlogUserExample user);

    //根据用户id修改用户信息
    boolean modifyUser(BlogUser user);
  
}
