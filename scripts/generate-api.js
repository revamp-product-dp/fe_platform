import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const args = process.argv.slice(2); // 引数を取得
const inputFile = args[0]; // 引数: inputファイル名

if (!inputFile) {
  console.error("Usage: yarn api <inputFileName>");
  process.exit(1);
}

// ランダムなフォルダ名を生成
const uniqueFolderName = crypto.randomBytes(6).toString("hex"); // 例: "a1b2c3d4e5f6"

// ファイルパスを構築
const inputPath = `openapi/${inputFile}.yaml`;
const outputPath = `src/api-clients/${uniqueFolderName}`;
const apiSourceFile = path.join(outputPath, "api.ts"); // コピー元
const apiDestFile = `src/api-clients/openapi/api-${inputFile}.ts`; // コピー先

// 1. OpenAPI Generator CLI を実行
const command = `docker compose run --rm app yarn openapi-generator-cli generate -g typescript-axios -i ${inputPath} -o ${outputPath}`;
try {
  execSync(command, { stdio: "inherit" });
  console.log("API client generated successfully!");
} catch (error) {
  console.error("Failed to generate API client:", error.message);
  process.exit(1);
}

// 2. api.ts をコピーして api-<inputFile>.ts にペースト
try {
  if (!fs.existsSync(apiSourceFile)) {
    console.error(`Source file not found: ${apiSourceFile}`);
    process.exit(1);
  }

  const content = fs.readFileSync(apiSourceFile, "utf-8");
  fs.writeFileSync(apiDestFile, content, "utf-8");
  console.log(`Copied ${apiSourceFile} to ${apiDestFile}`);
} catch (error) {
  console.error("File operation failed:", error.message);
  process.exit(1);
}

// 3. 元の生成したフォルダを削除
try {
  fs.rmSync(outputPath, { recursive: true, force: true });
  console.log(`Deleted folder: ${outputPath}`);
} catch (error) {
  console.error("Failed to delete folder:", error.message);
  process.exit(1);
}

console.log("✅ All tasks completed successfully!");
