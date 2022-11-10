/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { PrefixConstant } from './../../../../Services/GlobalConstants';
import { ImageServicesService } from 'src/app/Services/ImageServices/image-services.service';
import { candidate } from './../../../../Models/Candidate';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { NgForm } from '@angular/forms';
import { JobReq } from 'src/app/Services/GlobalConstants';
declare function openModal(): any;
declare function closeModal(): any;
declare function highlightRecruitment(): any;
@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
})
export class AddCandidateComponent implements OnInit {
  constructor(
    private _router: Router,
    private aroute: ActivatedRoute,
    private alertify: AlertifyService,
    private rserv: RecruitmentServiceService,
    private iserv: ImageServicesService
  ) {}
  loggedInUserName: string;
  loggedInUserId: any;
  CurrentJRNumber: string;
  placementFor: string;
  RecRole: string;
  vendorUniqueId: string;
  isVendor: string;

  ngOnInit(): void {
    highlightRecruitment();

    this.loggedInUserId = sessionStorage.getItem('currentUserId');
    this.loggedInUserName = sessionStorage.getItem('currentUserName');
    this.CurrentJRNumber = this.aroute.snapshot.params['id'];
    this.placementFor = this.aroute.snapshot.params['type'];
    console.log(this.placementFor);
    this.RecRole = JobReq.RecRoleFromJobReq;
    this.vendorUniqueId = sessionStorage.getItem('currentVendorId');
    this.isVendor = sessionStorage.getItem('isVendor');
  }
  /**
   * Goto job req list
   */
  gotoJobReqList() {
    closeModal();
    this._router.navigateByUrl('hirepros/job-request');
  }

  // Declarations
  candidate: candidate = new candidate();
  loader: number = 0;
  selectedResumeFile: File;
  selectedImgFile: File;
  Resumename: string;

  @ViewChild('resumeId', { static: false })
  InputVarForResume: ElementRef;
  @ViewChild('imageId', { static: false })
  InputVarForImage: ElementRef;
  //Add New Job Request
  /**
   * Determines whether resume changed on
   * @param event
   * @returns
   */
  onResumeChanged(event) {
    this.selectedResumeFile = event.target.files[0];
    if (
      this.selectedResumeFile == null ||
      this.selectedResumeFile == undefined
    ) {
      this.alertify.errorMsg('File is Required!');
      return;
    }
    if (this.selectedResumeFile.size > 256000) {
      this.InputVarForResume.nativeElement.value = '';
      this.alertify.errorMsg('File size should be 256 KB');
      return;
    }
  }
  imageType: string;
  /**
   * Determines whether img changed on
   * @param e
   * @returns
   */
  onImgChanged(e) {
    this.selectedImgFile = e.target.files[0];
    if (this.selectedImgFile == null || this.selectedImgFile == undefined) {
      this.alertify.errorMsg('Image is Required!');
      return;
    }
    if (this.selectedImgFile.size > 256000) {
      this.InputVarForImage.nativeElement.value = '';
      this.alertify.errorMsg('Image size should be 256 KB');
      return;
    }
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
      });
    this.cancel();
  }
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
   * Adds newcandidate
   * @param f
   * @returns
   */
  addNewcandidate(f: NgForm) {
    if (!this.validateEmail(this.candidate.email)) {
      this.alertify.errorMsg('Email is Invalid!');
      return;
    }
    if (
      this.selectedResumeFile == null ||
      this.selectedResumeFile == undefined
    ) {
      this.alertify.errorMsg('Resume is Required!');
      return;
    }
    if (this.selectedResumeFile.size > 256000) {
      this.selectedResumeFile = null;
      this.alertify.errorMsg('Resume File size should be 256 KB');
      return;
    }
    if (this.candidate.contactNumber.length < 10) {
      this.alertify.errorMsg('Contact Number should be atleast 10 digits');
      return;
    }

    if (f.form.valid) {
      this.loader = 1;
      if (this.isVendor == '1') {
        this.candidate.createdBy = sessionStorage.getItem('currentVendorId');
        this.candidate.updatedBy = sessionStorage.getItem('currentVendorId');
      } else {
        this.candidate.createdBy = this.loggedInUserId;
        this.candidate.updatedBy = this.loggedInUserId;
      }
      this.candidate.jrNumber = this.CurrentJRNumber;
      this.candidate.firstName = this.candidate.firstName.trim();
      this.candidate.lastName = this.candidate.lastName.trim();
      this.candidate.isBench = 0;
      if (this.isVendor == '1') {
        this.candidate.vendorId = this.vendorUniqueId;
      }

      this.savenewcandidate(this.candidate, f);
      //f.resetForm();
      //this.selectedResumeFile = null;
    }
  }
  datares: any;
  savedCandidateId: string;
  multipleCandidate: boolean;
  /**
   * Savenewcandidates add candidate component
   * @param candidate
   * @param form
   */
  savenewcandidate(candidate, form: NgForm) {
    this.rserv.newCandidate(candidate).subscribe((data) => {
      this.datares = data;
      if (this.datares != null || this.datares != undefined) {
        this.savedCandidateId = this.datares.id;
        this.loader = 0;
        if (this.datares.status == 1) {
          this.alertify.errorMsg(this.datares.message);
          return;
        } else {
          form.resetForm({
            candidateType: 'undefined',
          });
          this.saveResume(this.datares.id);
          this.alertify.successMsg('Candidate');
          openModal();
        }
      }
    });
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
        this.InputVarForResume.nativeElement.value = '';
      });
  }
  /**
   * Gotobacks add candidate component
   */
  gotoback() {
    history.back();
  }
  /**
   * Cancels add candidate component
   */
  cancel() {
    closeModal();
    console.log(this.multipleCandidate);
    if (this.multipleCandidate) {
      // window.location.reload();
      this.multipleCandidate = true;
    } else {
      this._router.navigateByUrl('hirepros/candidate-details');
    }
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
