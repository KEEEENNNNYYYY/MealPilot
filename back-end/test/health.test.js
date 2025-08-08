function addition(a, b) {
  return a + b;
}

test('addition de 2 + 3 = 5', () => {
  expect(addition(2, 3)).toBe(5);
});
