/**
 * Copyright (C) 2021 Promantus Private Limited. All Rights Reserved
 * @author Robin Rajesh
 * @email robinrajesh@promantus.com
 * @create date 2021-10-09
 * @modify date 2021-10-09
 * @desc [description]
 */
import { PrefixConstant } from './../../../Services/GlobalConstants';
import { AlertifyService } from './../../../Services/AlertifyService/alertify.service';
import { ImageUpload } from './../../../Models/image';
import { NgForm } from '@angular/forms';
import { LoginServicesService } from './../../../Services/LoginServices/login-services.service';
import { UserRegServicesService } from './../../../Services/UserRegServices/user-reg-services.service';
import { Component, OnInit } from '@angular/core';
import { UserReg } from 'src/app/Models/UserReg';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { ImageServicesService } from 'src/app/Services/ImageServices/image-services.service';
declare function triggerImg(): any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userv: UserRegServicesService,
    private alertify: AlertifyService,
    private lserv: LoginServicesService,
    private _router: Router,
    private iserv: ImageServicesService
  ) {}
  private userPre: string = PrefixConstant.userPrefix;
  UserId: string;
  setImg: any;
  ImgName: any;
  loader: number = 0;
  ngOnInit(): void {
    this.showEditPro = 0;
    this.UserId = sessionStorage.getItem('currentUserId');
    this.ImgName = this.userPre + sessionStorage.getItem('currentUserId');
    this.setImg = sessionStorage.getItem(this.ImgName);
    this.getProfileByEmail();
    this.getimg(this.ImgName);
  }
  showEditPro: number = 0;
  showEditProfile() {
    this.showEditPro = 1;
  }
  closeEditProfile() {
    this.showEditPro = 0;
  }

  OpenImgUpload() {
    triggerImg();
  }

  userDet: any;
  changeText: boolean = false;
  getProfileByEmail() {
    // console.log(this.UserId);
    this.loader == 1;
    this.userv.getUserById(this.UserId).subscribe((data) => {
      this.userDet = data;
      this.loader == 0;
      // console.log(this.userDet);
    });
    this.getimg(this.ImgName);
  }

  getProfile;

  updateUserReg(id: string) {
    console.log(id);
    this._router.navigate(['hirepros/update-user-reg', id]);
  }

  img: ImageUpload = new ImageUpload();
  selectedFile: File;
  name: string;
  dataRes: any;
  imageType: string;
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile.size > 256000) {
      this.alertify.errorMsg('Image should not be exceed 256KB');
      return;
    }
    //console.log(this.selectedFile);
    if (this.selectedFile) {
      this.loader = 1;
      this.name = 'user_' + this.UserId;
      const formData = new FormData();
      this.img.image = this.selectedFile;
      formData.append('image', event.target.files[0], this.name);
      // formData.forEach((value, key) => {
      //   console.log(key + ' ' + value);
      // });
      console.log(formData);
      this.imageType = this.img.image.type.split('/')[1];
      this.iserv.newImage(formData, this.name, this.imageType).subscribe(
        (data) => {
          console.log(data);
          this.dataRes = data;
          this.loader = 0;
          if (this.dataRes.status == 0) {
            this.alertify.updatedMsg('Profile');
            this.getimg(this.name);
          } else {
            this.alertify.errorMsg(this.dataRes.message);
          }
        },
        (err) => {
          this.alertify.errorMsg(err.error.message);
        }
      );
    }
  }

  getImgData: any;

  getimg(name: string) {
    //this.loader = 1;
    this.iserv.getUserImg(name).subscribe((data) => {
      //console.log(data);
      this.getImgData = data;
      this.setImg = 'data:image/png;base64,' + this.getImgData.image;
      sessionStorage.setItem(name, this.setImg);
      //console.log(this.setImg);
      this.getProfileByEmail();
    });
  }

  imageDeleted: number = 0;
  deleteImg() {
    this.loader = 1;
    this.iserv.deleteImageByName(this.ImgName).subscribe((data) => {
      console.log(data);
      this.loader = 0;
      this.alertify.deleteMsg('Profile Image');
      this.imageDeleted = 1;
    });
    this.getProfileByEmail();
  }
}
