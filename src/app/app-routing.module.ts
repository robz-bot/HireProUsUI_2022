import { ResourceManagementReportComponent } from './Pages/reports/resource-management-report/resource-management-report.component';
import { ForgetPasswordComponent } from './Pages/forget-password/forget-password.component';
import { CloneCandidateComponent } from './Pages/recruitment/candidate-details/clone-candidate/clone-candidate.component';
import { MyJobRequestsComponent } from './Pages/dashboard/my-job-requests/my-job-requests.component';
import { MyInterviewsListComponent } from './Pages/dashboard/my-interviews-list/my-interviews-list.component';
import { ServiceMenusComponent } from './Pages/service-menus/service-menus.component';
import { AddBenchCandidateComponent } from './Pages/recruitment/job-request/add-bench-candidate/add-bench-candidate.component';
import { AddBenchCandidateListComponent } from './Pages/recruitment/job-request/add-bench-candidate-list/add-bench-candidate-list.component';
import { EmployeeDetailsComponent } from './Pages/masters/employee-details/employee-details.component';
import { ScheduleInterviewComponent } from './Pages/recruitment/schedule-interview/schedule-interview.component';
import { RecruitmentMenusComponent } from './Pages/recruitment/recruitment-menus/recruitment-menus.component';
import { HireprosFeedbackComponent } from './Pages/hirepros-feedback/hirepros-feedback.component';
import { ReportCommingSoonComponent } from './Pages/reports/report-comming-soon/report-comming-soon.component';
import { CusRecroleMappingComponent } from './Pages/masters/cus-recrole-mapping/cus-recrole-mapping.component';
import { ErrorPageComponent } from './Pages/error-page/error-page.component';
import { EmailConfigurationComponent } from './Pages/masters/email-configuration/email-configuration.component';
import { AddJobRequestComponent } from './Pages/recruitment/job-request/add-job-request/add-job-request.component';
import { ViewCandidateComponent } from './Pages/recruitment/candidate-details/view-candidate/view-candidate.component';
import { UpdateCandidateComponent } from './Pages/recruitment/candidate-details/update-candidate/update-candidate.component';
import { UpdateJobRequestComponent } from './Pages/recruitment/job-request/update-job-request/update-job-request.component';
import { RoleMenuMappingComponent } from './Pages/masters/role-menu-mapping/role-menu-mapping.component';
import { MenusComponent } from './Pages/masters/menus/menus.component';
import { HrRoundComponent } from './Pages/recruitment/interview-schedule/hr-round/hr-round.component';
import { InternalRound1Component } from './Pages/recruitment/interview-schedule/internal-round1/internal-round1.component';
import { AddCandidateComponent } from './Pages/recruitment/candidate-details/add-candidate/add-candidate.component';
import { ViewJobRequestComponent } from './Pages/recruitment/job-request/view-job-request/view-job-request.component';
import { ResumeShortlistComponent } from './Pages/recruitment/resume-shortlist/resume-shortlist.component';
import { UpdateInterviewPanelComponent } from './Pages/masters/interview-panel/update-interview-panel/update-interview-panel.component';
import { ChangePassComponent } from './Pages/User/change-pass/change-pass.component';
import { LoginComponent } from './Pages/login/login.component';
import { OnBoardDetComponent } from './Pages/recruitment/on-board-det/on-board-det.component';
import { JobRequestComponent } from './Pages/recruitment/job-request/job-request.component';
import { CandidateDetailsComponent } from './Pages/recruitment/candidate-details/candidate-details.component';
import { UserRegComponent } from './Pages/user-reg/user-reg.component';
import { ProjectsComponent } from './Pages/masters/projects/projects.component';
import { BuComponent } from './Pages/masters/bu/bu.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { HomeComponent } from './Pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HireproRolesComponent } from './Pages/masters/hirepro-roles/hirepro-roles.component';
import { CustomersComponent } from './Pages/masters/customers/customers.component';
import { RecRolesComponent } from './Pages/masters/rec-roles/rec-roles.component';
import { BuHeadApprovalComponent } from './Pages/recruitment/bu-head-approval/bu-head-approval.component';
import { ProfileComponent } from './Pages/User/profile/profile.component';
import { UpdateUserRegComponent } from './Pages/user-reg/update-user-reg/update-user-reg.component';
import { InterviewPanelComponent } from './Pages/masters/interview-panel/interview-panel.component';
import { InternalRound2Component } from './Pages/recruitment/interview-schedule/internal-round2/internal-round2.component';
import { CustomerRoundComponent } from './Pages/recruitment/interview-schedule/customer-round/customer-round.component';
import { CandidateHistoryComponent } from './Pages/recruitment/bu-head-approval/candidate-history/candidate-history.component';
import { JobReqStatusReportComponent } from './Pages/reports/job-req-status-report/job-req-status-report.component';
import { NotshortlistedCandidateReportComponent } from './Pages/reports/notshortlisted-candidate-report/notshortlisted-candidate-report.component';
import { RequirementProgressReportComponent } from './Pages/reports/requirement-progress-report/requirement-progress-report.component';
import { ShortlistedCandidateReportComponent } from './Pages/reports/shortlisted-candidate-report/shortlisted-candidate-report.component';
import { SelectReportComponent } from './Pages/reports/select-report/select-report.component';
import { InterviewScheduleSummaryReportComponent } from './Pages/reports/interview-schedule-summary-report/interview-schedule-summary-report.component';
import { MasterMenusComponent } from './Pages/masters/master-menus/master-menus.component';
import { JobRequestCloneComponent } from './Pages/recruitment/job-request/job-request-clone/job-request-clone.component';
import { VendorManagementComponent } from './Pages/services/vendor-management/vendor-management.component';
import { UpdateVendorComponent } from './Pages/services/vendor-management/update-vendor/update-vendor.component';
import { VendorLoginComponent } from './Pages/Vendor-stuffs/vendor-login/vendor-login.component';
import { VendorDashboardComponent } from './Pages/Vendor-stuffs/vendor-dashboard/vendor-dashboard.component';
import { VendorJobrequestsComponent } from './Pages/Vendor-stuffs/vendor-jobrequests/vendor-jobrequests.component';
import { VendorForgetPasswordComponent } from './Pages/Vendor-stuffs/vendor-forget-password/vendor-forget-password.component';
import { VendorChangePasswordComponent } from './Pages/Vendor-stuffs/vendor-change-password/vendor-change-password.component';
import { CustomerReportComponent } from './Pages/reports/customer-report/customer-report.component';
import { BuReportComponent } from './Pages/reports/bu-report/bu-report.component';
import { RecRoleReportComponent } from './Pages/reports/rec-role-report/rec-role-report.component';
import { EmailConfigReportComponent } from './Pages/reports/email-config-report/email-config-report.component';
import { VendorReportComponent } from './Pages/reports/vendor-report/vendor-report.component';
import { CandidateReportComponent } from './Pages/reports/candidate-report/candidate-report.component';
import { LeveluploginComponent } from './Pages/leveluplogin/leveluplogin.component';
import { RatingdashboardComponent } from './Pages/leveluplogin/ratingdashboard/ratingdashboard.component';
import { ReviewlistComponent } from './Pages/leveluplogin/reviewlist/reviewlist.component';
import { EntryLoginComponent } from 'src/app/Pages/ResourseEntry/entry-login/entry-login.component';
import { EntryListComponent } from './Pages/ResourseEntry/entry-list/entry-list.component';
import { AddEntryComponent } from './Pages/ResourseEntry/add-entry/add-entry.component';
import { UpdateEntryComponent } from './Pages/ResourseEntry/update-entry/update-entry.component';
import { LevelupupdateEntryComponent } from './Pages/leveluplogin/levelupupdate-entry/levelupupdate-entry.component';
import { AddCandidateAiComponent } from './Pages/recruitment/job-request/add-candidate-ai/add-candidate-ai.component';

