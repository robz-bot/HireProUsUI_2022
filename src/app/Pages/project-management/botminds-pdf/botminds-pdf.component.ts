import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import * as JSZip from 'jszip';
import JSZip from 'jszip';

import { candidate } from 'src/app/Models/Candidate';
import { AlertifyService } from 'src/app/Services/AlertifyService/alertify.service';
import { PrefixConstant } from 'src/app/Services/GlobalConstants';
import { ImageServicesService } from 'src/app/Services/ImageServices/image-services.service';
declare function highlightProjectManagement(): any;

@Component({
  selector: 'app-project-management',
  templateUrl: './botminds-pdf.component.html',
  styleUrls: ['./botminds-pdf.component.css'],
})
export class BotmindsPdfComponent implements OnInit {
  constructor(
    private alertify: AlertifyService,
    private iserv: ImageServicesService
  ) {}

  ngOnInit(): void {
    highlightProjectManagement();
    this.getAllBotmindsPDF();
  }

  // Declarations
  candidate: candidate = new candidate();
  loader: number = 0;
  selectedResumeFile: File;
  selectedImgFile: File;
  Resumename: string;
  extractedFiles: any[] = [];
  PDFList: any;

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15, 20];
  index = 0;
  /**
   * Handles page change
   * @param event
   */
  handlePageChange(event): void {
    console.log(event);
    this.page = event;
    //this.index = (event - 1) * this.pageSize + 1;
  }

  /**
   * Handles page size change
   *
   * @param event
   */
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  getAllBotmindsPDF() {
    this.iserv.getAllBotmindsPDFs().subscribe((data) => {
      console.log(data);
      this.PDFList = data;
    });
  }

  resumeRes: any;
  /**
   * Gets resume
   * @param id
   */
  getResume(id: string) {
    console.log(id);
    this.iserv.getBotmindsPDF(id).subscribe((data) => {
      console.log(data);
      this.resumeRes = data;
      if (this.resumeRes.resume != null || this.resumeRes.resume != '') {
        const pdfWindow = window.open('', 'New Window', 'width=600,height=400');

        pdfWindow.document.write(
          `<title>View Resume</title><html><body><iframe` +
            " style='width: 100%;height: 100%' src='" +
            this.resumeRes.resume +
            "'></iframe></body></html>"
        );
      } else {
        this.alertify.errorMsg('Resume Not Uploaded');
      }
    });
  }

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
  //below onresumechanged function \is only to get the file from user
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

  /**
   * Handles the upload button click event
   */
  resumeType: any;
  onUpload() {
    this.resumeType = this.selectedResumeFile.type;
    if (!this.selectedResumeFile) {
      this.alertify.errorMsg('Please select a file.');
      return;
    }
    if (this.resumeType != 'application/x-zip-compressed') {
      this.alertify.errorMsg('Only ZIP files are allowed.');
      return;
    }
    this.saveResume(); // Call the saveResume function
  }

  // call below save resume function while click upload button

  /**
   * Saves resume
   * @param id
   */
  saveResume() {
    if (this.resumeType == 'application/x-zip-compressed') {
      this.extractZipFile();
    } else {
      this.alertify.errorMsg('Zip File Required!');
    }
    // if (this.resumeType == 'doc') {
    //   this.resumeType = 'msword';
    // } else if (this.resumeType == 'docx') {
    //   this.resumeType =
    //     'vnd.openxmlformats-officedocument.wordprocessingml.document';
    // } else if (this.resumeType == 'pdf') {
    //   this.resumeType = 'pdf';
    // }

    // this.iserv
    //   .newResume(formData, PrefixConstant.resumePrefix + id, this.resumeType)
    //   .subscribe((data) => {
    //     console.log(data);
    //     this.InputVarForResume.nativeElement.value = '';
    //   });
  }

  extractZipFile() {
    const zip = new JSZip();

    zip
      .loadAsync(this.selectedResumeFile)
      .then((zip) => {
        this.extractedFiles = []; // Clear previous extracted files
        zip.forEach((relativePath, zipEntry) => {
          // Check if the entry is a file and ends with .pdf
          if (!zipEntry.dir && zipEntry.name.toLowerCase().endsWith('.pdf')) {
            // Extract each PDF file from the ZIP
            zipEntry.async('blob').then((blob) => {
              const file = new File([blob], zipEntry.name);
              this.extractedFiles.push(file); // Store extracted PDF file

              //save file in Db
              this.resumeType = file.name.split('.')[1];
              this.Resumename = file.name.split('/')[1];
              const formData = new FormData();
              formData.append('resume', file, this.Resumename);

              this.iserv
                .newBotmindsPDF(formData, this.Resumename, this.resumeType)
                .subscribe((data) => {
                  console.log(data);
                  this.InputVarForResume.nativeElement.value = '';
                  this.getAllBotmindsPDF()
                });
            });
          }
        });
        console.log('Extracted files:', this.extractedFiles);

        // this.resumeType = this.selectedResumeFile.name.split('.')[1];
        // const formData = new FormData();
        // formData.append(
        //   'resume',
        //   this.selectedResumeFile,
        //   PrefixConstant.resumePrefix + id
        // );
      })
      .catch((error) => {
        console.error('Error extracting ZIP file:', error);
      });
  }
}
