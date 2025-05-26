import fg from "fast-glob";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import chalk from "chalk";

// Header
console.log(
  chalk.bold.bgGreen.black(
    "┌──────────────────────────────────────────────┐\n" +
      "│                                              │\n" +
      "│            ENV-AUDIT CLI TOOL                │\n" +
      "│     Validate & Audit Your .env Usage         │\n" +
      "│                                              │\n" +
      "└──────────────────────────────────────────────┘"
  )
);

// Load .env
const envPath = path.resolve(process.cwd(), ".env");
if (!fs.existsSync(envPath)) {
  console.log(
    "\n" +
      chalk.bgRed.white.bold(" ERROR ") +
      " .env file not found at: " +
      chalk.gray(envPath) +
      "\n"
  );
  process.exit(1);
}

const envVars = dotenv.parse(fs.readFileSync(envPath));
const envKeys = Object.keys(envVars);

console.log("\n" + chalk.greenBright("✅ .env loaded"));
console.log(chalk.gray("   └─ " + envPath));
console.log(chalk.gray(`   └─ Found ${envKeys.length} keys`));

// Scan files
console.log(
  "\n" + chalk.cyan("🔎 Scanning project for used environment variables...")
);

const files = await fg(["**/*.{js,ts,jsx,tsx}"], {
  ignore: ["node_modules", "dist", ".next", "build"],
});

let usedEnvKeys = new Set();

for (const file of files) {
  const code = fs.readFileSync(file, "utf-8");

  try {
    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    traverse.default(ast, {
      MemberExpression(path) {
        if (
          path.node.object?.object?.name === "process" &&
          path.node.object?.property?.name === "env"
        ) {
          const key = path.node.property?.name;
          if (key) usedEnvKeys.add(key);
        }
      },
    });
  } catch {
    console.log(
      chalk.yellow("⚠️  Skipping unreadable file: ") + chalk.gray(file)
    );
  }
}

const used = [...usedEnvKeys].sort();
const missing = used.filter((k) => !envKeys.includes(k));
const unused = envKeys.filter((k) => !used.includes(k));

// Results
console.log("\n" + chalk.bold("📋 Audit Result:\n"));

if (missing.length > 0) {
  console.log(chalk.redBright("❌ Missing in .env:"));
  missing.forEach((key) => {
    console.log("   " + chalk.red("✗") + " " + chalk.whiteBright.bold(key));
  });
} else {
  console.log(chalk.green("✅ All required keys are present in .env"));
}

if (unused.length > 0) {
  console.log("\n" + chalk.yellowBright("⚠️ Unused keys in .env:"));
  unused.forEach((key) => {
    console.log("   " + chalk.yellow("•") + " " + chalk.whiteBright(key));
  });
} else {
  console.log(chalk.green("\n✅ No unused variables in .env"));
}

const usedAndPresent = used.filter((k) => envKeys.includes(k)).sort();

if (usedAndPresent.length > 0) {
  console.log("\n" + chalk.blueBright("🧩 Used & present in .env:"));
  usedAndPresent.forEach((key) => {
    console.log("   " + chalk.cyan("•") + " " + chalk.whiteBright(key));
  });
} else {
  console.log(
    "\n" + chalk.yellow("⚠️ No used env keys were found in your .env file")
  );
}

// Summary
console.log(
  "\n" +
    chalk.gray("──────────────────────────────────────────────") +
    "\n" +
    chalk.cyanBright("📦 Scanned ") +
    chalk.whiteBright(`${files.length} files`) +
    chalk.cyanBright(" | ") +
    chalk.whiteBright(`${used.length} used env keys`) +
    "\n" +
    chalk.gray("──────────────────────────────────────────────\n")
);
