package com.laponhcet.guest;

import com.mytechnopal.banner.BannerDAO;
import com.mytechnopal.banner.BannerDTO;
import com.mytechnopal.base.ActionBase;

public class HomeAction extends ActionBase {
	private static final long serialVersionUID = 1L;

	protected void setSessionVars() {		
		//setSessionAttribute(NewsDTO.SESSION_NEWS_LIST, new NewsDAO().getNewsList());
		setSessionAttribute(BannerDTO.SESSION_BANNER_LIST, new BannerDAO().getBannerList());
	}
}
