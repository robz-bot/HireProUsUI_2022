import { recrole } from './../../Models/RecRoles';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/Models/Roles';
import { HttpClient } from '@angular/common/http';
import { customer } from 'src/app/Models/Customers';
import { BusinessUnit } from 'src/app/Models/BusinessUnit';
import { project } from 'src/app/Models/Projects';
import { apiUrl } from '../GlobalConstants';
import { Menu } from 'src/app/Models/Menus';
import { emailConfig } from 'src/app/Models/emailConfig';
import {
  cus_recrole_map,
  recRoleByCustomer,
} from 'src/app/Models/cus-recrole-map';
import { employeeDetails } from 'src/app/Models/EmployeeDetails';
@Injectable({
  providedIn: 'root',
})
export class MasterserviceService {
  getcustomerByprojectId(projId: string) {
    throw new Error('Method not implemented.');
  }
  role: Roles[];
  customer: customer[];
  businessunit: BusinessUnit[];
  project: project[];
  recrole: recrole[];

  constructor(private httpClient: HttpClient) {}
  //Base URL
  private baseUrl: string = apiUrl.url;

  //Roles URL
  private getRolesUrl = this.baseUrl + 'getAllRoles';
  private postRolesUrl = this.baseUrl + 'addRole';
  private putRolesUrl = this.baseUrl + 'updateRoleMenuMapping';
  private updatehireproRoleUrl = this.baseUrl + 'updateRole';
  private getRolesByIdUrl = this.baseUrl + 'getMenusForUpdate';
  private deleteRoleUrl = this.baseUrl + 'deleteRoleById';
  private searchRoleUrl = this.baseUrl + 'searchRole';
  private rolenamecheckUrl = this.baseUrl + 'checkRoleName';
  private updateRoleWithMenuUrl = this.baseUrl + 'updateRoleWithMenus';
  private addRoleMenuMappingUrl = this.baseUrl + 'addRoleMenuMapping';
  private getMenuSubMenuListUrl = this.baseUrl + 'getMenuSubMenuList';

