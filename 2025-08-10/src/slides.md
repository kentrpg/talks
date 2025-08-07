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
title: 用 any 斬殺所有錯誤的勇者，轉生靠 let 和 const 覺醒型別之力，展開 TypeScript 之旅
description: 從 JavaScript 角度切入 TypeScript 的核心，跳過複雜的進階語法（如 Utility Types），直接透過由淺入深的範例，剖析新手最常遇到的錯誤（如 implicitly has an any type），一步步建立扎實的型別思維以及認識型別安全機制。
---

# 用 any 斬殺所有<span :class="[{'text-hex-e00400CC' : $clicks >= 1}]">錯誤</span>的勇者{.text-align-left}

<h1 text-align-center>
轉生靠 <span :class="[{'text-hex-e00400CC' : $clicks > 1}]">let 和 const</span> 覺醒<span :class="[{'text-hex-e00400CC' : $clicks > 2}]">型別</span>之力
</h1>

# 展開 TypeScript 之旅{.text-align-right}

<div v-click="[2]"></div>

<!--
錯誤[click]
透過 let 和 const[click]
建立型別思維[click]
-->

---

# Agenda{.font-500}

- JavaScript vs. TypeScript
- Type Inference 型別推論、Type Annotation 型別註記
- Type Widening 型別擴展、Type Narrowing 型別限縮

---
src: ./pages/thanks.md
---