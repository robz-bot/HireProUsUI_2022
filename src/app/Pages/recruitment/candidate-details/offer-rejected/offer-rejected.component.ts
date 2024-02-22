import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { candidate } from 'src/app/Models/Candidate';
import { vendor } from 'src/app/Models/vendor';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
import { ImageServicesService } from 'src/app/Services/ImageServices/image-services.service';
import { RecStatusServiceService } from 'src/app/Services/RecStatusServices/rec-status-service.service';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { VendorServiceService } from 'src/app/Services/VendorServices/vendor-service.service';

@Component({
  selector: 'app-offer-rejected',
  templateUrl: './offer-rejected.component.html',
  styleUrls: ['./offer-rejected.component.css']
})
export class OfferRejectedComponent implements OnInit {

  subMenuName: string;
  vendorUniqueId: string;
  isVendor: string;
  constructor(
    private rserv: RecruitmentServiceService,
    private _router: Router,
    private alertify: AlertifyService,
    private recStatServ: RecStatusServiceService,
    private iserv: ImageServicesService,
    private _gmenu: GlobalMenuMappingServicesService,
    private vendorService: VendorServiceService
  ) {}

  ngOnInit(): void {
    this.vendorUniqueId = sessionStorage.getItem('currentVendorId');
    this.isVendor = sessionStorage.getItem('isVendor');
    this.getofferRejectedCandidates();
    this.subMenuName = sessionStorage.getItem('subMenuNames');
    this.loadAllJobRequestNumbers();
    this.loadActiveVendors();
  }

  activeVendors: vendor[];
  loadActiveVendors() {
    this.vendorService.getActiveVendors().subscribe((data) => {
      console.log(data);
      this.activeVendors = data;
    });
  }

