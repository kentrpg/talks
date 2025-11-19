---
highlighter: shiki
css: unocss
layout: cover
colorSchema: light
drawings:
  persist: true
transition: fade-out
mdc: true
lang: zh-CN
exportFilename: typescript-type-narrowing-and-widening
title: 型別限縮和擴展
description: 從 TypeScript 的型別限縮和擴展切入，建立型別思維需要的核心概念。
---

<h1>

<devicon-typescript class="text-4xl mb-3" /> 型別範圍的<span :class="[{'text-red-500' : $clicks > 0}]">限縮</span>和<span :class="[{'text-red-500' : $clicks > 1}]">擴展</span>

</h1>

<div v-click="[1]"></div>

---
layout: fact
transition: slide-left
---

<h1>
型別的<span text-hex-0099DD>標註</span>與<span text-hex-0099DD>推論</span>
</h1>

---
layout: fact
transition: slide-left
---

# Type Inference 型別推論

---
transition: slide-left
---

<div grid="~ cols-2 gap-10">

<div>
  <h2 important-font-500 mb-2>隱性型別 Implicitly Type</h2>

- 編譯器會根據程式碼上下文，<span text-red-500>自動推斷</span>出型別

<div duration-slow :class="[{'translate-y--7' : $clicks < 1}]">

```ts twoslash
function increment(num = 0) {
  return num + 1
}
// 表達式類型依照回傳的結果

let name = 'Kent'
// 變數、參數依照賦予的值
```

</div>
</div>

<div v-click="2">
  <h2 v-click="4" class="important-font-500 mb-2"><a href="https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#null-undefined-and-empty-array-initializers-are-of-type-any-or-any" target="_blank">any[]、any</a></h2>

<div v-click="3">

- 發生在變數初始值為 <mark>null</mark>、<mark>undefined</mark>、<mark>空陣列</mark>

</div>

```ts twoslash
let data = null
let isActive
// 變數、參數依照賦予的值
```

</div>

</div>

<h2 v-click="5" class="important-font-500 mb-2 mt-6"><a href="https://www.typescriptlang.org/tsconfig/#noImplicitAny" target="_blank">noImplicitAny</a></h2>

<div v-click="6">

- 當參數<mark>沒有</mark>標註型別，且<mark>無法</mark>從上下文推斷時，預設將型別指派為 <mark>any</mark>
- noImplicitAny 參數預設開啟 (strict: true)，檢查函式參數的 <mark>implicit any</mark> 錯誤

</div>

<div v-click="5" duration-slow :class="[{'translate-y--10' : $clicks < 6}]">

```ts twoslash
function increment(num) {
  return num + 1
}
```

</div>

<!--
[click]
那 any 型別是怎麼來的呢？ [click]
any 屬於最寬鬆的型別允許變數是任何型別，導致失去了型別檢查機制 [click] 官方文件有提到
[click] 雖然建議避免使用 any 型別，但有些情況除外，例如：從 JavaScript 轉移到 TypeScript 的過程中，any 可以作為一個過渡的型別，讓專案逐步導入型別宣告。[click]
函式參數一定要加上型別 [click] 否則會出現 noImplicitAny 錯誤提示 [click]
有隱性型別就會有顯性型別[click]
-->

---
layout: fact
transition: slide-left
---

# Type Annotation 型別標註

無法根據上下文推斷型別時，就需要透過手動標註明確的型別{.important-mt--2.text-hex-9e9e9e}

---
transition: slide-left
---

<div grid="~ cols-2 gap-10">

<div>
<h2 important-font-500 mb-4><a href="https://www.typescriptlang.org/docs/handbook/2/basic-types.html#explicit-types" target="_blank">顯性型別 Explicit Type</a></h2>

```ts twoslash
function increment(num: number) {
  return num + 1
}
```

</div>

<div>
<h2 v-click class="important-font-500 mb-2"><a href="https://developer.mozilla.org/en-US/docs/Glossary/Literal" target="_blank">Literal 字面值</a></h2>

<div forward:duration-slow-sub>
  <v-clicks>

  - JavaScript 的<mark>值</mark>
  - 屬於<mark>固定</mark>值
  - 值本身<mark>不可變</mark>

  </v-clicks>
</div>
</div>

</div>

<h2 v-click class="important-font-500 mb-2 mt-8">重新指派 re-assignment、值可變性 Mutability</h2>

<v-clicks>

  - <span class="font-500 mark">let</span> 宣告的變數<mark>允許</mark>重新指派
  - 基本型別 <span class="font-500 mark">primitive</span> 值本身 <span class="font-500 mark">immutable</span> 不可變

</v-clicks>

<img v-click="[7, 8]" src="/assets/primitive-t-q.png" alt="primitive 值本身 immutable 不可變" class="w-90 absolute bottom-20 right-10" />

<v-clicks>

  - <span class="font-500 mark">const</span> 宣告的變數<mark>無法</mark>重新指派
  - 物件型別 <span class="font-500 mark"> object </span> 值內部預設 <span class="font-500 mark">mutable</span> 可變的

</v-clicks>

<img v-click="[8, 10]" src="/assets/object-t-q.png" alt="object 值內部預設 mutable 可變" class="w-120 absolute bottom-20 right-10" />

---
layout: fact
transition: slide-left
---

