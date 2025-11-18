---
layout: fact
transition: slide-top
---

# Function Parameters

<!--
要了解型別如何建立，我們先從一個常見的錯誤開始
-->

---
layout: two-cols-duration
transition: slide-left
layoutClass: gap-col-4
---

<!-- ## Expected xx arguments, but got xx -->

::left::

<div class="duration-slow" :class="[{'scale-150 translate-y-[6rem] translate-x-[12rem]' : $clicks < 1}]">
  <div text-center mb-2>
    <devicon-javascript text-3xl mb-3 />
    <div text-xl>函式參數預設為 optional（可選）</div>
  </div>

```js
function increment(num) {
  return num + 1
}

console.log(increment(1))
console.log(increment())
```

<div v-click="1" class="mt-4 p-3 bg-orange-50 border-l-4 border-orange-400 text-sm">
  <div class="font-medium">JavaScript 行為</div>
  <div>缺少參數時自動帶入 undefined</div>
</div>
</div>

::right::

<div forward:duration-slow-sub v-click="1">
  <div text-center mb-2>
    <devicon-typescript class="text-3xl mb-3" />
    <div text-xl>函式參數預設為 required（必填）</div>
  </div>

  ```ts twoslash
  function increment(num: number) {
    return num + 1
  }

  console.log(increment(1))
  console.log(increment())
  ```

<div v-click="2" class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-sm">
  <div class="font-medium text-red-600">TypeScript 檢查</div>
  <div>缺少參數時會報錯，避免非預期結果</div>
</div>
</div>

<!--
讓我們從一個常見錯誤開始理解型別建立 [click]

在 JavaScript 中，函式參數是可選的，當你少給參數時，會自動帶入 undefined，這導致了非預期的行為 [click]

而 TypeScript 會在呼叫階段檢查參數數量，防止這類問題 [click]
-->

---
layout: fact
transition: slide-left
---

# Default Parameters

參數是 undefined 時才套用預設值{.important-mt--2.text-hex-9e9e9e}

---
layout: two-cols-duration
transition: slide-left
layoutClass: gap-col-4
---

::left::

<div class="duration-slow" :class="[{'scale-150 translate-y-[5rem] translate-x-[12rem]' : $clicks < 1}]">
  <div text-center>
    <devicon-javascript text-3xl mb-3 />
    <p>undefined 套用預設值，避免執行時錯誤</p>
  </div>

```js {monaco-run} {autorun:false}
function increment(number = 1) {
  return number + 1
}

console.log(increment(1))
console.log(increment())
```
</div>

::right::

<div forward:duration-slow-sub v-click="1">
  <div text-center>
    <devicon-typescript text-3xl mb-3 />
    <p>預設值會影響型別推斷，避免型別檢查失敗</p>
  </div>

```ts {monaco-run} {autorun:false, highlightOutput:false}
function increment(num = 1) {
  return num + 1
}

console.log(increment(1))
console.log(increment())
```
</div>

<!--
那如果 TS 沒有標註型別又沒有預設值會發生什麼事？
-->

---
layout: fact
transition: slide-left
---

# Implicit Any

---
transition: slide-left
---

## Implicitly Type{.important-font-500.mb-2}

- 當參數<mark>沒有</mark>標註型別，且<mark>無法</mark>從上下文推斷時，預設將型別指派為 <mark>any</mark>

<div duration-slow :class="[{'translate-y--7' : $clicks < 1}]">

```ts twoslash
function increment(num) {
  return num + 1
}
```

</div>

<div v-click="2">
  <h2 class="important-font-500 mb-2 mt-8"><a href="https://www.typescriptlang.org/tsconfig/#noImplicitAny" target="_blank">noImplicitAny</a></h2>

- any 屬於最寬鬆的型別允許變數是<mark>任何</mark>型別，導致<mark>失去</mark>了型別檢查機制
- noImplicitAny 參數預設開啟 (strict: true)，檢查 implicit any 並標記<mark>錯誤</mark>

</div>

<div v-click="3">
<h2 class="important-font-500 important-mt-8 mb-2"><a href="https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#null-undefined-and-empty-array-initializers-are-of-type-any-or-any" target="_blank">any[]、any</a></h2>

- 發生在初始值為 <mark>null</mark>、<mark>undefined</mark> 的變數推論情境

</div>

<!--
[click]
官方文件有提到 any[]、any 會發生在初始值為 null 和 undefined 的變數推論情境
[click]雖然建議避免使用 any 型別，但有些情況除外，例如：從 JavaScript 轉移到 TypeScript 的過程中，any 可以作為一個過渡的型別，讓專案逐步導入型別宣告。[click
[click]隱性型別（implicit type）推論的 any 屬於沒有正確推論出型別的範例，下個章節會認識更多型別推論運作方式。
-->

---
layout: fact
transition: slide-left
---

# Type Inference 型別推論

編輯器會根據程式碼上下文自動推斷出型別{.important-mt--2.text-hex-9e9e9e}

---
layout: two-cols-duration
transition: slide-left
layoutClass: gap-col-4
---

::left::

## 賦值變數型別{.mb-4}

變數依照賦予的<mark>初始值</mark>進行推論

```ts {monaco} {autorun:false}
const name = 'Kent'
const age = 30
const isActive = true
const data = null
```

::right::

## 回傳值函式型別{.mb-4}

函式依照<mark> return 值</mark>進行推論

```ts {monaco} {autorun:false, height: 'auto', editorOptions: { wordWrap: 'on', wordBreak: 'keepAll' }}
function getName() {
  return 'Kent'
}

function calculate(a: number, b: number) {
  return a + b
}
```

<style>
.slidev-code-wrapper {
  width: 40%;
}
.shiki {
  @apply mt-6;
}
</style>

---
layout: fact
transition: slide-left
---

# Type Annotation 型別註記

無法根據上下文推斷型別時，需要手動標註明確的型別{.important-mt--2.text-hex-9e9e9e}

<!-- 如何標註型別？ -->

---
layout: two-cols-header
transition: slide-left
layoutClass: gap-col-4 grid-rows-max-1fr
---

<div class="duration-slow mb-4" :class="[{'scale-150 translate-y-[13rem] translate-x-[23rem] font-bold' : $clicks < 2}]">
  <h2 mb-2>加上 <code>: 型別</code> 來標註型別</h2>
  <p v-click="1">宣告變數、參數時在<mark>後方</mark></p>
</div>

::left::
<div forward:duration-slow-sub v-click="2">

### function{.font-500}

```ts {monaco}
function increment(num: number) {
  return num + 1
}
```
</div>

::right::
<div class="duration-slow-sub mt-2" v-click="3">

### variable{.font-500}

```ts {monaco}
let name = 'Kent'
let data = null

type User = {
  name: string
  age: number
}

let user: User = {
  name: 'Kent',
  age: 30
}
```
</div>

<!--
現在我們了解了型別是如何建立的，透過型別推論和型別註記
但建立型別其實是在做一件事：「定義允許的範圍」，並根據這個範圍來檢查是否符合
接下來我們用集合的概念，來理解 TypeScript 如何檢查型別範圍。
-->