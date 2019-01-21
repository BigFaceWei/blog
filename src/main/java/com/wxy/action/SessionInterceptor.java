package com.wxy.action;

import java.util.Map;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

public class SessionInterceptor implements Interceptor{

	private static final long serialVersionUID = 1L;
	private String exclude;
	
	public void destroy() {}
	public void init() {}

	public String intercept(ActionInvocation arg0) throws Exception {
		
		String actionName = arg0.getProxy().getActionName();
		if (exclude.contains(actionName)) {
			return arg0.invoke();
		}
		ActionContext ac = arg0.getInvocationContext();
		Map<String, Object> session = ac.getSession();

		if (session.get("uid")!= null) {
			return arg0.invoke();
		} else {
			return "error";
		}
	}

	public String getExclude() {
		return exclude;
	}

	public void setExclude(String exclude) {
		this.exclude = exclude;
	}

}