<h1 v-click.hide="1">型別範圍</h1>
<p v-click.hide="1" class="important-mt--2 text-hex-9e9e9e">從<mark>具體</mark>的一個值到包含所有值的<mark> any </mark>型別</p>

<div class="forward:duration-slow translate-y-6 absolute bottom-13 right-25 w-200" v-click="[1, 2]">
  <img src="/assets/type-range.png" alt="object 值內部預設 mutability 可變" />
</div>

<!--
型別範圍指的是從具體且精確的字面值型別 Literal Types 開始，一直延伸到可以包含所有可能值的 any 型別。
例如 "我是誰" 這個具體的值屬於 string literal，其對應的基礎型別為 string。
只要值的型別包含在變數型別範圍內就會通過型別檢查，可以將型別比喻為數學的集合，搭配文氏圖 (Venn Diagram) 來理解型別範圍概念。
具體值 {"我是誰"} 這個集合，屬於基本型別 {string} 集合的子集合
基本型別 {string} 集合，屬於更寬鬆的 {any} 型別的子集合
-->

---
layout: fact
transition: slide-left
---

# Type Widening 型別擴展

---
transition: slide-left
---

````md magic-move
```ts
let wideNum = 5
const narrowNum = 18
wideNum = narrowNum
```

```ts
let wideNum = 5         // 推斷型別為 number (廣泛的原始型別)
const narrowNum = 18
wideNum = narrowNum
```

```ts
let wideNum = 5         // 推斷型別為 number (廣泛的原始型別)
const narrowNum = 18    // 推斷型別為 18 (具體的字面值型別)
wideNum = narrowNum
```

```ts
let wideNum = 5         // 推斷型別為 number (廣泛的原始型別)
const narrowNum = 18    // 推斷型別為 18 (具體的字面值型別)
wideNum = narrowNum     // 賦值成功：18 是 number 的子集合
```
````

<div flex="~ items-center justify-center">
  <div
    absolute w-35 h-35 left-20 top-38 border="~ none rounded-full"
    bg-hex-FFB429 text-2xl text-hex-203868 font-500 flex="~ items-center justify-center"
    forward:duration-slow-sub
    v-click="1"
    :class="[{'hstack-left' : $clicks > 2}]"
  >
    <div>number</div>
  </div>
  <div
    absolute w-35 h-35 left-20 top-78 border="~ none rounded-full"
    bg-hex-FBDD7A text-2xl text-hex-203868 font-500 flex="~ items-center justify-center"
    forward:duration-slow-sub
    v-click="2"
    :class="[{'hstack-right' : $clicks > 2}]"
  >
    <div>18</div>
  </div>
  <div
    w-75 h-75
    :class="[{'!items-start' : $clicks > 2}]"
    border="~ amber rounded-full" bg-hex-FDF6D8 text-2xl text-hex-203868 font-500 mt-10
  ><span class="absolute top-53% translate-y--53% left-50% translate-x--50%" :class="[{'forward:duration-slow-sub translate-y-[-6rem]' : $clicks > 2}]">any</span></div>
</div>

---
transition: slide-left
---

<h1 class="font-500">型別無法重新賦予 - 型別被推斷後就<mark>無法改變</mark></h1>

<div duration-slow :class="[{'translate-y--14' : $clicks < 1}]">

```ts twoslash
let wideNum = 5
const narrowNum = 18
wideNum = narrowNum
```

</div>
<div v-click="1"></div>

---
transition: slide-left
---

---
transition: slide-left
---

<div v-click.hide="1">

```ts
let narrowNum: 18 = 18
let wideNum = 5
narrowNum = wideNum
```

</div>

<div v-click translate-y--20>

```ts twoslash
let narrowNum: 18 = 18
let wideNum = 5
narrowNum = wideNum
```

</div>

<div flex="~ items-center justify-center" v-click mt="-10">
  <div
    absolute w-35 h-35 border="~ none rounded-full"
    bg-hex-FFB429 text-2xl text-hex-203868 font-500 flex="~ items-center justify-center"
    forward:duration-slow-sub
  >
    <div>number</div>
  </div>
  <div
    w-75 h-75
    :class="[{'!items-start' : $clicks > 2}]"
    border="~ amber rounded-full" bg-hex-FDF6D8 text-2xl text-hex-203868 font-500
  ><span class="absolute top-47% translate-y--47% left-50% translate-x--50%">18</span></div>
</div>

---
transition: slide-left
---
---
layout: fact
transition: slide-left
---

# 縮小型別範圍{.font-500}

---
transition: slide-left
---

# Type Narrowing 型別守衛{.font-500.text-2xl}

```ts twoslash
function getLength(something: string | number): number {
  if (something.length) {
    return something.length
  } else {
    return something.toString().length
  }
}
```

---
transition: slide-left
---

## typeof 限縮型別{.font-500.text-xl.mb-2}

<div v-click>

```ts twoslash
function getLength(something: string | number): number {
  if (typeof something === 'string') {
    return something.length
  } else {
    return something.toString().length
  }
}
```

</div>

## as 斷言{.font-500.text-xl.mb-2.mt-6 v-click}

<div v-click>

```ts twoslash
function getLength(something: string | number): number {
  if (typeof something !== 'string') {
    return something.toString().length
  }

  return (something as string).length
}
```

</div>

---
transition: slide-left
---

---
src: ./pages/end.md
---