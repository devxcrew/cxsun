import assert from "node:assert/strict";
import test from "node:test";
import { renamePublicPackageReferences } from "../tools/consumer-package-migration.mjs";

test("package migration preserves business code and changes only complete public package references", () => {
  const source = `import { server } from "@devxcrew/core-framework";
import { Button } from '@devxcrew/react-ui/components/button';
@import "@devxcrew/react-ui/styles";
const permission = "orders.read";
const related = "@devxcrew/react-ui-extra";
const description = "Use @devxcrew/react-ui for presentation";`;
  const migrated = renamePublicPackageReferences(source);
  assert.equal(
    migrated,
    source
      .replace('"@devxcrew/core-framework"', '"@devxcrew/framework"')
      .replace("'@devxcrew/react-ui/", "'@devxcrew/ui/")
      .replace('"@devxcrew/react-ui/', '"@devxcrew/ui/'),
  );
  assert.equal(renamePublicPackageReferences(migrated), migrated);
});
