/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { PrefixConstant } from 'src/app/Services/GlobalConstants';
import { ImageServicesService } from 'src/app/Services/ImageServices/image-services.service';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
declare function openModal(): any;
declare function closeModal(): any;
declare function highlightRecruitment(): any;
@Component({
  selector: 'app-update-candidate',
  templateUrl: './update-candidate.component.html',
  styleUrls: ['./update-candidate.component.css'],
})
export class UpdateCandidateComponent implements OnInit {
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
  vendorUniqueId: string;
  isVendor: string;

  ngOnInit(): void {
    highlightRecruitment();

    this.loggedInUserId = sessionStorage.getItem('currentUserId');
    this.loggedInUserName = sessionStorage.getItem('currentUserName');

    this.vendorUniqueId = sessionStorage.getItem('currentVendorId');
    this.isVendor = sessionStorage.getItem('isVendor');
    this.id = this.aroute.snapshot.params['id'];

    this.rserv.getCandidateById(this.id).subscribe(
      (data) => {
        this.candidate = data;
        console.log(this.candidate);
      },
      (error) => console.log(error)
    );
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
    //console.log(this.selectedFile);
    // if (this.selectedFile) {
    //   this.Resumename = 'candidate_' + this.UserId;
    //   const formData = new FormData();
    //   formData.append('image', event.target.files[0], this.Resumename);
    // }
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
      if (this.isVendor == '1') {
        this.candidate.updatedBy = sessionStorage.getItem('currentVendorId');
      } else {
        this.candidate.updatedBy = this.loggedInUserId;
      }
      this.candidate.firstName = this.candidate.firstName.trim();
      this.candidate.lastName = this.candidate.lastName.trim();
      if (this.isVendor == '1') {
        this.candidate.vendorId = this.vendorUniqueId;
      }

      this.rserv.updateCandidate(this.candidate).subscribe((data) => {
        this.apidata = data;
        this.loader = 0;
        if (this.apidata.status == 1) {
          this.alertify.errorMsg(this.apidata.message);
        } else {
          //this.saveResume(this.apidata.id);
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