const routes: Routes = [
  {
    path: 'hirepros',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'vendor-dashboard',
        component: VendorDashboardComponent,
      },
      {
        path: 'my-job-requests/:userId',
        component: MyJobRequestsComponent,
      },
      {
        path: 'my-interviews',
        component: MyInterviewsListComponent,
      },
      {
        path: 'master-menus',
        component: MasterMenusComponent,
      },
      {
        path: 'hirepros-roles',
        component: HireproRolesComponent,
      },
      {
        path: 'bu',
        component: BuComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'email-config',
        component: EmailConfigurationComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'rec-roles',
        component: RecRolesComponent,
      },
      {
        path: 'cus-rec-role-mapping',
        component: CusRecroleMappingComponent,
      },
      {
        path: 'menus',
        component: MenusComponent,
      },
      {
        path: 'role-menu-mapping',
        component: RoleMenuMappingComponent,
      },
      {
        path: 'user-reg',
        component: UserRegComponent,
      },
      {
        path: 'recruitment-menus',
        component: RecruitmentMenusComponent,
      },
      {
        path: 'interviewer-panel',
        component: InterviewPanelComponent,
      },
      {
        path: 'bu-head-approval',
        component: BuHeadApprovalComponent,
      },
      {
        path: 'candidate-history/:jr/:id',
        component: CandidateHistoryComponent,
      },
      {
        path: 'candidate-details',
        component: CandidateDetailsComponent,
      },
      {
        path: 'add-candidate/:id/:type',
        component: AddCandidateComponent,
      },
      {
        path: 'add-candidate-ai/:id',
        component: AddCandidateAiComponent,
      },
      {
        path: 'update-candidate/:id',
        component: UpdateCandidateComponent,
      },
      {
        path: 'view-candidate/:id',
        component: ViewCandidateComponent,
      },
      {
        path: 'clone-candidate/:id',
        component: CloneCandidateComponent,
      },
      {
        path: 'resume-shortlist',
        component: ResumeShortlistComponent,
      },
      {
        path: 'schedule-interview',
        component: ScheduleInterviewComponent,
      },

      {
        path: 'internal-round1',
        component: InternalRound1Component,
      },
      {
        path: 'internal-round2',
        component: InternalRound2Component,
      },
      {
        path: 'customer-round',
        component: CustomerRoundComponent,
      },
      {
        path: 'hr-round',
        component: HrRoundComponent,
      },
      {
        path: 'job-request',
        component: JobRequestComponent,
      },
      {
        path: 'vendor-job-request',
        component: VendorJobrequestsComponent,
      },
      {
        path: 'clone-job-request/:id',
        component: JobRequestCloneComponent,
      },
      {
        path: 'add-job-request',
        component: AddJobRequestComponent,
      },
      {
        path: 'update-job-request/:id',
        component: UpdateJobRequestComponent,
      },
      {
        path: 'view-job-request/:id',
        component: ViewJobRequestComponent,
      },
      {
        path: 'on-board-det',
        component: OnBoardDetComponent,
      },
      {
        path: 'employee-details',
        component: EmployeeDetailsComponent,
      },
      {
        path: 'bench-details/:id',
        component: AddBenchCandidateListComponent,
      },
      {
        path: 'add-bench-candidate/:id/:resourceId',
        component: AddBenchCandidateComponent,
      },
      {
        path: 'user-profile',
        component: ProfileComponent,
      },
      {
        path: 'update-user-reg/:id',
        component: UpdateUserRegComponent,
      },
      {
        path: 'update-interview-panel/:id',
        component: UpdateInterviewPanelComponent,
      },
      {
        path: 'change-password',
        component: ChangePassComponent,
      },
      {
        path: 'vendor-change-password',
        component: VendorChangePasswordComponent,
      },
      {
        path: 'job-request-report',
        component: JobReqStatusReportComponent,
      },
      {
        path: 'rejected-candidate-report',
        component: NotshortlistedCandidateReportComponent,
      },
      {
        path: 'shortlisted-candidate-report',
        component: ShortlistedCandidateReportComponent,
      },
      {
        path: 'select-report',
        component: SelectReportComponent,
      },
      {
        path: 'interview-schedule-summary-report',
        component: InterviewScheduleSummaryReportComponent,
      },
      {
        path: 'resource-management-report',
        component: ResourceManagementReportComponent,
      },
      {
        path: 'customer-report',
        component: CustomerReportComponent,
      },
      {
        path: 'bu-report',
        component: BuReportComponent,
      },
      {
        path: 'rec-role-report',
        component: RecRoleReportComponent,
      },
      {
        path: 'email-conf-report',
        component: EmailConfigReportComponent,
      },
      {
        path: 'vendor-report',
        component: VendorReportComponent,
      },
      {
        path: 'candidate-report',
        component: CandidateReportComponent,
      },
      {
        path: 'report-comming-soon',
        component: ReportCommingSoonComponent,
      },
      {
        path: 'requirement-progress-report/:id',
        component: RequirementProgressReportComponent,
      },
      {
        path: 'hirepros-feedback',
        component: HireprosFeedbackComponent,
      },
      {
        path: 'services-menu',
        component: ServiceMenusComponent,
      },
      {
        path: 'vendor-management',
        component: VendorManagementComponent,
      },
      {
        path: 'update-vendor/:id',
        component: UpdateVendorComponent,
      },
    ],
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'vendorLogin',
    component: VendorLoginComponent,
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'vendor-forget-password',
    component: VendorForgetPasswordComponent,
  },
  {
    path: 'levelupgrade-login',
    component: LeveluploginComponent,
  },
  {
    path: 'ratingdashboard',
    component: RatingdashboardComponent,
  },
  {
    path: 'reviewlist',
    component: ReviewlistComponent,
  },

  {
    path: 'add-entry',
    component: AddEntryComponent,
  },

  {
    path: 'entry-list',
    component: EntryListComponent,
  },

  {
    path: 'entryLogin',
    component: EntryLoginComponent,
  },

  {
    path: 'update-entry/:id',
    component: UpdateEntryComponent,
  },
  {
    path: 'levelupupdate-entry/:id',
    component: LevelupupdateEntryComponent,
  },

  {
    path: '**',
    component: ErrorPageComponent, pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
