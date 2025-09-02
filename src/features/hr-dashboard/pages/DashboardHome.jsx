import React from "react";
import SkillsCard from "../components/SkillsCard";
import RatingCard from "../components/RatingCard";
import AttendanceStats from "../components/AttendanceStats";
import WorkHoursChart from "../components/WorkHoursChart";
import WorkHoursSummary from "../components/WorkHoursSummary";
import TasksHighlight from "../components/TasksHighlight";

export default function DashboardHome() {
  return (
    <div className="min-h-screen flex flex-col p-4 gap-4">
      {/* الصف الأول */}
      <div className="grid grid-cols-12 gap-4 h-full">
        {/* attendance */}
        <div className="col-span-12 lg:col-span-6 bg-[#F6F6F6] rounded-xl p-4 shadow h-full flex flex-col overflow-hidden">
          <h2 className="text-right text-lg font-bold text-[#1B1C1C] mb-2">
            معدل الحضور
          </h2>
          <div className="flex-1 flex justify-center items-center">
            <AttendanceStats />
          </div>
        </div>

        {/* Rating */}
        <div className="col-span-12 lg:col-span-3 h-full flex flex-col">
          <RatingCard className="h-full" />
        </div>

        {/* Skills */}
        <div className="col-span-12 lg:col-span-3 h-full flex flex-col">
          <SkillsCard className="h-full" />
        </div>
      </div>

      {/* الصف التاني */}
      <div className="grid grid-cols-12 gap-4 h-full">
        {/* Tasks Highlight */}
        <div className="col-span-12 lg:col-span-3 h-full flex flex-col">
          <TasksHighlight className="h-full" />
        </div>

        {/* Work Hours Summary */}
        <div className="col-span-12 lg:col-span-3 h-full flex flex-col">
          <WorkHoursSummary className="h-full" />
        </div>

        {/* Work Hours */}
        <div className="col-span-12 lg:col-span-6 h-full flex flex-col">
          <WorkHoursChart className="h-full" />
        </div>
      </div>
    </div>
  );
}
