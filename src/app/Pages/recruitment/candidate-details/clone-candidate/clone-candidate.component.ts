import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { PrefixConstant } from 'src/app/Services/GlobalConstants';
import { ImageServicesService } from 'src/app/Services/ImageServices/image-services.service';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
declare function closeModal(): any;
declare function highlightRecruitment(): any;

@Component({
  selector: 'app-clone-candidate',
  templateUrl: './clone-candidate.component.html',
  styleUrls: ['./clone-candidate.component.css'],
})
export class CloneCandidateComponent implements OnInit {
  constructor(
    private _router: Router,
    private aroute: ActivatedRoute,
    private alertify: AlertifyService,
    private iserv: ImageServicesService,
    private rserv: RecruitmentServiceService
  ) {}
  loggedInUserName: string;
  loggedInUserId: any;
  id: string;
  RecRole: string;
  loader: number = 0;
  candidate: any;

  ngOnInit(): void {
    highlightRecruitment();

    this.loggedInUserId = sessionStorage.getItem('currentUserId');
    this.loggedInUserName = sessionStorage.getItem('currentUserName');
    this.id = this.aroute.snapshot.params['id'];

    this.rserv.getCandidateById(this.id).subscribe(
      (data) => {
        this.candidate = data;
        console.log(this.candidate);
      },
      (error) => console.log(error)
    );

    this.loadAllJobRequestNumbers();
  }
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
   * Goto job req list
   */
  gotoJobReqList() {
    this._router.navigateByUrl('hirepros/candidate-details');
  }
  selectedResumeFile: File;
  selectedImgFile: File;
  Resumename: string;
  //Add New Job Request
  /**
   * Determines whether resume changed on
   * @param event
   */
  onResumeChanged(event) {
    this.selectedResumeFile = event.target.files[0];
    console.log(this.selectedResumeFile);
  }
  imageType: string;
  savedCandidateId: string;
  /**
   * Determines whether img changed on
   * @param e
   */
  onImgChanged(e) {
    this.selectedImgFile = e.target.files[0];
    this.imageType = this.selectedImgFile.name.split('.')[1];
    const formData = new FormData();
    formData.append(
      'image',
      this.selectedImgFile,
      PrefixConstant.resumePrefix + this.savedCandidateId
    );
    this.iserv
      .newImage(
        formData,
        PrefixConstant.imagePrefix + this.savedCandidateId,
        this.imageType
      )
      .subscribe((data) => {
        console.log(data);
        closeModal();
      });
  }
  apidata: any;
  /**
   * Validates email
   * @param email
   * @returns true if email
   */
  validateEmail(email): boolean {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g;
    return emailRegex.test(String(email.toLowerCase()));
  }
  /**
   * Updates candiate
   * @param f
   * @returns
   */
  updateCandiate(f: NgForm) {
    if (!this.validateEmail(this.candidate.email)) {
      this.alertify.errorMsg('Email is Invalid!');
      return;
    }

    if (this.candidate.contactNumber.length < 10) {
      this.alertify.errorMsg('Contact Number should be atleast 10 digits');
      return;
    }
    if (f.form.valid) {
      this.loader = 1;
      this.candidate.updatedBy = this.loggedInUserId;
      this.candidate.firstName = this.candidate.firstName.trim();
      this.candidate.lastName = this.candidate.lastName.trim();

      this.rserv.updateCandidate(this.candidate).subscribe((data) => {
        this.apidata = data;
        this.loader = 0;
        if (this.apidata.status == 1) {
          this.alertify.errorMsg(this.apidata.message);
        } else {

          this.alertify.updatedMsg('Candidate');
          //openModal();
          this._router.navigateByUrl('hirepros/candidate-details');
        }
      });
    }
  }

  resumeType: any;
  /**
   * Saves resume
   * @param id
   */
  saveResume(id) {
    this.resumeType = this.selectedResumeFile.name.split('.')[1];
    const formData = new FormData();
    formData.append(
      'resume',
      this.selectedResumeFile,
      PrefixConstant.resumePrefix + id
    );
    if (this.resumeType == 'doc') {
      this.resumeType = 'msword';
    } else if (this.resumeType == 'docx') {
      this.resumeType =
        'vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (this.resumeType == 'pdf') {
      this.resumeType = 'pdf';
    }
    this.iserv
      .newResume(formData, PrefixConstant.resumePrefix + id, this.resumeType)
      .subscribe((data) => {
        console.log(data);
      });
  }
  /**
   * Goto candidate list
   */
  gotoCandidateList() {
    closeModal();
    this._router.navigateByUrl('hirepros/candidate-details');
  }
  /**
   * Gotobacks update candidate component
   */
  gotoback() {
    history.back();
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
    if (!(inputValue >= 33 && inputValue <= 57)) {
      event.preventDefault();
    }
  }
}
