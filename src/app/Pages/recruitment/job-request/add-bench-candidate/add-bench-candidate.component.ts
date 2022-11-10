/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { ResourceMgntServiceService } from './../../../../Services/ResourceMgntServices/resource-mgnt-service.service';
import { MasterserviceService } from 'src/app/Services/MasterServices/masterservice.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { PrefixConstant } from 'src/app/Services/GlobalConstants';
import { ImageServicesService } from 'src/app/Services/ImageServices/image-services.service';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
declare function openModal(): any;
declare function closeModal(): any;

@Component({
  selector: 'app-add-bench-candidate',
  templateUrl: './add-bench-candidate.component.html',
  styleUrls: ['./add-bench-candidate.component.css'],
})
export class AddBenchCandidateComponent implements OnInit {
  loggedInUserName: string;
  loggedInUserId: any;
  CurrentJRNumber: string;
  jrNumber: any;
  resourceId: any;
  constructor(
    private _router: Router,
    private aroute: ActivatedRoute,
    private alertify: AlertifyService,
    private rserv: RecruitmentServiceService,
    private iserv: ImageServicesService,
    private mserv: MasterserviceService,
    private rmserv: ResourceMgntServiceService
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = sessionStorage.getItem('currentUserId');
    this.loggedInUserName = sessionStorage.getItem('currentUserName');

    this.CurrentJRNumber = this.aroute.snapshot.params['id'];
    this.resourceId = this.aroute.snapshot.params['resourceId'];
    this.rmserv.getResourceMgmt(this.resourceId).subscribe(
      (data) => {
        this.candidate = data;
        console.log(this.candidate);
      },
      (error) => console.log(error)
    );
  }
  id() {
    throw new Error('Method not implemented.');
  }

  gotoJobReqList() {
    closeModal();
    this._router.navigateByUrl('hirepros/job-request');
  }

  // Declarations
  candidate: any;
  loader: number = 0;
  selectedResumeFile: File;
  selectedImgFile: File;
  Resumename: string;

  @ViewChild('resumeId', { static: false })
  InputVarForResume: ElementRef;
  @ViewChild('imageId', { static: false })
  InputVarForImage: ElementRef;
  //Add New Job Request
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
  validateEmail(email): boolean {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g;
    return emailRegex.test(String(email.toLowerCase()));
  }
  addNewcandidate(f: NgForm) {
    if (!this.validateEmail(this.candidate.email)) {
      this.alertify.errorMsg('Email is Invalid!');
      return;
    }

    if (this.candidate.contactNumber.length < 10) {
      this.alertify.errorMsg('Contact Number should be atleast 10 digits');
      return;
    }

    if (f.form.valid) {
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
      this.loader = 1;
      this.candidate.createdBy = this.loggedInUserId;
      this.candidate.updatedBy = this.loggedInUserId;
      this.candidate.jrNumber = this.CurrentJRNumber;
      this.candidate.firstName = this.candidate.firstName.trim();
      this.candidate.lastName = this.candidate.lastName.trim();
      this.candidate.email = this.candidate.email;
      this.candidate.sex = this.candidate.sex;
      this.candidate.candidateType = 'Internal';
      this.candidate.currentCompany = 'Promantus Inc.';
      this.candidate.isBench = 1;
      this.candidate.resourceId = this.resourceId;

      this.savenewcandidate(this.candidate, f);
      //f.resetForm();
      //this.selectedResumeFile = null;
    }
  }
  datares: any;
  savedCandidateId: string;
  multipleCandidate: boolean;
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
          form.resetForm();
          this.saveResume(this.datares.id);
          this.alertify.successMsg('Candidate');
          openModal();
        }
      }
    });
  }
  resumeType: any;
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

  gotoback() {
    history.back();
  }
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

  onlyNumber(event) {
    var inputValue = event.charCode;
    if (!(inputValue >= 33 && inputValue <= 57)) {
      event.preventDefault();
    }
  }
}
