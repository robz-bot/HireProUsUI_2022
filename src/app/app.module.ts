import { MyInterviewsListComponent } from './Pages/dashboard/my-interviews-list/my-interviews-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { LeftSidebarComponent } from './Components/left-sidebar/left-sidebar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Pages/home/home.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { HireproRolesComponent } from './Pages/masters/hirepro-roles/hirepro-roles.component';
import { CustomersComponent } from './Pages/masters/customers/customers.component';
import { BuComponent } from './Pages/masters/bu/bu.component';
import { ProjectsComponent } from './Pages/masters/projects/projects.component';
import { RecRolesComponent } from './Pages/masters/rec-roles/rec-roles.component';
import { UserRegComponent } from './Pages/user-reg/user-reg.component';
import { JobRequestComponent } from './Pages/recruitment/job-request/job-request.component';
import { CandidateDetailsComponent } from './Pages/recruitment/candidate-details/candidate-details.component';
import { BuHeadApprovalComponent } from './Pages/recruitment/bu-head-approval/bu-head-approval.component';
import { OnBoardDetComponent } from './Pages/recruitment/on-board-det/on-board-det.component';
import { LoginComponent } from './Pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './Pages/User/profile/profile.component';
import { UpdateUserRegComponent } from './Pages/user-reg/update-user-reg/update-user-reg.component';
import { ChangePassComponent } from './Pages/User/change-pass/change-pass.component';
import { InterviewPanelComponent } from './Pages/masters/interview-panel/interview-panel.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { UpdateInterviewPanelComponent } from './Pages/masters/interview-panel/update-interview-panel/update-interview-panel.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { ResumeShortlistComponent } from './Pages/recruitment/resume-shortlist/resume-shortlist.component';
import { ViewJobRequestComponent } from './Pages/recruitment/job-request/view-job-request/view-job-request.component';
import { AddCandidateComponent } from './Pages/recruitment/candidate-details/add-candidate/add-candidate.component';
import { InternalRound1Component } from './Pages/recruitment/interview-schedule/internal-round1/internal-round1.component';
import { InternalRound2Component } from './Pages/recruitment/interview-schedule/internal-round2/internal-round2.component';
import { CustomerRoundComponent } from './Pages/recruitment/interview-schedule/customer-round/customer-round.component';
import { HrRoundComponent } from './Pages/recruitment/interview-schedule/hr-round/hr-round.component';
import { MenusComponent } from './Pages/masters/menus/menus.component';
import { RoleMenuMappingComponent } from './Pages/masters/role-menu-mapping/role-menu-mapping.component';
import { UpdateJobRequestComponent } from './Pages/recruitment/job-request/update-job-request/update-job-request.component';
import { UpdateCandidateComponent } from './Pages/recruitment/candidate-details/update-candidate/update-candidate.component';
import { ViewCandidateComponent } from './Pages/recruitment/candidate-details/view-candidate/view-candidate.component';
import { CandidateHistoryComponent } from './Pages/recruitment/bu-head-approval/candidate-history/candidate-history.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { AddJobRequestComponent } from './Pages/recruitment/job-request/add-job-request/add-job-request.component';
import { NgOrderByPipeModule } from 'angular-pipes';
import { EmailConfigurationComponent } from './Pages/masters/email-configuration/email-configuration.component';
import { JobReqStatusReportComponent } from './Pages/reports/job-req-status-report/job-req-status-report.component';
import { ErrorPageComponent } from './Pages/error-page/error-page.component';
import { CusRecroleMappingComponent } from './Pages/masters/cus-recrole-mapping/cus-recrole-mapping.component';
import { NotshortlistedCandidateReportComponent } from './Pages/reports/notshortlisted-candidate-report/notshortlisted-candidate-report.component';
import { RequirementProgressReportComponent } from './Pages/reports/requirement-progress-report/requirement-progress-report.component';
import { ShortlistedCandidateReportComponent } from './Pages/reports/shortlisted-candidate-report/shortlisted-candidate-report.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { InterviewScheduleSummaryReportComponent } from './Pages/reports/interview-schedule-summary-report/interview-schedule-summary-report.component';
import { SelectReportComponent } from './Pages/reports/select-report/select-report.component';
import { RecruitmentMenusComponent } from './Pages/recruitment/recruitment-menus/recruitment-menus.component';
import { ReportCommingSoonComponent } from './Pages/reports/report-comming-soon/report-comming-soon.component';
import { HireprosFeedbackComponent } from './Pages/hirepros-feedback/hirepros-feedback.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MasterMenusComponent } from './Pages/masters/master-menus/master-menus.component';
import { ScheduleInterviewComponent } from './Pages/recruitment/schedule-interview/schedule-interview.component';
import { PassedCandidatesListComponent } from './Pages/recruitment/candidate-details/passed-candidates-list/passed-candidates-list.component';
import { HoldedCandidatesListComponent } from './Pages/recruitment/candidate-details/holded-candidates-list/holded-candidates-list.component';
import { RejectedCandidatesListComponent } from './Pages/recruitment/candidate-details/rejected-candidates-list/rejected-candidates-list.component';
import { SelectedCandidatesListComponent } from './Pages/recruitment/candidate-details/selected-candidates-list/selected-candidates-list.component';
import { OnboardedCandidatesListComponent } from './Pages/recruitment/candidate-details/onboarded-candidates-list/onboarded-candidates-list.component';
import { UploadCandidatesListComponent } from './Pages/recruitment/candidate-details/upload-candidates-list/upload-candidates-list.component';
import { EmployeeDetailsComponent } from './Pages/masters/employee-details/employee-details.component';
import { AddBenchCandidateListComponent } from './Pages/recruitment/job-request/add-bench-candidate-list/add-bench-candidate-list.component';
import { AddBenchCandidateComponent } from './Pages/recruitment/job-request/add-bench-candidate/add-bench-candidate.component';
import { DroppedCandidatesListComponent } from './Pages/recruitment/candidate-details/dropped-candidates-list/dropped-candidates-list.component';
import { ServiceMenusComponent } from './Pages/service-menus/service-menus.component';
import { MyJobRequestsComponent } from './Pages/dashboard/my-job-requests/my-job-requests.component';
import { JobRequestCloneComponent } from './Pages/recruitment/job-request/job-request-clone/job-request-clone.component';
import { CloneCandidateComponent } from './Pages/recruitment/candidate-details/clone-candidate/clone-candidate.component';
import { ForgetPasswordComponent } from './Pages/forget-password/forget-password.component';
import { ResourceManagementReportComponent } from './Pages/reports/resource-management-report/resource-management-report.component';
import { VendorManagementComponent } from './Pages/services/vendor-management/vendor-management.component';
import { UpdateVendorComponent } from './Pages/services/vendor-management/update-vendor/update-vendor.component';
import { VendorLoginComponent } from './Pages/Vendor-stuffs/vendor-login/vendor-login.component';
import { VendorDashboardComponent } from './Pages/Vendor-stuffs/vendor-dashboard/vendor-dashboard.component';
import { VendorJobrequestsComponent } from './Pages/Vendor-stuffs/vendor-jobrequests/vendor-jobrequests.component';
import { VendorForgetPasswordComponent } from './Pages/Vendor-stuffs/vendor-forget-password/vendor-forget-password.component';
import { VendorChangePasswordComponent } from './Pages/Vendor-stuffs/vendor-change-password/vendor-change-password.component';
import { CustomerReportComponent } from './Pages/reports/customer-report/customer-report.component';
import { RecRoleReportComponent } from './Pages/reports/rec-role-report/rec-role-report.component';
import { EmailConfigReportComponent } from './Pages/reports/email-config-report/email-config-report.component';
import { BuReportComponent } from './Pages/reports/bu-report/bu-report.component';
import { VendorReportComponent } from './Pages/reports/vendor-report/vendor-report.component';
import { CandidateReportComponent } from './Pages/reports/candidate-report/candidate-report.component';
import { LeveluploginComponent } from './Pages/leveluplogin/leveluplogin.component';
import { RatingdashboardComponent } from './Pages/leveluplogin/ratingdashboard/ratingdashboard.component';
import { EntryLoginComponent } from './Pages/ResourseEntry/entry-login/entry-login.component';
import { AddEntryComponent } from './Pages/ResourseEntry/add-entry/add-entry.component';
import { EntryListComponent } from './Pages/ResourseEntry/entry-list/entry-list.component';
import { ReviewlistComponent } from './Pages/leveluplogin/reviewlist/reviewlist.component';
import { UpdateEntryComponent } from './Pages/ResourseEntry/update-entry/update-entry.component';
import { LevelupupdateEntryComponent } from './Pages/leveluplogin/levelupupdate-entry/levelupupdate-entry.component';
import { AddCandidateAiComponent } from './Pages/recruitment/job-request/add-candidate-ai/add-candidate-ai.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftSidebarComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    HireproRolesComponent,
    CustomersComponent,
    BuComponent,
    ProjectsComponent,
    RecRolesComponent,
    UserRegComponent,
    InterviewPanelComponent,
    JobRequestComponent,
    CandidateDetailsComponent,
    BuHeadApprovalComponent,
    OnBoardDetComponent,
    LoginComponent,
    ProfileComponent,
    UpdateUserRegComponent,
    ChangePassComponent,
    UpdateInterviewPanelComponent,
    ResumeShortlistComponent,
    ViewJobRequestComponent,
    AddCandidateComponent,
    InternalRound1Component,
    InternalRound2Component,
    CustomerRoundComponent,
    HrRoundComponent,
    MenusComponent,
    RoleMenuMappingComponent,
    UpdateJobRequestComponent,
    UpdateCandidateComponent,
    ViewCandidateComponent,
    CandidateHistoryComponent,
    AddJobRequestComponent,
    EmailConfigurationComponent,
    JobRequestComponent,
    JobReqStatusReportComponent,
    ErrorPageComponent,
    CusRecroleMappingComponent,
    NotshortlistedCandidateReportComponent,
    RequirementProgressReportComponent,
    ShortlistedCandidateReportComponent,
    InterviewScheduleSummaryReportComponent,
    SelectReportComponent,
    RecruitmentMenusComponent,
    ReportCommingSoonComponent,
    HireprosFeedbackComponent,
    MasterMenusComponent,
    ScheduleInterviewComponent,
    PassedCandidatesListComponent,
    HoldedCandidatesListComponent,
    RejectedCandidatesListComponent,
    SelectedCandidatesListComponent,
    OnboardedCandidatesListComponent,
    UploadCandidatesListComponent,
    EmployeeDetailsComponent,
    AddBenchCandidateListComponent,
    AddBenchCandidateComponent,
    DroppedCandidatesListComponent,
    ServiceMenusComponent,
    MyInterviewsListComponent,
    MyJobRequestsComponent,
    JobRequestCloneComponent,
    CloneCandidateComponent,
    ForgetPasswordComponent,
    ResourceManagementReportComponent,
    VendorManagementComponent,
    UpdateVendorComponent,
    VendorLoginComponent,
    VendorDashboardComponent,
    VendorJobrequestsComponent,
    VendorForgetPasswordComponent,
    VendorChangePasswordComponent,
    CustomerReportComponent,
    RecRoleReportComponent,
    EmailConfigReportComponent,
    BuReportComponent,
    VendorReportComponent,
    CandidateReportComponent,
    LeveluploginComponent,
    RatingdashboardComponent,
    ReviewlistComponent,
    AddEntryComponent,
    EntryListComponent,
    EntryLoginComponent,
    UpdateEntryComponent,
    LevelupupdateEntryComponent,
    AddCandidateAiComponent,
   
    
  ],
  imports: [
    AutocompleteLibModule,
    CommonModule,
    NgOrderByPipeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    DataTablesModule,
    NgxPaginationModule,
    GoogleChartsModule,
    // Optionally you can set time for `idle`, `timeout` and `ping` in seconds.
    // Default values: `idle` is 600 (10 minutes), `timeout` is 300 (5 minutes)
    // and `ping` is 120 (2 minutes).
    //UserIdleModule.forRoot({ idle: 600, timeout: 300, ping: 120 }),
  ],
  providers: [BnNgIdleService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {

}
