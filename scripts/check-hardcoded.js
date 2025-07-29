#!/usr/bin/env node

/**
 * 硬编码检查脚本
 * 用于检查代码中是否还有硬编码的数据
 */

const fs = require('fs');
const path = require('path');

// 硬编码模式
const HARDCODED_PATTERNS = [
  // 颜色值
  /#[0-9a-fA-F]{6}/g,
  // 主板版本
  /['"]1号板['"]|['"]2号板['"]|['"]3号板['"]/g,
  // 接口类型
  /['"]SPI0['"]|['"]SPI1['"]|['"]I2C0['"]|['"]I2C1['"]|['"]UART0['"]|['"]UART1['"]|['"]I2S0['"]|['"]I2S1['"]|['"]GPIO['"]/g,
  // 模块类型
  /['"]TFT_LCD['"]|['"]MICROSD['"]|['"]JOYSTICK['"]|['"]AMPLIFIER['"]|['"]MICROPHONE['"]|['"]BUTTONS['"]|['"]IO_EXPANSION['"]/g,
  // 引脚功能
  /['"]GPIO['"]|['"]SPI['"]|['"]I2C['"]|['"]UART['"]|['"]I2S['"]|['"]PWM['"]|['"]ADC['"]/g,
  // 数字常量
  /[0-9]{6,}/g, // 6位以上的数字（可能是频率等）
  // 端口号
  /port:\s*[0-9]+/g,
  // 文件路径
  /['"]\.\/data\//g,
  // 应用名称
  /['"]RP2040 GPIO Manager['"]/g,
  // GitHub URL
  /['"]https:\/\/github\.com\/[^'"]+['"]/g
];

// 忽略的文件和目录
const IGNORE_PATTERNS = [
  /node_modules/,
  /dist/,
  /build/,
  /\.git/,
  /package-lock\.json/,
  /yarn\.lock/,
  /\.log$/,
  /\.min\.js$/,
  /\.min\.css$/,
  /scripts\/check-hardcoded\.js$/, // 忽略本脚本
  /data\/configs\/system\.json$/, // 忽略配置文件
  /data\/configs\/pins\.json$/,
  /data\/templates\/board-template\.json$/
];

// 忽略的代码行模式
const IGNORE_LINE_PATTERNS = [
  /^\s*\/\//, // 注释行
  /^\s*\*/, // 多行注释
  /^\s*\/\*/, // 注释开始
  /^\s*\*\/$/, // 注释结束
  /^\s*import/, // import语句
  /^\s*export/, // export语句
  /^\s*const.*=.*require/, // require语句
  /^\s*console\.log/, // console.log
  /^\s*console\.error/, // console.error
  /^\s*\/\/.*TODO/, // TODO注释
  /^\s*\/\/.*FIXME/, // FIXME注释
  /^\s*\/\/.*HARDCODED/, // 标记为允许的硬编码
];

function shouldIgnoreFile(filePath) {
  return IGNORE_PATTERNS.some(pattern => pattern.test(filePath));
}

function shouldIgnoreLine(line) {
  return IGNORE_LINE_PATTERNS.some(pattern => pattern.test(line));
}

function checkFile(filePath) {
  const issues = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, lineNumber) => {
      if (shouldIgnoreLine(line)) {
        return;
      }
      
      HARDCODED_PATTERNS.forEach((pattern, patternIndex) => {
        const matches = line.match(pattern);
        if (matches) {
          matches.forEach(match => {
            issues.push({
              file: filePath,
              line: lineNumber + 1,
              column: line.indexOf(match) + 1,
              match: match,
              pattern: patternIndex,
              lineContent: line.trim()
            });
          });
        }
      });
    });
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
  }
  
  return issues;
}

function scanDirectory(dirPath) {
  const allIssues = [];
  
  function scan(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    items.forEach(item => {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!shouldIgnoreFile(fullPath)) {
          scan(fullPath);
        }
      } else if (stat.isFile()) {
        if (!shouldIgnoreFile(fullPath)) {
          const issues = checkFile(fullPath);
          allIssues.push(...issues);
        }
      }
    });
  }
  
  scan(dirPath);
  return allIssues;
}

function generateReport(issues) {
  if (issues.length === 0) {
    console.log('✅ 没有发现硬编码数据！');
    return;
  }
  
  console.log(`❌ 发现 ${issues.length} 个可能的硬编码数据：\n`);
  
  // 按文件分组
  const issuesByFile = {};
  issues.forEach(issue => {
    if (!issuesByFile[issue.file]) {
      issuesByFile[issue.file] = [];
    }
    issuesByFile[issue.file].push(issue);
  });
  
  Object.keys(issuesByFile).forEach(file => {
    console.log(`📁 ${file}:`);
    issuesByFile[file].forEach(issue => {
      console.log(`  Line ${issue.line}:${issue.column} - "${issue.match}"`);
      console.log(`    ${issue.lineContent}`);
    });
    console.log('');
  });
  
  console.log('💡 建议：');
  console.log('1. 将硬编码数据移到配置文件中');
  console.log('2. 使用常量定义');
  console.log('3. 在行末添加 // HARDCODED 注释来忽略特定行');
}

// 主函数
function main() {
  const projectRoot = process.cwd();
  console.log('🔍 检查硬编码数据...\n');
  
  const issues = scanDirectory(projectRoot);
  generateReport(issues);
  
  if (issues.length > 0) {
    process.exit(1);
  }
}

// 运行检查
if (require.main === module) {
  main();
}

module.exports = {
  checkFile,
  scanDirectory,
  generateReport
}; 