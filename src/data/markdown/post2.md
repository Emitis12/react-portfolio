export default `
# Understanding JavaScript Closures

Closures are a powerful feature of JavaScript that allow inner functions to access variables from an outer function's scope even after the outer function has returned.

\`\`\`js
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  }
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`
`;
