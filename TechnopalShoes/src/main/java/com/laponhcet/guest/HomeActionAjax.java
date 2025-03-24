package com.laponhcet.guest;

import org.json.JSONObject;

import com.mytechnopal.ActionResponse;
import com.mytechnopal.base.ActionAjaxBase;
import com.mytechnopal.dao.UserDAO;
import com.mytechnopal.dto.UserDTO;
import com.mytechnopal.link.LinkDTO;
import com.mytechnopal.linkuser.LinkUserDAO;
import com.mytechnopal.linkuser.LinkUserUtil;
import com.mytechnopal.usercontact.UserContactDAO;
import com.mytechnopal.usermedia.UserMediaDAO;
import com.mytechnopal.util.DTOUtil;
import com.mytechnopal.util.StringUtil;

public class HomeActionAjax extends ActionAjaxBase {
	private static final long serialVersionUID = 1L;

	protected void customAction(JSONObject jsonObj, String action) {
		//System.out.println("inside HomeActionAjax action: " + action);
		if(action.equalsIgnoreCase(UserDTO.ACTION_LOGIN)) {
			UserDTO user = new UserDTO();
			String userName = getRequestString("txtUserName");
			String password = getRequestString("txtPassword");
			
			if(StringUtil.isEmpty(userName)) {
				actionResponse.constructMessage(ActionResponse.TYPE_EMPTY, new String[]{"User Name"});
			}
			else if(StringUtil.isEmpty(password)) {
				actionResponse.constructMessage(ActionResponse.TYPE_EMPTY, new String[]{"Password"});
			}
			else {
				UserDAO userDAO = new UserDAO();
				user = userDAO.getUserByUserNamePassword(userName, password);
				if(user == null) {
					actionResponse.constructMessage(ActionResponse.TYPE_FAIL, new String[]{"Wrong Combination of user name and password."});
				}
				else {
					if(user.isActive()) {
						LinkDTO link = (LinkDTO) DTOUtil.getObjByCode(sessionInfo.getLinkList(), LinkDTO.USER_HOME);
						user.setUserMediaList(new UserMediaDAO().getUserMediaListByUserCode(user.getCode()));
						user.setUserContactList(new UserContactDAO().getUserContactListByUserCode(user.getCode()));
						resetSessionInfo(link, user, link);		
						user.setLinkUserList(new LinkUserDAO().getLinkUserListByUserCode(user.getCode()));
						LinkUserUtil.setLinkUserList(user.getLinkUserList(), sessionInfo.getLinkList());
						//user.setAddedTimestamp(DateTimeUtil.getCurrentTimestamp());
//						try {
//							user.setSourceDeviceInfo(InetAddress.getLocalHost().toString());
//						} catch (UnknownHostException e) {
//							// TODO Auto-generated catch block
//							e.printStackTrace();
//						}
						//new UserLogDAO().executeAdd(user);
						
						
						//new HomeAction().executeAction(request, response, sessionInfo);
						
//						setSessionAttribute(AdmissionApplicationDTO.SESSION_ADMISSION_APPLICATION_LIST, jsonObj);
//						
//						try {
//							jsonObj.put(LinkDTO.PAGE_CONTENT, HomeUtil.getHomeStr(sessionInfo));
//						} catch (JSONException e) {
//							// TODO Auto-generated catch block
//							e.printStackTrace();
//						}
					}
					else {
						actionResponse.constructMessage(ActionResponse.TYPE_FAIL, new String[]{"Your profile is already inactive.  Please contact the administrator"});
					}
				}
			}
		}
	}
}