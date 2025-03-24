<%@ page import="java.util.*"%>
<%@ page import="com.mytechnopal.*"%>
<%@ page import="com.mytechnopal.dto.*"%>
<%@ page import="com.mytechnopal.util.*"%>
<%@ page import="com.mytechnopal.base.*"%>
<%@ page import="com.mytechnopal.banner.*"%>
<%
SessionInfo sessionInfo = (SessionInfo) session.getAttribute(SessionInfo.SESSION_INFO);
List<DTOBase> bannerList = (ArrayList<DTOBase>)session.getAttribute(BannerDTO.SESSION_BANNER_LIST);
%>
<div dir="ltr">
	<div id="rev_slider_12_1" data-version="5.4.8.1">
		<ul>
		<%
		for(DTOBase obj: bannerList) {
			BannerDTO banner = (BannerDTO)obj;
		%>
			<li >
	        	<img src="/static/<%=sessionInfo.getSettings().getCode().toUpperCase()%>/media/banner/<%=banner.getFilename()%>">
	      	</li> 	
		<%	
		}
		%>
		</ul>
	</div>
</div>

<section class="bg-grey py-7">
 	<div class="container">
   		<div class="row align-items-center">
   			<div class="col-lg-12 text-center">
     			<h1 class="text-uppercase font-weight-bold"><%=sessionInfo.getSettings().getName()%></h1>
   			</div>
   		</div>
 	</div>
</section>