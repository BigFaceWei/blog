package com.wxy.mapper;

import com.wxy.model.BlogUser;
import com.wxy.model.BlogUserExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BlogUserMapper {
    long countByExample(BlogUserExample example);

    int deleteByExample(BlogUserExample example);

    int deleteByPrimaryKey(Integer blogUserId);

    int insert(BlogUser record);

    int insertSelective(BlogUser record);

    BlogUser findByAccountPwd(BlogUser record);

    List<BlogUser> selectByExample(@Param("example") BlogUserExample example, @Param("pageFlag") Integer pageFlag );

    BlogUser selectByPrimaryKey(Integer blogUserId);

    int updateByExampleSelective(@Param("record") BlogUser record, @Param("example") BlogUserExample example);

    int updateByExample(@Param("record") BlogUser record, @Param("example") BlogUserExample example);

    int updateByPrimaryKeySelective(BlogUser record);

    int updateByPrimaryKey(BlogUser record);


}