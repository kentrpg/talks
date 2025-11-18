---
transition: slide-top
---

<div v-click.hide="4">

<h2 class="duration-slow important-font-500 mb-2" :class="[{'important-text-3em translate-y-[14rem] translate-x-[16rem]' : $clicks < 1}]">
  <a href="https://developer.mozilla.org/en-US/docs/Glossary/Literal">字面值 Literal</a>
</h2>

<div forward:duration-slow-sub>
  <v-clicks>

  - JavaScript 的<mark>值</mark>
  - 屬於固定值
  - 值本身<mark>不可變</mark>

  </v-clicks>
</div>
</div>

<div class="duration-slow translate-y--10" v-click="4">
  <img src="/assets/literal.png" alt="字面值 Literal" />
</div>

<!--
MDN 文件中提到字面值是[click]
那我們用一個範例來看[click]
上方的變數宣告中，右邊的我是誰就是指 Literal（字面值），它代表一個固定的值，所以他本身是不可改變的。[click]
-->

---
layout: fact
transition: slide-left
---

# 值可變性 Mutability

值本身在記憶體中是否可以被修改{.important-mt--2.text-hex-9e9e9e}

<!--
值可變性是指值本身在記憶體中是否可以被修改。[click]
-->

---
transition: slide-left
---

<h1 class="translate-y-[14rem] translate-x-[5rem]" v-click.hide="0">
  基本型別 <span class="font-500 mark">primitive</span> 值本身 <span class="font-500 mark">immutable</span> 不可變
</h1>

<div class="forward:duration-slow translate-y--16" v-click="1">
  <img src="/assets/primitive-t-q.png" alt="primitive 值本身 immutable 不可變" />
</div>

<!--
左邊我們先宣告一個變數 name，它的值是字串 "我是誰"。
因為 primitive 值是 immutable，不能直接改內容，
所以右邊重新賦值為 "kent" 時，JavaScript 會創建一個新的值，再讓 name 指向這個新值。[click]
-->

---
transition: slide-left
---

<h1 class="translate-y-[14rem] translate-x-[5rem]" v-click.hide="0">
  物件型別 <span class="font-500 mark"> object </span> 值內部預設 <span class="font-500 mark">mutable</span> 可變的
</h1>

<div class="forward:duration-slow translate-y-6" v-click="1">
  <img src="/assets/object-t-q.png" alt="object 值內部預設 mutability 可變" />
</div>

<div v-click="[1,3]"></div>

<!--
[click]左邊先宣告 const obj = { age: 18 }。物件的內容預設是 mutable，可以直接改內部屬性。[click]
大家覺得當執行 obj.age = 5 後結果是圖片中左邊還是右邊？
是右邊，因為參考不變（還是會指向同一個位址 0x001），不會創建新的空間，而是在原本的空間 heap 裡直接修改。[click]
那如改成重新指派：obj = { age: 5 }，那會換到新的位址 0x002——但因為是 const，這種換參考會報錯；要這樣做就得用 let；這就是 let、const 重新指派 re-assignment 的差異[click]
-->

---
layout: fact
transition: slide-left
---

# 重新指派 re-assignment

變數是否可以被重新指派取決於變數宣告方式{.important-mt--2.text-hex-9e9e9e}

<!--
值可變性是指值本身在記憶體中是否可以被修改。[click]
-->

---
transition: slide-left
---

<h1 class="text-center translate-y-[12rem] translate-x-[-1rem]" v-click.hide="0">
  let 宣告的變數<span class="font-500 mark">允許</span>重新指派<br>
  const 宣告的變數<span class="font-500 mark">無法</span>重新指派
</h1>

<div class="forward:duration-slow translate-y-16" v-click="1">
  <img src="/assets/re-assignment-basic.png" alt="重新指派 re-assignment" />
</div>

<div v-click="[1,2]"></div>

<!--
那我們來看一下「重新指派」在重新賦值過程的哪個階段發生。

[click]是取決於變數一開始是用 const 還是 let 宣告的，如果是 let 才允許重新指派。
[click]重點是「重新指派」會改變變數指向的位置，而不是修改原本的值本身。
-->

---
layout: fact
transition: slide-left
---

# 集合與型別範圍

---
clicks: 2
---
<img src="/assets/type-range.png" alt="型別範圍" mx-auto />
<!-- <div v-click="[0,2]"></div> -->

<!--
把型別想成一個集合：裡面是『允許的值』。
[click]範圍由窄 → 寬：「"我是誰"（literal） ⊆ string ⊆ any」"我是誰"（literal） 是 string的子集合、string 是any 的子集。
[click]型別檢查就是看：來源值的集合是不是變數型別集合的子集合。
-->

---

<img src="/assets/number188.png" alt="number and 18" mx-auto />

<!--
「這張圖刻意畫反：外圈是 18，內圈是 number，等於說把較寬的集合放進較窄的集合，在型別相容性上不成立。」
「因為 number 包含無限多個值，不保證等於 18，所以 {number} ⊄ {18}。」
「程式碼會報錯：」

口訣：「窄 → 寬 ✅；寬 → 窄 ❌。只要 source ⊆ target 就通過。」
-->