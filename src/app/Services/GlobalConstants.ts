import { environment } from './../../environments/environment';

export class apiUrl {
  //public static url: string = 'http://18.208.115.152:9292/hirepros/api/v1/'; //QAS
  //public static url: string = 'http://52.73.21.79:9292/hirepros/api/v1/'; //Production
  //public static url: string = 'http://localhost:8080/api/v1/'; //Developement

  public static url: string = environment.apiUrl;
}

export class PrefixConstant {
  public static userPrefix: string = 'user_';
  public static basePrefix: string = 'data:image/png;base64,';
  public static resumePrefix: string = 'resume_';
  public static imagePrefix: string = 'candidate_';
}

export class profile {
  public static updateFrom: boolean = false; // User Reg
}

export class JobReq {
  public static RecRoleFromJobReq: string;
}
