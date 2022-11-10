/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { RecStatusServiceService } from 'src/app/Services/RecStatusServices/rec-status-service.service';
import { AlertifyService } from './../../../../Services/AlertifyService/alertify.service';
import { candidate } from 'src/app/Models/Candidate';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecruitmentServiceService } from 'src/app/Services/RecruitmentServices/recruitment-service.service';
import { PrefixConstant } from 'src/app/Services/GlobalConstants';
import { ImageServicesService } from 'src/app/Services/ImageServices/image-services.service';
import { GlobalMenuMappingServicesService } from 'src/app/Services/GlobalMenuMappingServices/global-menu-mapping-services.service';
declare function highlightRecruitment(): any;
declare function CandidateResumeUpdate(): any;
declare function CandidateImageUpdate(): any;
@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.css'],
})
export class ViewCandidateComponent implements OnInit {
  subMenuName: string;
  constructor(
    private _router: Router,
    private rserv: RecruitmentServiceService,
    private aroute: ActivatedRoute,
    private iserv: ImageServicesService,
    private alertify: AlertifyService,
    private _gmenu: GlobalMenuMappingServicesService,
    private recStatServ: RecStatusServiceService
  ) {}
  loader: number = 0;
  id: string;
  candidate: candidate;
  ngOnInit(): void {
    highlightRecruitment();
    this.loader = 1;
    this.id = this.aroute.snapshot.params['id'];
    this.loadCandiateDetails();
    this.subMenuName = sessionStorage.getItem('subMenuNames');
  }
  /**
   * Loads candiate details
   */
  loadCandiateDetails() {
    this.rserv.getCandidateById(this.id).subscribe(
      (data) => {
        this.candidate = data;
        console.log(this.candidate);
        this.loader = 0;
      },
      (error) => console.log(error)
    );
  }
  /**
   * Goto candidate list
   */
  gotoCandidateList() {
    this._router.navigateByUrl('hirepros/candidate-details');
  }
  /**
   * Gobacks view candidate component
   */
  goback() {
    history.back();
  }
  /**
   * Enables edit candidate
   * @param subMenu
   * @returns true if edit candidate
   */
  enableEditCandidate(subMenu: string): boolean {
    return this._gmenu.subMenuAccess2(this.subMenuName, subMenu);
  }
  /**
   * Opens resume update
   */
  OpenResumeUpdate() {
    CandidateResumeUpdate();
  }
  /**
   * Opens image update
   */
  OpenImageUpdate() {
    CandidateImageUpdate();
  }
  /**
   * Sets rec status
   * @param recStatus
   * @returns rec status
   */
  setRecStatus(recStatus: string): string {
    return this.recStatServ.getRecStatus(recStatus);
  }

  selectedResumeFile: File;
  selectedImgFile: File;
  Resumename: string;
  /**
   * Determines whether resume changed on
   * @param event
   * @returns
   */
  onResumeChanged(event) {
    //this.OpenResumeUpdate();
    this.selectedResumeFile = event.target.files[0];
    console.log(this.selectedResumeFile);
    if (
      this.selectedResumeFile == null ||
      this.selectedResumeFile == undefined
    ) {
      this.alertify.errorMsg('Resume is Required!');
      return;
    }
    if (this.selectedResumeFile.size > 256000) {
      this.alertify.errorMsg('File size should be 256 KB');
      return;
    }
    this.saveResume();
    //console.log(this.selectedFile);
    // if (this.selectedFile) {
    //   this.Resumename = 'candidate_' + this.UserId;
    //   const formData = new FormData();
    //   //this.img.image = this.selectedFile;
    //   formData.append('image', event.target.files[0], this.Resumename);
    // }
  }
  ResumeResData: any;
  resumeType: any;
  /**
   * Saves resume
   */
  saveResume() {
    this.loader = 1;
    this.resumeType = this.selectedResumeFile.name.split('.')[1];
    const formData = new FormData();
    formData.append(
      'resume',
      this.selectedResumeFile,
      PrefixConstant.resumePrefix + this.candidate.id
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
      .newResume(
        formData,
        PrefixConstant.resumePrefix + this.candidate.id,
        this.resumeType
      )
      .subscribe((data) => {
        console.log(data);
        this.loader = 0;
        this.ResumeResData = data;
        if (this.ResumeResData.status == 0) {
          this.alertify.updatedMsg('Resume ');
        } else {
          this.alertify.errorMsg(this.ResumeResData.message);
        }
      });
  }

  imageResData: any;
  imageType: string;
  /**
   * Determines whether img changed on
   * @param e
   * @returns
   */
  onImgChanged(e) {
    this.selectedImgFile = e.target.files[0];
    if (this.selectedImgFile == null || this.selectedImgFile == undefined) {
      this.alertify.errorMsg('Resume is Required!');
      return;
    }
    if (this.selectedImgFile.size > 256000) {
      this.alertify.errorMsg('File size should be 256 KB');
      return;
    }
    this.loader = 1;
    this.imageType = this.selectedImgFile.name.split('.')[1];
    const formData = new FormData();
    formData.append(
      'image',
      this.selectedImgFile,
      PrefixConstant.resumePrefix + this.candidate.id
    );
    this.iserv
      .newImage(
        formData,
        PrefixConstant.imagePrefix + this.candidate.id,
        this.imageType
      )
      .subscribe((data) => {
        this.loader = 0;
        console.log(data);
        this.imageResData = data;
        if (this.imageResData.status == 0) {
          this.alertify.updatedMsg('Image ');
        } else {
          this.alertify.errorMsg(this.imageResData.message);
        }
        this.loadCandiateDetails();
      });
  }
}
