<%@ page import="java.util.*"%>
<%@ page import="com.mytechnopal.*"%>
<%@ page import="com.mytechnopal.base.WebControlBase"%>
<%@ page import="com.mytechnopal.base.DTOBase"%>
<%@ page import="com.mytechnopal.dto.*"%>
<%@ page import="com.mytechnopal.*"%>
<%@ page import="com.mytechnopal.util.*"%>
<%@ page import="com.mytechnopal.dao.*"%>
<%@ page import="com.mytechnopal.webcontrol.*" %>
<%@ page import="com.mytechnopal.link.*" %>
<%@ page import="com.laponhcet.enrollment.*" %>
<%@ page import="com.laponhcet.schedule.*" %>
<%@ page import="com.laponhcet.teacher.*" %>

<%
SessionInfo sessionInfo = (SessionInfo) session.getAttribute(SessionInfo.SESSION_INFO);
List<DTOBase> teacherList = (ArrayList<DTOBase>)session.getAttribute(TeacherDTO.SESSION_TEACHER_LIST);
%>

<div class="container" id='divSchedule'></div>


<div class="modal fade" id="divTeacher" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-xl">
    	<div class="modal-content">
      		<div class="modal-header">
        		<h5 class="modal-title" id="exampleModalLabel">Select a Teacher</h5>
        		<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      		</div>
      		<div class="modal-body">
      			<div class="row">
        	<%
        	for(DTOBase teacherObj: teacherList) {
        		TeacherDTO teacher = (TeacherDTO)teacherObj;
        	%>
        			<div class="col-lg-4 btn btn-outline-primary mb-2" role="button" tabindex="0" onclick="selectTeacher('<%=teacher.getCode()%>')">
        				<%=teacher.getDisplayStr()%>
        			</div>
        			
        	<%	
        	}
        	%>
        		</div>
      		</div>
      		<div class="modal-footer">
        		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      		</div>
    	</div>
  	</div>
</div>


<script>
	setTimeout(function (){
		getSchedule();
	}, 100); 
	
	function getSchedule() {
		$.ajax({
			url: 'AjaxController?txtSelectedLink=<%=sessionInfo.getCurrentLink().getCode()%>&txtAction=<%=DataTable.ACTION_UPDATE_VIEW%>',
			type: 'POST',
		  	dataType: 'JSON',
		  	success: function(response) { 
		  		$("#divSchedule").html(response.<%=LinkDTO.PAGE_CONTENT%>);
			}
		});	
	}
	
	function selectAcademicSection() {
		$.ajax({
			url: 'AjaxController?txtSelectedLink=<%=sessionInfo.getCurrentLink().getCode()%>',
			data: {			
				txtAction: 'SELECT_ACADEMIC_SECTION',
				cboAcademicSection: $('#cboAcademicSection').val()
			},
			type: 'POST',
		  	dataType: 'JSON',
		  	success: function(response) { 
		  		$("#divSchedule").html(response.<%=LinkDTO.PAGE_CONTENT%>);
			}
		});	
	}
	
	function viewSchedule() {
		$.ajax({
			url: 'AjaxController?txtSelectedLink=<%=sessionInfo.getCurrentLink().getCode()%>',
			data: {			
				txtAction: 'VIEW_SCHEDULE',
				cboAcademicYear: $('#cboAcademicYear').val(),
				cboSemester: $('#cboSemester').val()
			},
			type: 'POST',
		  	dataType: 'JSON',
		  	success: function(response) { 
		  		$("#divSchedule").html(response.<%=LinkDTO.PAGE_CONTENT%>);
			}
		});	
	}
	
	function viewTeacher(subjectCode) {
		$("#txtSelectedRecord").val(subjectCode);
		new bootstrap.Modal(document.getElementById('divTeacher'), { keyboard: false}).show();
		
	}
	
	function selectTeacher(teacherCode) {
		$.ajax({
			url: 'AjaxController?txtSelectedLink=<%=sessionInfo.getCurrentLink().getCode()%>',
			data: {			
				txtAction: 'SELECT_TEACHER',
				txtSubjectCode: $("#txtSelectedRecord").val(),
				txtTeacherCode: teacherCode
			},
			type: 'POST',
		  	dataType: 'JSON',
		  	success: function(response) { 
		  		$("#divSchedule").html(response.<%=LinkDTO.PAGE_CONTENT%>);
				bootstrap.Modal.getInstance(document.getElementById('divTeacher')).hide();
			}
		});	
	}
	
	function deleteScheduleDetails(scheduleCode, scheduleDetailsId) {
		$.ajax({
			url: 'AjaxController?txtSelectedLink=<%=sessionInfo.getCurrentLink().getCode()%>',
			data: {			
				txtAction: 'DELETE_SCHEDULE_DETAILS',
				txtScheduleCode: scheduleCode,
				txtScheduleDetailsId: scheduleDetailsId
			},
			type: 'POST',
		  	dataType: 'JSON',
		  	success: function(response) { 
		  		$("#divSchedule").html(response.<%=LinkDTO.PAGE_CONTENT%>);
			}
		});	
	}

</script>