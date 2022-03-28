## 一、静态类型检查

```typescript
const message = "hello!";
 
message();
//This expression is not callable.
//  Type 'String' has no call signatures.
```
使用 TypeScript 运行这个示例将在我们首先运行代码之前向我们提供错误消息。

## 二、非异常的错误

```javascript
const user = {
  name: "Daniel",
  age: 26,
};
user.location; // returns undefined
```

- 在 js 运行时上，引用一个对象上不存在的属性会返回 undefined，不报错
- 在 ts 中，这应该捕获为一个错误

```typescript
const user = {
  name: "Daniel",
  age: 26,
};
// user.location;
// Property 'location' does not exist on type '{ name: string; age: number; }'.
```

虽然有时这意味着您可以表达的内容需要权衡，但其目的是在我们的程序中捕获合法的错误。TypeScript捕获了许多合法的错误。例如：拼写错误、未调用的函数、基本的逻辑错误

```typescript
const announcement = "Hello World!";
 
// How quickly can you spot the typos?
announcement.toLocaleLowercase();
announcement.toLocalLowerCase();
// We probably meant to write this...
announcement.toLocaleLowerCase();

function flipCoin() {
  // Meant to be Math.random()
  return Math.random < 0.5;
// Operator '<' cannot be applied to types '() => number' and 'number'.
}

const value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
  // ...
} else if (value === "b") {
// This condition will always return 'false' since the types '"a"' and '"b"' have no overlap.
  // Oops, unreachable
}
```

## 三、类型是一种很好的工具

TypeScript 可以捕获错误，并且还可以一开始防止我们犯错误，它会建议我们可能要使用的属性
![image.png](https://cdn.nlark.com/yuque/0/2022/png/916537/1645979436024-a39fcb17-fc68-4a50-b5ed-13fd0696db7c.png#clientId=ua414111b-3455-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=176&id=u9e894bf0&margin=%5Bobject%20Object%5D&name=image.png&originHeight=223&originWidth=443&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21791&status=done&style=none&taskId=u6fc68da3-eb3b-4ff7-b43a-d6544df7a8e&title=&width=349.5)

## 四、`tsc`，TypeScript 编译器

安装
```bash
yarn global add typescript
```

```typescript
// hello.ts Greets the world.
console.log("Hello world!");
```
```bash
tsc hello.ts
```
得到了一个文件输出，在 `hello.ts` 旁边生成了 `hello.js` 文件

## 五、tsc 即使有错误也生成文件

当我们的 ts 文件没有通过类型检查，然后运行 `tsc hello.ts` 时，它依然会生成 `hello.js`文件，这是它的默认行为，如果希望编译不通过不生成文件，可以像下面这样
```bash
tsc --noEmitOnError hello.ts
```

## 六、明确的类型

```typescript
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
```
这里明确了`person`和`date`的类型，当调用 `greet`时，如果传参类型不匹配，就会报错

我们不必总是编写显式类型注释。在许多情况下，TypeScript 甚至可以为我们推断（或"找出"）类型，即使我们省略它们。
```typescript
let msg = "hello there!";
```

## 七、擦除掉类型

类型注解不是 JavaScript 的一部分，当我们运行`tsc hello.ts`生成`hello.js`后，特定于 TypeScript 的代码都会被擦除，包括类型注解

## 八、降级

当我们运行`tsc hello.ts`生成`hello.js`后，模板字符串语法转换成了字符串相加
```typescript
`Hello ${person}, today is ${date.toDateString()}!`;
```
to
```javascript
"Hello " + person + ", today is " + date.toDateString() + "!";
```
模板字符串是 ES6 的语法，TypeScript 能将新版本的 ECMAScript 代码重写为旧版本的代码，这称为降级

TypeScript 默认以 ES3 为目标，我们可以通过使用 `target`选项来选择版本
```bash
tsc --target es2015 hello.ts
```

## 九、严格性

TypeScript 采用了最宽松的严格性配置，该语言提供了严格性设置开关，我们根据需要，可以开启更多的开关，让检查更彻底、更准确

TypeScript 有几个类型检查相关的严格性开关，在 `tsconfig.json`配置`"strict":true`会全部开启的严格性开关，其中最重要的两个必须要知道：`noImplictAny`、`strickNullChecks`


## 十、`noImplictAny`

意思是：没有隐式的`any`类型

在某些地方 TypeScript 不会尝试为我们推动类型，会会推到最宽松的类型：`any`。使用 `any`会击碎我们使用 TypeScript 的目的。打开 `noImplictAny`开关将对其类型被隐式推断为 `any`的任何变量发出错误

## 十一、strickNullChecks

意思是：严格的空检查

默认情况下，`null`和`undefined`等值可分配给任何其他类型，开启了这个严格性开关，当处理`null`和`undefined`时会检查我们的空

## 十二、参考链接

The Bases：[https://www.typescriptlang.org/docs/handbook/2/basic-types.html](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