  candidate: candidate = new candidate();
  loader: number = 0;

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  /**
   * Handles page change for sel candi
   * @param event
   */
  handlePageChangeForSelCandi(event): void {
    //console.log(event);
    this.page = event;
    //this.getofferRejectedCandidates();
  }
  /**
   * Handles page size change
   * @param event
   */
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    //this.loadMenus();
  }
  /**
   * Finds details forselected candidates
   * @param data
   * @returns
   */
  findDetailsForofferRejectedCandidates(data) {
    return this.selectedCandidateList.filter((x) => x.id === data.id);
  }
  /**
   * Determines whether change selected candidates ref id on
   * @param id
   */
  onChangeofferRejectedCandidatesRefId(id: string) {
    console.log(id);
    this.rserv
      .getCandidatesByJRNumAndRecStatusList(id, this.offerRejectedCandidates)
      .subscribe((data) => {
        console.log(data);
        this.selectedCandidateList = data;
      });
  }
  /**
   * Searchs selected candidates
   * @param f
   * @returns
   */
  searchofferRejectedCandidates(f: NgForm) {
    if (
      (this.candidate.keyword == '' || this.candidate.keyword == undefined) &&
      (this.candidate.refId == undefined || this.candidate.refId == '') &&
      (this.candidate.vendorId == undefined || this.candidate.vendorId == '')
    ) {
      this.alertify.errorMsg('Select any one Criteria');
      return;
    }
    if (this.candidate.keyword == undefined) {
      this.candidate.keyword = '';
    }
    if (this.candidate.refId == undefined) {
      this.candidate.refId = '';
    }
    if (this.candidate.vendorId == undefined) {
      this.candidate.vendorId = '';
    }

    if (f.form.valid) {
      this.loader = 1;
      this.rserv
        .searchCandidateByRecStatusList(
          this.candidate.refId,
          this.candidate.keyword,
          this.offerRejectedCandidates,
          this.vendorUniqueId
        )
        .subscribe((data) => {
          console.log(data);
          this.loader = 0;
          this.selectedCandidateList = data;
          this.offerRejectedCandidatesCount = this.selectedCandidateList.length;

          this.handlePageChangeForSelCandi(1);
        });
    } else {
      this.alertify.errorMsg('Search keyword is Required');
    }
  }
  /**
   * Resets selected candidates
   */
  resetofferRejectedCandidates() {
    this.candidate.keyword = '';
    this.candidate.refId = undefined;
    this.candidate.vendorId = undefined;
    this.getofferRejectedCandidates();
  }

  offerRejectedCandidates: string[] = ['27'];
  selectedCandidateList: any;
  offerRejectedCandidatesCount: number;
  /**
   * Gets selected candidates
   */
  getofferRejectedCandidates() {
    this.candidate.refId = undefined;
    this.loader = 1;
    if (this.isVendor == '1') {
      this.rserv
        .getCandidatesByRecStatusListForVendor(
          this.offerRejectedCandidates,
          this.vendorUniqueId
        )
        .subscribe((data) => {
          this.loader = 0;
          this.selectedCandidateList = data;
          this.offerRejectedCandidatesCount = this.selectedCandidateList.length;
        });
    } else {
      this.rserv
        .getCandidatesByRecStatusList(this.offerRejectedCandidates)
        .subscribe((data) => {
          this.loader = 0;
          this.selectedCandidateList = data;
          this.offerRejectedCandidatesCount = this.selectedCandidateList.length;
        });
    }
  }
  /**
   * Goto update candidate
   * @param id
   */
  gotoUpdateCandidate(id) {
    this._router.navigate(['hirepros/update-candidate', id]);
  }
  /**
   * Goto job req view
   * @param id
   */
  gotoJobReqView(id) {
    this._router.navigate(['hirepros/view-job-request', id]);
  }
  /**
   * Goto candidate view
   * @param id
   */
  gotoCandidateView(id) {
    this._router.navigate(['hirepros/view-candidate', id]);
  }

  deleteResData: any;
  /**
   * Deletes candidate
   * @param id
   */
  deleteCandidate(id) {
    this.rserv.deleteCandidate(id).subscribe((data) => {
      this.deleteResData = data;
      console.log(data);
      if (this.deleteResData.status == 1) {
        this.alertify.errorMsg(this.deleteResData.message);
        return;
      } else {
        this.alertify.deleteMsg('Candidate');
        this.getofferRejectedCandidates();
      }
    });
  }
  ////////////////////
  /**
   * Enables delete icon
   * @param mainMenu
   * @returns true if delete icon
   */
  enableDeleteIcon(mainMenu: string): boolean {
    return this._gmenu.mainMenuAccess2(this.subMenuName, mainMenu);
  }
  /**
   * Enables edit candidate
   * @param subMenu
   * @returns true if edit candidate
   */
  enableEditCandidate(subMenu: string): boolean {
    return this._gmenu.subMenuAccess2(this.subMenuName, subMenu);
  }
  ///////////////////////
  JobRequestNumbersList: any;
  /**
   * Loads all job request numbers
   */
  loadAllJobRequestNumbers() {
    this.rserv.getAllJobRequestNumbers().subscribe((data) => {
      this.JobRequestNumbersList = data;
      //console.log(this.JobRequestNumbersList);
    });
  }
  /**
   * Sets rec status
   * @param recStatus
   * @returns rec status
   */
  setRecStatus(recStatus: string): string {
    return this.recStatServ.getRecStatus(recStatus);
  }

  resumeRes: any;
  /**
   * Gets resume
   * @param id
   */
  getResume(id: string) {
    console.log(id);
    this.iserv.getResume('resume_' + id).subscribe((data) => {
      console.log(data);
      this.resumeRes = data;
      if (this.resumeRes.resume != null || this.resumeRes.resume != '') {
        // const pdfWindow = window.open('');
        const pdfWindow = window.open('', 'New Window', 'width=600,height=400');
        pdfWindow.document.write(
          '<title>View Resume</title><html><body><iframe' +
            " style='width: 100%;height: 100%' src='" +
            this.resumeRes.resume +
            "'></iframe></body></html>"
        );
      } else {
        this.alertify.errorMsg('Resume Not Uploaded');
      }
    });
  }

  // Textbox validating Functions
  /**
   * Onlys alpha space
   * @param event
   */
  onlyAlphaSpace(event) {
    var inputValue = event.charCode;
    if (
      !(inputValue >= 65 && inputValue <= 90) &&
      !(inputValue >= 97 && inputValue <= 122) &&
      inputValue != 32 &&
      inputValue != 0
    ) {
      event.preventDefault();
    }
  }
  /**
   * Onlys number
   * @param event
   */
  onlyNumber(event) {
    var inputValue = event.charCode;
    if (!(inputValue >= 48 && inputValue <= 57)) {
      event.preventDefault();
    }
  }
  /**
   * Goto view history
   * @param jrNum
   * @param candidateId
   */
  gotoViewHistory(jrNum: string, candidateId: string) {
    this._router.navigate(['hirepros/candidate-history', jrNum, candidateId]);
  }
  /**
   * Clones candidate
   * @param candidateId
   * added on 11/12/2021
   */
  cloneCandidate(candidateId: string) {
    console.log(candidateId);
    this._router.navigate(['hirepros/clone-candidate', candidateId]);
  }

   // Textbox validating Functions
  /**
   * Onlys uppercase and lowecase letters
   * @param event
   */
  onlyAlphaLowerCase(event) {
    var inputValue = event.charCode;
    if (
      !(inputValue >= 65 && inputValue <= 90) &&
      !(inputValue >= 97 && inputValue <= 122) &&
      inputValue != 32 &&
      inputValue != 0
    ) {
      event.preventDefault();
    }
  }
  onPaste(event: ClipboardEvent): void {
    
    const pastedData = event.clipboardData?.getData('text/plain');

    // Allow only text (letters) in the pasted data
    const filteredText = pastedData
      ?.split('')
      .filter(char => char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 122 && char.charCodeAt(0) != 32 && char.charCodeAt(0) != 0)
      .join('');
    this.candidate.keyword = filteredText;
    //candidate.keyword
    
    event.preventDefault();
  }
}
