import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parseIdentityResourceLocation } from "./identity.resource-location";
import { IdentityResourcePage } from "./identity.resource-page";
import type { IdentityPresentation } from "./identity.presentation";

test("resource locations accept only list, create, detail and edit routes", () => {
  const parse = (path: string) => parseIdentityResourceLocation(path, "/admin/desk", "users");
  assert.deepEqual(parse("/admin/desk"), { creating: false, editing: false });
  assert.deepEqual(parse("/admin/desk/users/"), { creating: false, editing: false });
  assert.deepEqual(parse("/admin/desk/users/create"), { creating: true, editing: false });
  assert.deepEqual(parse("/admin/desk/users/record-1/edit"), {
    creating: false,
    editing: true,
    id: "record-1",
  });
  assert.equal(parse("/admin/desk/users/record-1")?.id, "record-1");
  for (const suffix of [
    "%E0%A4%A",
    "%",
    "%2F",
    "%5C",
    "%00",
    "..",
    "id/delete",
    "create/edit",
    "id/edit/extra",
    "/id",
  ])
    assert.equal(parse(`/admin/desk/users/${suffix}`), null, suffix);
  assert.equal(parse("/admin/desk/users-extra/id"), null);
});

test("malformed resource links render safe feedback and preserve list query state", () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "window");
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { location: { pathname: "/admin/desk/users/%E0%A4%A", search: "?page=3&search=Sam" } },
  });
  try {
    const markup = renderToStaticMarkup(
      createElement(IdentityResourcePage, {
        portal: "admin",
        base: "/admin/desk",
        resource: { id: "users", title: "Users", columns: [] },
        presentation: {} as IdentityPresentation,
      }),
    );
    assert.match(markup, /role="alert"/);
    assert.match(markup, /This record link is invalid/);
    assert.match(markup, /href="\/admin\/desk\/users\?page=3&amp;search=Sam"/);
  } finally {
    if (original) Object.defineProperty(globalThis, "window", original);
    else Reflect.deleteProperty(globalThis, "window");
  }
});
