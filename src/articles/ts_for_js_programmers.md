TypeScript与JavaScript有着不同寻常的关系。TypeScript提供了JavaScript的所有功能，以及这些功能之上的附加层：TypeScript的类型系统。

 例如，JavaScript 提供了`string`和`number`等语言基元，但它不会检查您是否一致地分配了这些基元。TypeScript 可以。 

这意味着您现有的工作 JavaScript 代码也是 TypeScript 代码。TypeScript 的主要优点是它可以突出显示代码中的意外行为，从而降低出错的几率。 

本教程简要概述了 TypeScript，重点介绍了其类型系统。

## 一、推断得出的类型

TypeScript 知道 JavaScript 语言，并且在许多情况下会为您生成类型。例如，在创建变量并将其赋给特定值时，TypeScript 将使用该值作为其类型。
```typescript
const helloWorld = "Hello World"
```
通过了解JavaScript的工作原理，TypeScript可以构建一个接受JavaScript代码但具有类型的类型系统。这提供了一个类型系统，无需添加额外的字符即可使类型在代码中显式化。这就是 TypeScript 知道 helloWorld 在上面的例子中是一个字符串的方式。

您可能已经在Visual Studio Code中编写了JavaScript，并且具有编辑器自动完成功能。Visual Studio Code在引擎盖下使用TypeScript，以便更轻松地使用JavaScript。

## 二、定义类型

您可以在 JavaScript 中使用各种设计模式。但是，某些设计模式使得类型难以自动推断（例如，使用动态编程的模式）。为了涵盖这些情况，TypeScript 支持 JavaScript 语言的扩展，它提供了告诉 TypeScript 类型应该是什么的地方。

例如，要创建具有推断类型（包括 `name： string` 和 `id： number`）的对象，可以编写：
```typescript
const user = {
  name: "Jack",
  id: 0
}
```
您可以使用`interface`声明显式描述此对象的形状：
```typescript
interface User {
  name: string;
  id: number;
}
```
然后，您可以通过在变量声明后使用类似如下的语法来声明 JavaScript 对象符合新接口的形状：
```typescript
const user: User = {
  name: "Jack",
  id: 0
}
```
如果您提供的对象与您提供的接口不匹配，TypeScript 将会警告

由于 JavaScript 支持类和面向对象编程，因此 TypeScript 也支持。您可以将接口声明与类一起使用：
```typescript
interface User {
  name: string;
  id: number;
}
 
class UserAccount {
  name: string;
  id: number;
 
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
 
const user: User = new UserAccount("Murphy", 1);
```
您可以使用接口对参数进行批注并将值返回给函数：
```typescript
function getAdminUser(): User {
  //...
}
 
function deleteUser(user: User) {
  // ...
}
```

JavaScript 中已经有一小组基元类型可用：`boolean`, `bigint`, `null`, `number`, `string`, `symbol`，您可以在接口中使用。TypeScript 通过更多内容扩展此列表，例如 `any`（允许任何内容）、`unknown`（确保使用此类型的人声明了该类型是什么）、`never`（此类型不可能发生）和 `void`（返回`undefined`或没有返回值的函数）。

您将看到构建类型有两种语法：Interfaces 和 Types。您应该更喜欢`interface`。在需要特定功能时使用 `type`。

## 三、组合类型

使用 TypeScript，您可以通过组合简单类型来创建复杂类型。有两种流行的方法可以做到这一点：联合和泛型。

### 1. 联合

使用联合，可以声明一个类型可以是许多类型之一。例如，您可以将`boolean`类型描述为`true`或`false`：
```typescript
type MyBool = true | false;
```
注意：如果您将鼠标悬停在上面的`MyBool`上，您会发现它被归类为`boolean`。这是结构类型系统的一个属性。下面将对此进行详细介绍。

联合类型的一个常见用例是描述允许值为的`string`或`number`字面量：
```typescript
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
```

联合也提供了一种处理不同类型的方法。例如，您可能有一个采用数组或字符串的函数：
```typescript
function getLength(obj: string | string[]) {
  return obj.length;
}
```
要了解变量的类型，请使用 `typeof`：

| **Type** | **Predicate** |
| --- | --- |
| string | typeof s === "string" |
| number | typeof n === "number" |
| boolean | typeof b === "boolean" |
| undefined | typeof undefined === "undefined" |
| function | typeof f === "function" |
| array | Array.isArray(a) |

例如，您可以使函数返回不同的值，具体取决于它是传递字符串还是数组：
```typescript
function wrapInArray(obj: string | string[]) {
  if (typeof obj === "string") {
    return [obj];
  }
  return obj;
}
```

### 2. 泛型

泛型为类型提供变量。一个常见示例是数组。没有泛型的数组可以包含任何内容。具有泛型的数组可以描述数组包含的值。
```typescript
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```
您可以声明自己的使用泛型的类型：
```typescript
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}
 
// This line is a shortcut to tell TypeScript there is a
// constant called `backpack`, and to not worry about where it came from.
declare const backpack: Backpack<string>;
 
// object is a string, because we declared it above as the variable part of Backpack.
const object = backpack.get();
 
// Since the backpack variable is a string, you can't pass a number to the add function.
backpack.add(23);
// Argument of type 'number' is not assignable to parameter of type 'string'.
```

### 3. 结构类型系统

TypeScript 的核心原则之一是类型检查侧重于值所具有的形状。这有时被称为"鸭子类型"或"结构类型"。

在结构类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型。

```typescript
interface Point {
  x: number;
  y: number;
}
 
function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
 
// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);
```
`point`变量没有声明为`Point`类型。但是，TypeScript 会在类型检查中将点的形状与点的形状进行比较。它们具有相同的形状，因此代码通过。

形状匹配只需要对象字段的子集进行匹配。
```typescript
const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"
 
const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"
 
const color = { hex: "#187ABF" };
logPoint(color);
// Argument of type '{ hex: string; }' is not assignable to parameter of type 'Point'.
//  Type '{ hex: string; }' is missing the following properties from type 'Point': x, y
```

类和对象如何符合形状之间没有区别：
```typescript
class VirtualPoint {
  x: number;
  y: number;
 
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
 
const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint); // logs "13, 56"
```

如果对象或类具有所有必需的属性，则 TypeScript 会说它们匹配，而不管实现细节如何。

## 四、参考链接

Get Started：[https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
