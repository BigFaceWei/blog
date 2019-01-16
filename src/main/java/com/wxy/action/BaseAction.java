package com.wxy.action;

import java.io.IOException;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;
import com.alibaba.fastjson.JSON;
import com.wxy.util.BeanUtil;
import com.wxy.util.WebUtil;
import com.opensymphony.xwork2.ActionSupport;

public class BaseAction extends ActionSupport  {
	
    protected HttpServletRequest request = ServletActionContext.getRequest();

    protected HttpServletResponse response = ServletActionContext.getResponse();

	private static final long serialVersionUID = 3012485993546819990L;

	public void writeJson(Object object) {
		try {
			String json = JSON.toJSONStringWithDateFormat(object, "yyyy-MM-dd HH:mm:ss");
			ServletActionContext.getResponse().setContentType("text/html;charset=utf-8");
			ServletActionContext.getResponse().getWriter().write(json);
			ServletActionContext.getResponse().getWriter().flush();
			ServletActionContext.getResponse().getWriter().close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@SuppressWarnings("rawtypes")
	protected Map getParams() {
        return WebUtil.getParameterMap(request);
    }
	
	protected void getParams(Object bean) {
        BeanUtil.copyProperties(bean, getParams());
    }
}
