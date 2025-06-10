import path from "path";
import fs from "fs";
import Database from "better-sqlite3";
import { destinations } from "@/data/sampleData";

const DB_PATH = path.join(process.cwd(), "data", "travel.db");
const DATA_DIR = path.join(process.cwd(), "data");

// 确保数据目录存在
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// 初始化数据库
function initDatabase() {
  ensureDataDir();
  const db = new Database(DB_PATH);

  // 创建目的地表
  const createDestinationsTable = `
    CREATE TABLE IF NOT EXISTS destinations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      description TEXT,
      type TEXT,
      duration INTEGER,
      max_group_size INTEGER,
      difficulty TEXT,
      season TEXT,
      highlights TEXT, -- JSON 数组存储
      included TEXT,   -- JSON 数组存储
      not_included TEXT, -- JSON 数组存储
      price_adult REAL,
      price_child REAL,
      images TEXT,     -- JSON 数组存储
      status TEXT DEFAULT '草稿',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.exec(createDestinationsTable);

  // 检查是否需要初始化数据
  const count = db.prepare("SELECT COUNT(*) as count FROM destinations").get();
  if (count.count === 0) {
    initSampleData(db);
  }

  return db;
}

// 初始化示例数据
function initSampleData(db) {
  const insertStmt = db.prepare(`
    INSERT INTO destinations (
      id, name, location, description, type, duration, max_group_size,
      difficulty, season, highlights, included, not_included,
      price_adult, price_child, images, status, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  destinations.forEach((dest) => {
    insertStmt.run(
      dest.id,
      dest.name,
      dest.location,
      dest.description,
      dest.type,
      dest.duration,
      dest.maxGroupSize,
      dest.difficulty,
      dest.season,
      JSON.stringify(dest.highlights || []),
      JSON.stringify(dest.included || []),
      JSON.stringify(dest.notIncluded || []),
      dest.price?.adult || 0,
      dest.price?.child || 0,
      JSON.stringify(dest.images || []),
      dest.status,
      dest.createdAt,
      dest.updatedAt
    );
  });
}

// 数据转换函数 - 从数据库格式转换为应用格式
function transformDbToApp(row) {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    location: row.location,
    description: row.description,
    type: row.type,
    duration: row.duration,
    maxGroupSize: row.max_group_size,
    difficulty: row.difficulty,
    season: row.season,
    highlights: JSON.parse(row.highlights || "[]"),
    included: JSON.parse(row.included || "[]"),
    notIncluded: JSON.parse(row.not_included || "[]"),
    price: {
      adult: row.price_adult,
      child: row.price_child,
    },
    images: JSON.parse(row.images || "[]"),
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// 获取所有目的地
export function getAllDestinations() {
  const db = initDatabase();
  try {
    const rows = db
      .prepare("SELECT * FROM destinations ORDER BY created_at DESC")
      .all();
    return rows.map(transformDbToApp);
  } finally {
    db.close();
  }
}

// 根据ID获取目的地
export function getDestinationById(id) {
  const db = initDatabase();
  try {
    const row = db.prepare("SELECT * FROM destinations WHERE id = ?").get(id);
    return transformDbToApp(row);
  } finally {
    db.close();
  }
}

// 创建新目的地
export function createDestination(destinationData) {
  const db = initDatabase();
  try {
    // 如果传入了 ID，使用传入的 ID，否则生成新的
    const newDestination = {
      id: destinationData.id || Date.now().toString(),
      ...destinationData,
      createdAt:
        destinationData.createdAt || new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    const insertStmt = db.prepare(`
      INSERT INTO destinations (
        id, name, location, description, type, duration, max_group_size,
        difficulty, season, highlights, included, not_included,
        price_adult, price_child, images, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertStmt.run(
      newDestination.id,
      newDestination.name,
      newDestination.location,
      newDestination.description || "",
      newDestination.type || "",
      newDestination.duration || 1,
      newDestination.maxGroupSize || 10,
      newDestination.difficulty || "简单",
      newDestination.season || "全年",
      JSON.stringify(newDestination.highlights || []),
      JSON.stringify(newDestination.included || []),
      JSON.stringify(newDestination.notIncluded || []),
      newDestination.price?.adult || 0,
      newDestination.price?.child || 0,
      JSON.stringify(newDestination.images || []),
      newDestination.status || "草稿",
      newDestination.createdAt,
      newDestination.updatedAt
    );

    return result.changes > 0 ? newDestination : null;
  } finally {
    db.close();
  }
}

// 更新目的地
export function updateDestination(id, updateData) {
  const db = initDatabase();
  try {
    const existing = db
      .prepare("SELECT * FROM destinations WHERE id = ?")
      .get(id);
    if (!existing) return null;

    const updatedData = {
      ...updateData,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    const updateStmt = db.prepare(`
      UPDATE destinations SET
        name = COALESCE(?, name),
        location = COALESCE(?, location),
        description = COALESCE(?, description),
        type = COALESCE(?, type),
        duration = COALESCE(?, duration),
        max_group_size = COALESCE(?, max_group_size),
        difficulty = COALESCE(?, difficulty),
        season = COALESCE(?, season),
        highlights = COALESCE(?, highlights),
        included = COALESCE(?, included),
        not_included = COALESCE(?, not_included),
        price_adult = COALESCE(?, price_adult),
        price_child = COALESCE(?, price_child),
        images = COALESCE(?, images),
        status = COALESCE(?, status),
        updated_at = ?
      WHERE id = ?
    `);

    const result = updateStmt.run(
      updatedData.name,
      updatedData.location,
      updatedData.description,
      updatedData.type,
      updatedData.duration,
      updatedData.maxGroupSize,
      updatedData.difficulty,
      updatedData.season,
      updatedData.highlights ? JSON.stringify(updatedData.highlights) : null,
      updatedData.included ? JSON.stringify(updatedData.included) : null,
      updatedData.notIncluded ? JSON.stringify(updatedData.notIncluded) : null,
      updatedData.price?.adult,
      updatedData.price?.child,
      updatedData.images ? JSON.stringify(updatedData.images) : null,
      updatedData.status,
      updatedData.updatedAt,
      id
    );

    if (result.changes > 0) {
      const updated = db
        .prepare("SELECT * FROM destinations WHERE id = ?")
        .get(id);
      return transformDbToApp(updated);
    }
    return null;
  } finally {
    db.close();
  }
}

// 删除目的地
export function deleteDestination(id) {
  const db = initDatabase();
  try {
    const result = db.prepare("DELETE FROM destinations WHERE id = ?").run(id);
    return result.changes > 0;
  } finally {
    db.close();
  }
}

// 数据备份功能
export function backupData() {
  try {
    const backupDir = path.join(DATA_DIR, "backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.join(backupDir, `travel_${timestamp}.db`);

    // 复制数据库文件
    fs.copyFileSync(DB_PATH, backupFile);
    return backupFile;
  } catch {
    // 数据备份失败
    return null;
  }
}

// 数据恢复功能
export function restoreData(backupFile) {
  try {
    if (!fs.existsSync(backupFile)) {
      return false;
    }
    fs.copyFileSync(backupFile, DB_PATH);
    return true;
  } catch {
    // 数据恢复失败
    return false;
  }
}

// 数据完整性检查
export function verifyDataIntegrity() {
  try {
    const db = initDatabase();
    const result = db
      .prepare("SELECT COUNT(*) as count FROM destinations")
      .get();
    db.close();
    return result.count >= 0;
  } catch {
    // 数据完整性检查失败
    return false;
  }
}

// 高级查询功能
export function searchDestinations(query) {
  const db = initDatabase();
  try {
    const searchStmt = db.prepare(`
      SELECT * FROM destinations 
      WHERE name LIKE ? OR location LIKE ? OR description LIKE ? OR type LIKE ?
      ORDER BY created_at DESC
    `);

    const searchTerm = `%${query}%`;
    const rows = searchStmt.all(searchTerm, searchTerm, searchTerm, searchTerm);
    return rows.map(transformDbToApp);
  } finally {
    db.close();
  }
}

// 按类型获取目的地
export function getDestinationsByType(type) {
  const db = initDatabase();
  try {
    const rows = db
      .prepare(
        "SELECT * FROM destinations WHERE type = ? ORDER BY created_at DESC"
      )
      .all(type);
    return rows.map(transformDbToApp);
  } finally {
    db.close();
  }
}

// 统计信息
export function getDestinationStats() {
  const db = initDatabase();
  try {
    const totalCount = db
      .prepare("SELECT COUNT(*) as count FROM destinations")
      .get();
    const typeStats = db
      .prepare(
        `
      SELECT type, COUNT(*) as count 
      FROM destinations 
      GROUP BY type
    `
      )
      .all();
    const statusStats = db
      .prepare(
        `
      SELECT status, COUNT(*) as count 
      FROM destinations 
      GROUP BY status
    `
      )
      .all();

    return {
      total: totalCount.count,
      byType: typeStats,
      byStatus: statusStats,
    };
  } finally {
    db.close();
  }
}
