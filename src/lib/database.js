import fs from "fs";
import path from "path";
import crypto from "crypto";
import { destinations } from "@/data/sampleData";

const DATA_DIR = path.join(process.cwd(), "data");
const DESTINATIONS_FILE = path.join(DATA_DIR, "destinations.json");

// 加密配置
const ENCRYPTION_KEY =
  process.env.DATA_ENCRYPTION_KEY || "travel-management-secret-key-32";
const ALGORITHM = "aes-256-cbc";

// 数据加密函数
function encryptData(data) {
  try {
    const iv = crypto.randomBytes(16);
    const key = Buffer.from(ENCRYPTION_KEY.padEnd(32, "0").substring(0, 32));
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
    encrypted += cipher.final("hex");

    return {
      encrypted,
      iv: iv.toString("hex"),
    };
  } catch (error) {
    console.error("数据加密失败:", error);
    return null;
  }
}

// 数据解密函数
function decryptData(encryptedData) {
  try {
    if (!encryptedData || !encryptedData.encrypted) {
      return null;
    }

    const key = Buffer.from(ENCRYPTION_KEY.padEnd(32, "0").substring(0, 32));
    const iv = Buffer.from(encryptedData.iv, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

    let decrypted = decipher.update(encryptedData.encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return JSON.parse(decrypted);
  } catch (error) {
    console.error("数据解密失败:", error);
    return null;
  }
}

// 确保数据目录存在
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// 初始化目的地数据文件
function initDestinationsFile() {
  ensureDataDir();
  if (!fs.existsSync(DESTINATIONS_FILE)) {
    const encryptedData = encryptData(destinations);
    fs.writeFileSync(DESTINATIONS_FILE, JSON.stringify(encryptedData, null, 2));
  }
}

// 读取目的地数据
export function readDestinations() {
  try {
    initDestinationsFile();
    const encryptedData = fs.readFileSync(DESTINATIONS_FILE, "utf8");
    const parsedData = JSON.parse(encryptedData);

    // 检查是否是加密数据
    if (
      parsedData &&
      typeof parsedData === "object" &&
      parsedData.encrypted &&
      parsedData.iv
    ) {
      const decryptedData = decryptData(parsedData);
      return decryptedData || [];
    } else {
      // 兼容旧的未加密数据
      return Array.isArray(parsedData) ? parsedData : [];
    }
  } catch (error) {
    console.error("读取目的地数据失败:", error);
    return [];
  }
}

// 写入目的地数据
export function writeDestinations(destinations) {
  try {
    ensureDataDir();
    const encryptedData = encryptData(destinations);
    if (encryptedData) {
      fs.writeFileSync(
        DESTINATIONS_FILE,
        JSON.stringify(encryptedData, null, 2)
      );
      return true;
    }
    return false;
  } catch (error) {
    console.error("写入目的地数据失败:", error);
    return false;
  }
}

// 获取所有目的地
export function getAllDestinations() {
  return readDestinations();
}

// 根据ID获取目的地
export function getDestinationById(id) {
  const destinations = readDestinations();
  return destinations.find((d) => d.id === id);
}

// 创建新目的地
export function createDestination(destinationData) {
  const destinations = readDestinations();
  const newDestination = {
    id: Date.now().toString(),
    ...destinationData,
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
  };

  destinations.push(newDestination);
  const success = writeDestinations(destinations);

  return success ? newDestination : null;
}

// 更新目的地
export function updateDestination(id, updateData) {
  const destinations = readDestinations();
  const index = destinations.findIndex((d) => d.id === id);

  if (index === -1) {
    return null;
  }

  destinations[index] = {
    ...destinations[index],
    ...updateData,
    updatedAt: new Date().toISOString().split("T")[0],
  };

  const success = writeDestinations(destinations);
  return success ? destinations[index] : null;
}

// 删除目的地
export function deleteDestination(id) {
  const destinations = readDestinations();
  const index = destinations.findIndex((d) => d.id === id);

  if (index === -1) {
    return false;
  }

  destinations.splice(index, 1);
  return writeDestinations(destinations);
}

// 数据备份功能
export function backupData() {
  try {
    const destinations = readDestinations();
    const backupDir = path.join(DATA_DIR, "backups");

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.join(backupDir, `destinations_${timestamp}.json`);

    const encryptedData = encryptData(destinations);
    fs.writeFileSync(backupFile, JSON.stringify(encryptedData, null, 2));

    return backupFile;
  } catch (error) {
    console.error("数据备份失败:", error);
    return null;
  }
}

// 数据恢复功能
export function restoreData(backupFile) {
  try {
    const encryptedData = fs.readFileSync(backupFile, "utf8");
    const parsedData = JSON.parse(encryptedData);
    const decryptedData = decryptData(parsedData);

    if (decryptedData) {
      return writeDestinations(decryptedData);
    }
    return false;
  } catch (error) {
    console.error("数据恢复失败:", error);
    return false;
  }
}

// 数据完整性检查
export function verifyDataIntegrity() {
  try {
    const destinations = readDestinations();
    return Array.isArray(destinations);
  } catch (error) {
    console.error("数据完整性检查失败:", error);
    return false;
  }
}
