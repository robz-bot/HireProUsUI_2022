import { Menu } from './Menus';

export class Roles {
  createdBy: string;
  createdByName: string;
  createdDateTime: string;
  id: string;
  menuDtoList: menuDto[];
  subMenuDtoList: menuDto[];
  message: string;
  roleName: string;
  status: string;
  updatedBy: string;
  updatedByName: string;
  updatedDateTime: string;
  keyword: string;
  mainMenuIds: Array<string>;
  subMenuIds: Array<string>;
}
export class menuDto {
  createdBy: string;
  createdByName: string;
  createdDateTime: string;
  id: string;
  mainMenuId: string;
  mainMenuName: string;
  menuName: string;
  message: string;
  pageLink: string;
  selected: string;
  status: string;
  updatedBy: string;
  updatedByName: string;
  updatedDateTime: string;
}