  getRolesList(): Observable<Roles[]> {
    return this.httpClient.get<Roles[]>(`${this.getRolesUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
        'Content-Type': 'application/json',
      },
    });
  }

  newRole(role: Roles): Observable<Object> {
    return this.httpClient.post(`${this.postRolesUrl}`, role, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  searchRoleByKey(keyword: string): Observable<Roles[]> {
    return this.httpClient.get<Roles[]>(
      `${this.searchRoleUrl}?key=${keyword}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  updateRoleWithMenu(RoleWithMenu: string[], id: string): Observable<string[]> {
    return this.httpClient.put<string[]>(
      `${this.updateRoleWithMenuUrl}/${id}`,
      RoleWithMenu,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }
  updateRole(RoleWithMenu: Roles): Observable<string[]> {
    return this.httpClient.put<string[]>(
      `${this.updatehireproRoleUrl}`,
      RoleWithMenu,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  addRoleMenuMapping(
    roleId: string,
    role: Roles,
    loggedInUserId: string
  ): Observable<Roles> {
    return this.httpClient.put<Roles>(
      `${this.addRoleMenuMappingUrl}/${roleId}/${loggedInUserId}`,
      role,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }
  updateRoleMenuMapping(
    roleId: string,
    role: Roles,
    loggedInUserId: string
  ): Observable<Object> {
    return this.httpClient.put<Roles>(
      `${this.putRolesUrl}/${roleId}/${loggedInUserId}`,
      role,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getMenuSubMenuList() {
    return this.httpClient.get<Roles[]>(`${this.getMenuSubMenuListUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
        'Content-Type': 'application/json',
      },
    });
  }

  getRoleById(id: string): Observable<Roles> {
    return this.httpClient.get<Roles>(`${this.getRolesByIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  checkRoleName(roleName: string): Observable<Object> {
    return this.httpClient.post(`${this.rolenamecheckUrl}`, roleName, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  deleteRole(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteRoleUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  //Customers URL
  private getCustomersUrl = this.baseUrl + 'getAllCustomers';
  private postCustomerUrl = this.baseUrl + 'addCustomer';
  private putCustomerUrl = this.baseUrl + 'updateCustomer';
  private getCustomerByIdUrl = this.baseUrl + 'getCustomer';
  private deleteCustomerUrl = this.baseUrl + 'deleteCustomerById';
  private searchCustomerUrl = this.baseUrl + 'searchCustomer';

  getCustomersList(): Observable<customer[]> {
    return this.httpClient.get<customer[]>(`${this.getCustomersUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  newCustomer(customer: customer): Observable<Object> {
    return this.httpClient.post(`${this.postCustomerUrl}`, customer, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  searchCustomerByKey(keyword: string): Observable<customer[]> {
    return this.httpClient.get<customer[]>(
      `${this.searchCustomerUrl}?key=${keyword}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getCustomerById(id: string): Observable<customer> {
    return this.httpClient.get<customer>(`${this.getCustomerByIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  updateCustomer(customer: customer): Observable<Object> {
    return this.httpClient.put<customer>(
      `${this.putCustomerUrl}`,
      customer,

      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  deleteCustomer(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteCustomerUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  //BusinessUnit URL
  private getBUUrl = this.baseUrl + 'getAllBusinessUnits';
  private postBUUrl = this.baseUrl + 'addBusinessUnit';
  private putBUUrl = this.baseUrl + 'updateBusinessUnit';
  private getBUByIdUrl = this.baseUrl + 'getBusinessUnit';
  private deleteBUUrl = this.baseUrl + 'deleteBusinessUnitById';
  private searchBUUrl = this.baseUrl + 'searchBusinessUnit';
  private checkBUUrl = this.baseUrl + 'checkBUName';
  private getAllBUsWithPanelUrl = this.baseUrl + 'getAllBUsWithPanel';
  private getPanelIdsByBuIdUrl = this.baseUrl + 'getPanelIdsByBuId';
  private getPanelsByBuIdUrl = this.baseUrl + 'getPanelsByBuId';

  getBUList(): Observable<BusinessUnit[]> {
    return this.httpClient.get<BusinessUnit[]>(`${this.getBUUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getAllBUsWithPanel(): Observable<BusinessUnit[]> {
    return this.httpClient.get<BusinessUnit[]>(
      `${this.getAllBUsWithPanelUrl}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  // getPanelIdsByBuId(id: string): Observable<string[]> {
  //   return this.httpClient.get<string[]>(
  //     `${this.getPanelIdsByBuIdUrl}/'${id}`,
  //     {
  //       headers: {
  //         'pro-api-key': 'h1r5pr0',
  //       },
  //     }
  //   );
  // }

  getPanelsByBuId(id: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.getPanelsByBuIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  checkbuName(buName: string): Observable<Object> {
    return this.httpClient.post(`${this.checkBUUrl}`, buName, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  newBU(businessunit: BusinessUnit): Observable<Object> {
    return this.httpClient.post(`${this.postBUUrl}`, businessunit, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  searchBUByKey(keyword: string): Observable<BusinessUnit[]> {
    return this.httpClient.get<BusinessUnit[]>(
      `${this.searchBUUrl}?key=${keyword}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getBUById(id: string): Observable<BusinessUnit> {
    return this.httpClient.get<BusinessUnit>(`${this.getBUByIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  updateBU(businessunit: BusinessUnit): Observable<Object> {
    return this.httpClient.put<BusinessUnit>(`${this.putBUUrl}`, businessunit, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  deleteBU(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteBUUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  //Projects URL
  private getprojectUrl = this.baseUrl + 'getAllProjects';
  private postprojectUrl = this.baseUrl + 'addProject';
  private putprojectUrl = this.baseUrl + 'updateProject';
  private getprojectByIdUrl = this.baseUrl + 'getProject';
  private deleteprojectUrl = this.baseUrl + 'deleteProjectById';
  private searchprojectUrl = this.baseUrl + 'searchProject';
  private checkProjUrl = this.baseUrl + 'checkProjectName';
  private getProjectsByBuIdUrl = this.baseUrl + 'getProjectsByBuId';
  private getProjectsByCustomerIdUrl = this.baseUrl + 'getProjectsByCustomerId';


  getprojectList(): Observable<project[]> {
    return this.httpClient.get<project[]>(`${this.getprojectUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }
  //GET /api/v1/getProjectsByBuId/{buId}

  checkProjName(projName: string): Observable<Object> {
    return this.httpClient.post(`${this.checkProjUrl}`, projName, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  newproject(project: project): Observable<Object> {
    return this.httpClient.post(`${this.postprojectUrl}`, project, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  searchprojectByKey(keyword: string): Observable<project[]> {
    return this.httpClient.get<project[]>(
      `${this.searchprojectUrl}?key=${keyword}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getprojectById(id: string): Observable<project> {
    return this.httpClient.get<project>(`${this.getprojectByIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getProjectsByBuId(buId: string): Observable<project[]> {
    return this.httpClient.get<project[]>(
      `${this.getProjectsByBuIdUrl}/${buId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getProjectsByCustomerId(customerId: string): Observable<project[]> {
    return this.httpClient.get<project[]>(
      `${this.getProjectsByCustomerIdUrl}/${customerId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  updateproject(project: project): Observable<Object> {
    return this.httpClient.put<project>(`${this.putprojectUrl}`, project, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  deleteproject(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteprojectUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  //Menu URL
  private getmenuUrl = this.baseUrl + 'getAllMenus';
  private getAllSubMenuListUrl = this.baseUrl + 'getAllSubMenuList';
  private getAllMainMenuListUrl = this.baseUrl + 'getAllMainMenuList';
  private postmenuUrl = this.baseUrl + 'addMenu';
  private putmenuUrl = this.baseUrl + 'updateMenu';
  private getmenuByIdUrl = this.baseUrl + 'getMenu';
  private deletemenuUrl = this.baseUrl + 'deleteMenuById';
  private searchmenuUrl = this.baseUrl + 'searchMenu';
  private checkmenuUrl = this.baseUrl + 'checkMenuName';
  private getMenuSubMenuListByRoleIdUrl =
    this.baseUrl + 'getMenuSubMenuListByRoleId';

  getMenuSubMenuListByRoleId(keyword: string): Observable<Roles[]> {
    return this.httpClient.get<Roles[]>(
      `${this.getMenuSubMenuListByRoleIdUrl}/${keyword}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getmenuList(): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(`${this.getmenuUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getAllSubMenuList(): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(`${this.getAllSubMenuListUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getAllMainMenuList(): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(`${this.getAllMainMenuListUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  checkmenuName(recName: string): Observable<Object> {
    return this.httpClient.post(`${this.checkmenuUrl}`, recName, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  newmenu(menu: Menu): Observable<Object> {
    return this.httpClient.post(`${this.postmenuUrl}`, menu, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  searchmenuByKey(keyword: string): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(`${this.searchmenuUrl}/${keyword}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  getmenuById(id: string): Observable<Menu> {
    return this.httpClient.get<Menu>(`${this.getmenuByIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  updatemenu(menu: Menu): Observable<Object> {
    return this.httpClient.put<Menu>(`${this.putmenuUrl}`, menu, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  deletemenu(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deletemenuUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  //RecRole URL
  private getrecroleUrl = this.baseUrl + 'getAllRecruitmentRoles';
  private postrecroleUrl = this.baseUrl + 'addRecruitmentRole';
  private putrecroleUrl = this.baseUrl + 'updateRecruitmentRole';
  private getrecroleByIdUrl = this.baseUrl + 'getRecruitmentRole';
  private deleterecroleUrl = this.baseUrl + 'deleteRecruitmentRoleById';
  private searchrecroleUrl = this.baseUrl + 'searchRecruitmentRole';
  private checkrecroleUrl = this.baseUrl + 'checkRecRoleName';

  getrecroleList(): Observable<recrole[]> {
    return this.httpClient.get<recrole[]>(`${this.getrecroleUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  checkRecroleName(recName: string): Observable<Object> {
    return this.httpClient.post(`${this.checkrecroleUrl}`, recName, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  newrecrole(recrole: recrole): Observable<Object> {
    return this.httpClient.post(`${this.postrecroleUrl}`, recrole, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  searchrecroleByKey(keyword: string): Observable<recrole[]> {
    return this.httpClient.get<recrole[]>(
      `${this.searchrecroleUrl}?key=${keyword}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getrecroleById(id: string): Observable<recrole> {
    return this.httpClient.get<recrole>(`${this.getrecroleByIdUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  updaterecrole(recrole: recrole): Observable<Object> {
    return this.httpClient.put<recrole>(`${this.putrecroleUrl}`, recrole, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  deleterecrole(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleterecroleUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  //Email Config URL
  private getemailConfigUrl = this.baseUrl + 'getAllEmailConf';
  private postemailConfigUrl = this.baseUrl + 'addEmailConf';
  private updateemailConfigUrl = this.baseUrl + 'updateEmailConf';
  private deleteemailConfigUrl = this.baseUrl + 'deleteEmailConfById';
  private searchEmailConfUrl = this.baseUrl + 'searchEmailConf';
  private getEmailConfByIdUrl = this.baseUrl + 'getEmailConfById';
  private getAllEmailConfByBuIdUrl = this.baseUrl + 'getAllEmailConfByBuId';

  getAllEmailConfig(): Observable<emailConfig[]> {
    return this.httpClient.get<emailConfig[]>(`${this.getemailConfigUrl}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  addEmailConfig(emailconfig: emailConfig): Observable<Object> {
    return this.httpClient.post(`${this.postemailConfigUrl}`, emailconfig, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  updateemailConfig(emailconfig: emailConfig): Observable<Object> {
    return this.httpClient.put<emailConfig>(
      `${this.updateemailConfigUrl}`,
      emailconfig,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  deleteEmailConfById(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.deleteemailConfigUrl}/${id}`, {
      headers: {
        'pro-api-key': 'h1r5pr0',
      },
    });
  }

  searchEmailConf(id: string): Observable<emailConfig[]> {
    return this.httpClient.get<emailConfig[]>(
      `${this.searchEmailConfUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getEmailConfById(id: string): Observable<emailConfig> {
    return this.httpClient.get<emailConfig>(
      `${this.getEmailConfByIdUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getAllEmailConfByBuId(id: string): Observable<emailConfig[]> {
    return this.httpClient.get<emailConfig[]>(
      `${this.getAllEmailConfByBuIdUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  //customer-rec-role-mapping URL
  private getAllCustomersWithRecRolesUrl =
    this.baseUrl + 'getAllCustomersWithRecRoles';
  private getRecRolesForUpdateUrl = this.baseUrl + 'getRecRolesForUpdate';
  private getRecRolesByCustomerIdForFilterUrl =
    this.baseUrl + 'getRecRolesByCustomerIdForFilter';
  private mapExistingRecRoleWithCustomerUrl =
    this.baseUrl + 'mapExistingRecRoleWithCustomer';
  private getRecRolesByCustomerIdUrl = this.baseUrl + 'getRecRolesByCustomerId';
  private mapNewRecRoleWithCustomerUrl =
    this.baseUrl + 'mapNewRecRoleWithCustomer';
  private updateCustomerRecRoleMappingUrl =
    this.baseUrl + 'updateCustomerRecRoleMapping';

  getAllCustomersWithRecRoles(): Observable<cus_recrole_map[]> {
    return this.httpClient.get<cus_recrole_map[]>(
      `${this.getAllCustomersWithRecRolesUrl}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getRecRolesByCustomerIdForFilter(id: string): Observable<cus_recrole_map[]> {
    return this.httpClient.get<cus_recrole_map[]>(
      `${this.getRecRolesByCustomerIdForFilterUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getRecRolesForUpdate(id: string): Observable<customer> {
    return this.httpClient.get<customer>(
      `${this.getRecRolesForUpdateUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  getRecRolesByCustomerId(id: string): Observable<recRoleByCustomer[]> {
    return this.httpClient.get<recRoleByCustomer[]>(
      `${this.getRecRolesByCustomerIdUrl}/${id}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  updateCustomerRecRoleMapping(
    customerId: string,
    userId: string,
    recRoleIds: string[]
  ): Observable<Object> {
    return this.httpClient.put<Object>(
      `${this.updateCustomerRecRoleMappingUrl}/${customerId}/${userId}`,
      recRoleIds,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  mapExistingRecRoleWithCustomer(
    customerId: string,
    userId: string,
    recRoleId: string
  ): Observable<Object> {
    return this.httpClient.put<Object>(
      `${this.mapExistingRecRoleWithCustomerUrl}/${customerId}/${userId}/${recRoleId}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  mapNewRecRoleWithCustomer(
    customerId: string,
    userId: string,
    recRoleName: string
  ): Observable<Object> {
    return this.httpClient.put<Object>(
      `${this.mapNewRecRoleWithCustomerUrl}/${customerId}/${userId}/${recRoleName}`,
      {
        headers: {
          'pro-api-key': 'h1r5pr0',
        },
      }
    );
  }

  
}

