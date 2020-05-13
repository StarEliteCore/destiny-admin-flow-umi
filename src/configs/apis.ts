import { produceVersion } from '../../config/version.config';

const ApiIp: string = produceVersion ? 'http://service-gw.winside.com:8080' : 'http://cq.winside.com:1884';
const ApiUrl: string = `${ApiIp}/smartlight-backend/webapi/`;

export const Apis = {
  user: {
    login: `${ApiUrl}user/signInAccount`, // 用户登录
    getAccount: `${ApiUrl}user/getAccount`, // 获取用户信息
    addUser: `${ApiUrl}user/addUser`, // 新增用户
    updateUser: `${ApiUrl}user/updateUser`, // 修改用户
    deleteUser: `${ApiUrl}user/deleteUser`, // 删除用户
    userList: `${ApiUrl}user/userList` // 获取用户列表
  },
  databoard: {
    floorPowerConsumption: `${ApiUrl}databoard/floorPowerConsumption`, // 楼层电量统计
    deviceStatistic: `${ApiUrl}databoard/deviceStatistic`, // 设备数据
    timeIntervalPower: `${ApiUrl}databoard/timeIntervalPower` // 各时段电量统计
  },
  devicemanage: {
    deviceList: `${ApiUrl}devicemanage/deviceList`, // 设备列表
    sendToDevice: `${ApiUrl}devicemanage/sendToDevice`, // 发送数据到设备
    sendToGateway: `${ApiUrl}devicemanage/sendToGateway` // 楼层/区域设备组播控制
  },
  product: {
    deviceType: `${ApiUrl}product/getAllDeviceType` // 设备类型列表
  },
  project: {
    projectList: `${ApiUrl}project/getProjectList`, // 项目列表
    buildList: `${ApiUrl}project/getBuildList`, // 楼栋列表
    floorList: `${ApiUrl}project/getFloorList`, // 楼层列表
    regionList: `${ApiUrl}project/getRegionList`, // 区域列表
    coordinateList: `${ApiUrl}project/getCoordinateList`, // 坐标列表
    deviceLayout: `${ApiUrl}project/deviceLayout`, // 设备部署
    floorData: `${ApiUrl}project/floorData`, // 获取楼层部署数据
    regionData: `${ApiUrl}project/regionData`, // 获取区域部署数据
    addProject: `${ApiUrl}project/addProject`, // 新增项目
    deleteProject: `${ApiUrl}project/deleteProject`, // 删除项目
    addBuild: `${ApiUrl}project/addBuild`, // 新增楼栋
    deleteBuild: `${ApiUrl}project/deleteBuild`, // 删除楼栋
    addFloor: `${ApiUrl}project/addFloor`, // 新增楼层
    deleteFloor: `${ApiUrl}project/deleteFloor`, // 删除楼层
    facilityTypeList: `${ApiUrl}project/facilityTypeList`, // 获取设施类型列表
    setProjectFacility: `${ApiUrl}project/setProjectFacility`, // 设置项目设施
    setFloorFacility: `${ApiUrl}project/setFloorFacility`, // 设置楼层设施
    projectFacilityList: `${ApiUrl}project/getProjectFacilityList`, // 获取项目设施列表
    floorFacilityList: `${ApiUrl}project/getFloorFacilityList` // 获取楼层设施列表
  },
  scene: {
    allSceneDetail: `${ApiUrl}scene/queryAllSceneDetail`, // 场景列表
    createScene: `${ApiUrl}scene/createScene`, // 创建场景
    removeScene: `${ApiUrl}scene/removeScene`, // 删除场景
    modifyScene: `${ApiUrl}scene/modifyScene`, // 修改场景
    sceneDetail: `${ApiUrl}scene/querySceneDetail`, // 场景详情
    allSceneAction: `${ApiUrl}scene/queryAllSceneAction`, // 所有场景的动作
    execScene: `${ApiUrl}scene/execScene`, // 执行场景
    pauseScene: `${ApiUrl}scene/pauseScene`, // 暂停场景
    resumeScene: `${ApiUrl}scene/resumeScene` // 恢复场景
  },
  upload: {
    deviceSN: `${ApiUrl}upload/deviceSN`, // 上传设备SN文件
    mapUpload: `${ApiUrl}upload/mapUpload` // 上传地图文件
  },
  operatelog: {
    operateList: `${ApiUrl}oplog/list` // 操作日志列表
  },
  tenant: {
    createTenant: `${ApiUrl}tenant/createTenant`, // 新增租户
    modifyTenant: `${ApiUrl}tenant/modifyTenant`, // 修改租户
    removeTenant: `${ApiUrl}tenant/removeTenant`, // 删除租户
    tenantList: `${ApiUrl}tenant/tenantList`, // 获取租户列表
    tenantDetail: `${ApiUrl}tenant/tenantDetail`, // 获取租户详情
    tenantUserList: `${ApiUrl}tenant/tenantUserList`, // 获取租户用户列表
    tenantUserDetail: `${ApiUrl}tenant/tenantUserDetail`, // 获取租户用户详情
    tenantAll: `${ApiUrl}tenant/tenantAll` // 获取所有租户
  },
  role: {
    createRole: `${ApiUrl}role/createRole`, // 新增角色
    modifyRole: `${ApiUrl}role/modifyRole`, // 修改角色
    removeRole: `${ApiUrl}role/removeRole`, // 删除角色
    roleList: `${ApiUrl}role/roleList`, // 获取角色列表
    roleDetail: `${ApiUrl}role/roleDetail`, // 获取角色详情
    getAllMenu: `${ApiUrl}role/getAllMenu`, // 获取所有菜单
    allRole: `${ApiUrl}role/allRole` // 获取所有角色
  }
};
