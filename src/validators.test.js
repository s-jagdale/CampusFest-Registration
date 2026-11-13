import test from "node:test";
import assert from "node:assert/strict";
import * as v from "./validators.js";

test("name", () => {
  assert.equal(v.validateName("Aarav Sharma"), "");
  assert.ok(v.validateName(""));
  assert.ok(v.validateName("Al"));
  assert.ok(v.validateName("Rahul123"));
});

test("email", () => {
  assert.equal(v.validateEmail("a@college.edu"), "");
  assert.ok(v.validateEmail(""));
  assert.ok(v.validateEmail("abc"));
  assert.ok(v.validateEmail("a@b"));
  assert.ok(v.validateEmail("a b@c.com"));
});

test("phone", () => {
  assert.equal(v.validatePhone("9876543210"), "");
  assert.ok(v.validatePhone(""));
  assert.ok(v.validatePhone("98765"));
  assert.ok(v.validatePhone("98765abcde"));
  assert.ok(v.validatePhone("1234567890"));
});

test("age", () => {
  assert.equal(v.validateAge("20"), "");
  assert.ok(v.validateAge(""));
  assert.ok(v.validateAge("12"));
  assert.ok(v.validateAge("75"));
  assert.ok(v.validateAge("20.5"));
});

test("password", () => {
  assert.equal(v.validatePassword("Strong@123"), "");
  assert.ok(v.validatePassword(""));
  assert.ok(v.validatePassword("short1A!"[0] + "a1A"));
  assert.ok(v.validatePassword("alllowercase1!"));
  assert.ok(v.validatePassword("NoNumber@@@"));
  assert.ok(v.validatePassword("NoSpecial123"));
  assert.equal(v.passwordStrength("Strong@123").label, "Strong");
  assert.equal(v.passwordStrength("abc").label, "Weak");
});

test("confirm", () => {
  assert.equal(v.validateConfirm("a", "a"), "");
  assert.ok(v.validateConfirm("a", "b"));
  assert.ok(v.validateConfirm("a", ""));
});

test("event, tickets, message, terms", () => {
  assert.equal(v.validateEvent("hack"), "");
  assert.ok(v.validateEvent(""));
  assert.equal(v.validateTickets(3), "");
  assert.ok(v.validateTickets(0));
  assert.ok(v.validateTickets(6));
  assert.equal(v.validateMessage("hi"), "");
  assert.ok(v.validateMessage("x".repeat(151)));
  assert.equal(v.validateTerms(true), "");
  assert.ok(v.validateTerms(false));
});

test("validateAll on a fully valid form has no errors", () => {
  const errs = v.validateAll({
    name: "Aarav Sharma", email: "a@college.edu", phone: "9876543210",
    age: "20", password: "Strong@123", confirm: "Strong@123",
    event: "robo", tickets: 2, message: "", terms: true,
  });
  assert.deepEqual(Object.values(errs).filter(Boolean), []);
});
