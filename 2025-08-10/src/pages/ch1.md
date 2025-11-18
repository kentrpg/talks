---
layout: fact
transition: slide-left
---

# 自動轉型 {.important-text-3em}

<!--
剛開始學 JavaScript 就對自動轉型感到困惑，就像是 [click]
-->

---
layout: two-cols
transition: slide-left
layoutClass: gap-4
---

<div duration-slow :class="[{'translate-y-[6rem] translate-x-[18rem]' : $clicks < 1}]">
  <div text-center>
    <devicon-javascript text-3xl mb-2 />
  </div>

  ```js twoslash
  function multiply(a, b) {
    return a * b
  }
  console.log(multiply('5', 2))
  console.log(multiply('five', 2))
  // @warn: 結果為 NaN，因為 'five' 無法轉換為數字
  ```
</div>

::right::

<div class="forward:duration-slow-sub" v-click="1">
  <div text-center>
    <devicon-typescript class="text-3xl mb-2" />
  </div>

  ```ts twoslash
  function multiply(a: number, b: number) {
    return a * b
  }

  console.log(multiply('5', 2))
  console.log(multiply('five', 2))
  ```
</div>

<!--
一個函式會傳入兩個參數並將兩個參數相乘，大家覺得結果是什麼[click]
-->

---
layout: fact
transition: slide-left
---

# 型別檢查時機

---
layout: two-cols-duration
transition: slide-left
---

::left::

<div class="duration-slow" :class="[{'scale-150 translate-y-[6rem] translate-x-[18rem]' : $clicks < 1}]">
  <div text-center>
    <devicon-javascript class="text-3xl mb-3" />
    <div class="text-xl mb-2">runtime 執行階段</div>
  </div>

```js {monaco-run} {autorun:false, height: 'auto', editorOptions: {wordWrap: 'on', wordBreak: 'keepAll'}}
function getLength(str) {
  return str.length
}

console.log(getLength(42))
```
</div>

::right::

<div forward:duration-slow-sub v-click="1">
  <div text-center>
    <devicon-typescript class="text-3xl mb-3" />
    <div class="text-xl mb-2">compile 編譯階段</div>
  </div>

  ```ts twoslash
  function getLength(str: string) {
    return str.length
  }

  console.log(getLength(42))
  ```
</div>

<!--
為什麼是 undefined、NaN? 因為 JavaScript 是動態型別語言，變數型別要到執行時才能確認
而 TypeScript 是靜態型別語言 [click]
在編譯階段就會自動檢查值是否在允許的型別範圍內，當型別不符，就會立即阻止執行，這也是 TypeScript 型別約束機制
而型別錯誤提示也能提升開發體驗 [click]
-->

---
layout: fact
transition: slide-left
---

# IntelliSense 提示

<!-- IDE 智能補全，例如提示變數、方法和屬性 [click] -->

---
transition: slide-left
---

# Hint {.important-font-500}

<img src="/assets/hint.png" />

<!--
IDE 會根據 TypeScript 定義參數的型別來提供相關的提示訊息。
getLength [click]
-->
---
transition: slide-left
---

# Auto Completion {.important-font-500}

<img src="/assets/auto-completion-js.png" mb-6 v-click="1" />
<img src="/assets/auto-completion-ts.png" v-click="3" />

<div v-drag="[104,160,460,72]" border="rounded-md red 2" important-border-rd-0 v-click="2" />

<!--
如果沒有確定型別的時候，IDE 會列出一大堆可能的屬性 [click] 例如紅框的部分會包含框架相關的屬性參數

而 TypeScript 靜態型別特性，可以透過推論的方式，讓 IDE 提供實際存在的屬性來做補全。 [click]
-->

---
transition: slide-left
---

<a href="https://code.visualstudio.com/docs/editing/intellisense#_types-of-completions" target="_blank" class="flex gap-2">

# Types of completions {.important-font-500}

<devicon-vscode text-xl />

</a>

<img src="/assets/completions.png" />

<!--
上圖是 VS Code 官方的 completion icon 對照表，完整內容可以再參考官方文檔。 [click]
-->

---

<v-switch>
  <template #0>
    <h1 class="duration-slow important-text-3em important-font-600 translate-y-[13rem] translate-x-[5rem]">
      <span>TypeScript</span> 與 <span>JavaScript</span> 差異
    </h1>
  </template>
  <template #1>
    <h1 class="duration-slow important-text-3em important-font-600 translate-y-[13rem] translate-x-[5rem]" :class="{ 'mark': $clicks >= 1 }">
      <span text-black font-600>TypeScript</span> 是 <span text-black font-600>JavaScript</span> 超集
    </h1>
  </template>
</v-switch>

<img src="/assets/superset.webp" mx-auto forward:duration-slow v-click="2" />

<!--
目前我們已經對靜態型別語言的特性與型別約束機制有了初步認識。
基本上，JavaScript 有的功能，TypeScript 全部都有，所以可以說 TypeScript 是 JavaScript 的超集。 [click]
所謂「超集」，就是在保留原有功能的基礎上進行擴展。
就好比超級賽亞人是賽亞人的進化一樣 [click]
-->