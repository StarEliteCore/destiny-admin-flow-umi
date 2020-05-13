import { Apis } from '@/configs/apis';
import { request } from 'umi';

/**
 * 获取项目列表
 */
export const ProjectListAPI = async (): Promise<any> => request(Apis.project.projectList);
/**
 * 获取楼栋列表
 * @param {*} params {projectId} 项目 ID
 */
export const BuildListAPI = async (params: any): Promise<any> =>
  request(Apis.project.buildList, {
    data: params
  });
/**
 * 获取楼层列表
 * @param {*} params {buildId} 楼栋 ID
 */
export const FloorListAPI = async (params: any): Promise<any> =>
  request(Apis.project.floorList, {
    data: params
  });
/**
 * 获取区域列表
 * @param {*} params {floorId} 楼层ID
 */
export const RegionListAPI = async (params: any): Promise<any> =>
  request(Apis.project.regionList, {
    data: params
  });
