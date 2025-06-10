// 主数据库接口 - 使用 SQLite 作为默认存储
export {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  backupData,
  restoreData,
  verifyDataIntegrity,
  searchDestinations,
  getDestinationsByType,
  getDestinationStats,
} from "./sqlite-database.js";
