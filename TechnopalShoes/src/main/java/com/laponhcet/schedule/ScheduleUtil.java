package com.laponhcet.schedule;

import java.io.Serializable;
import java.util.List;

import com.laponhcet.academicprogram.AcademicProgramDTO;
import com.mytechnopal.SessionInfo;
import com.mytechnopal.base.DTOBase;
import com.mytechnopal.util.StringUtil;
import com.mytechnopal.webcontrol.SelectWebControl;

public class ScheduleUtil implements Serializable {

	private static final long serialVersionUID = 1L;

	public static String getDataEntryStr(SessionInfo sessionInfo, ScheduleDTO schedule, List<DTOBase> academicYearList, List<DTOBase> semesterList, List<DTOBase> academicSectionList, List<DTOBase> scheduleList) {
		StringBuffer strBuff = new StringBuffer();
		strBuff.append("<div class='row'>");
		strBuff.append(new SelectWebControl().getSelectWebControl("col-lg-4", true, "Section", "AcademicSection", academicSectionList, schedule.getAcademicSection(), "-Select-", "0", "onchange='selectAcademicSection()'"));
		
		if(!StringUtil.isEmpty(schedule.getAcademicSection().getCode())) {
			if(schedule.getAcademicSection().getAcademicProgram().getPeriodType().equalsIgnoreCase(AcademicProgramDTO.PERIOD_TYPE_ACADEMICYEAR)) {
				strBuff.append(new SelectWebControl().getSelectWebControl("col-lg-4", true, "Academic year", "AcademicYear", academicYearList, schedule.getSemester().getAcademicYear(), "-Select-", "0", ""));
			}
			else if(schedule.getAcademicSection().getAcademicProgram().getPeriodType().equalsIgnoreCase(AcademicProgramDTO.PERIOD_TYPE_SEMESTER)) {
				strBuff.append(new SelectWebControl().getSelectWebControl("col-lg-4", true, "Semester", "Semester", semesterList, schedule.getSemester(), "-Select-", "0", ""));
			}
			strBuff.append("<div class='col-lg-4'><br><button type='button' class='btn btn-primary btn-sm mb-2' onclick='viewSchedule()'>View</button></div>");
			if(scheduleList.size()>=1) {
				strBuff.append("<div class='pt-5 mb-5'>");
				strBuff.append("	<div class='row'>");
				for(DTOBase scheduleObj: scheduleList) {
					ScheduleDTO sched = (ScheduleDTO) scheduleObj;
					strBuff.append("	<div class='py-2 col-lg-4'>");
					strBuff.append("		<div class='card border text-center'>");
					strBuff.append("			<div class='card-header'>");
					strBuff.append(					sched.getSubject().getCode());
					strBuff.append("			</div>");
					strBuff.append("    		<div class='card-body'>");
					strBuff.append("      			<a href='#' onclick=\"viewTeacher('" + sched.getSubject().getCode() + "')\"><img height='40px' width='30px' src='/static/common/images/teacher.png'></a>");
					strBuff.append("				&nbsp; " + getTeacher(sched) + "");
					strBuff.append("      		</div>");
					strBuff.append("     		<div class='card-footer text-muted'>");
					strBuff.append(      			sched.getSubject().getDescription());
					strBuff.append("      		</div>");
					strBuff.append("		</div>");
					strBuff.append("	</div>");

				}
				strBuff.append("	</div>");
				strBuff.append("</div>");
			}
		}
		strBuff.append("</div>");
		return strBuff.toString();
	}
	
	public static ScheduleDTO getScheduleBySubjectCode(List<DTOBase> scheduleList, String subjectCode) {
		for(DTOBase scheduleObj: scheduleList) {
			ScheduleDTO sched = (ScheduleDTO) scheduleObj;
			if(sched.getSubject().getCode().equalsIgnoreCase(subjectCode)) {
				return sched;
			}
		}
		return null;
	}
	
	public static String getTeacher(ScheduleDTO schedule) {
		String str = "";
		for(DTOBase scheduleDetailsObj: schedule.getScheduleDetailsList()) {
			ScheduleDetailsDTO scheduleDetails = (ScheduleDetailsDTO) scheduleDetailsObj;
			if(!StringUtil.isEmpty(str)) {
				str += "<br>";
			}
			str += "<small>" + scheduleDetails.getTeacher().getDisplayStr() + "&nbsp;<i onclick=\"deleteScheduleDetails('" + schedule.getCode() + "', " + scheduleDetails.getId() + ")\" class='fas fa-trash-alt' style='font-size: 1rem; cursor: pointer;'></i></small>";
		}
		return str;
	}
}
