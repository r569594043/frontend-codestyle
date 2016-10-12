# HTML(5) 样式指南和代码约定

## 请使用正确的文档类型

请始终在文档的首行声明文档类型：
```html
<!DOCTYPE html>
```

如果您一贯坚持小写标签，那么可以使用：
```html
<!doctype html>
```


## 请使用小写元素名

HTML5 允许在元素名中使用混合大小写字母。

我们推荐使用小写元素名：

* 混合大小写名称并不好
* 开发者习惯使用小写名（比如在 XHTML 中）
* 小写更起来更纯净
* 小写更易书写

Bad:
```html
<SECTION>
  <p>This is a paragraph.</p>
</SECTION>
```

Very Bad:
```html
<Section>
  <p>This is a paragraph.</p>
</SECTION>
```

Good:
```html
<section>
  <p>This is a paragraph.</p>
</section>
```


## 关闭所有 HTML 元素

在 HTML5 中，您不必关闭所有元素（例如 `<p>` 元素）。

我们建议关闭所有 HTML 元素：

Bad:
```html
<section>
  <p>This is a paragraph.
  <p>This is a paragraph.
</section>
```

Good:
```html
<section>
  <p>This is a paragraph.</p>
  <p>This is a paragraph.</p>
</section>
```


## 关闭空的 HTML 元素
在 HTML5 中，关闭空元素是可选的。

允许这样：
```html
<meta charset="utf-8">
```
也允许这样：
```html
<meta charset="utf-8" />
```
## 使用小写属性名
HTML5 允许大小写混合的属性名。

我们建议使用小写属性名：

* 混合属性名并不好
* 开发者习惯于使用小写属性名（比如在 XHTML 中）
* 小写属性名看情况更纯净
* 小写属性名更易书写

Bad:
```html
<div CLASS="menu">
```

Good:
```html
<div class="menu">
```


## 属性值加引号

HTML5 允许不加引号的属性值。

我们推荐属性值加引号：

* 混合样式绝对不好
* 加引号的值更易阅读
* 如果属性值包含空格，则必须使用引号

Very bad:  
这个属性值无效，因为值中包含空格：
```html
<table class=table striped>
```

Bad:
```html
<table class=striped>
```

Good:
```
<table class="striped">
```


## 必需的属性
请始终对图像使用 alt 属性。当图像无法显示时该属性很重要。请始终定义图像尺寸。这样做会减少闪烁，因为浏览器会在图像加载之前为图像预留空间。

Bad:
```html
<img src="html5.gif">
```

Good:
```html
<img src="html5.gif" alt="HTML5" style="width:128px;height:128px">
```


## 空格和等号

等号两边的空格是合法的，但是精简空格更易阅读。

Bad:
```html
<link rel = "stylesheet" href = "styles.css">
```

Good:
```html
<link rel="stylesheet" href="styles.css">
```

## 避免长代码行

当使用 HTML 编辑器时，通过左右滚动来阅读 HTML 代码很不方便。

请尽量避免代码行超过 80 个字符。


## 空行和缩进

请勿毫无理由地增加空行。

为了提高可读性，请增加空行来分隔大型或逻辑代码块。

为了提高可读性，请增加两个空格的缩进。请勿使用 TAB。

请勿使用没有必要的空行和缩进。没有必要在短的和相关项目之间使用空行，也没有必要缩进每个元素：

Unnecessary:
```html
<body>

  <h1>Famous Cities</h1>

  <h2>Tokyo</h2>

  <p>
    Tokyo is the capital of Japan, the center of the Greater Tokyo Area,
    and the most populous metropolitan area in the world.
    It is the seat of the Japanese government and the Imperial Palace,
    and the home of the Japanese Imperial Family.
  </p>

</body>
```

Better:
```html
<body>

<h1>Famous Cities</h1>

<h2>Tokyo</h2>
<p>Tokyo is the capital of Japan, the center of the Greater Tokyo Area,
and the most populous metropolitan area in the world.
It is the seat of the Japanese government and the Imperial Palace,
and the home of the Japanese Imperial Family.</p>

</body>
```

Table Example:
```html
<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>A</td>
    <td>Description of A</td>
  </tr>
  <tr>
    <td>B</td>
    <td>Description of B</td>
  </tr>
</table>
```

List Example:
```html
<ol>
  <li>London</li>
  <li>Paris</li>
  <li>Tokyo</li>
</ol>
```


## 省略 `<html>` 和 `<body>`？

在 HTML5 标准中，能够省略 `<html>` 标签和 `<body>` 标签。

以下代码作为 HTML5 进行验证：

Example:
```html
<!DOCTYPE html>
<head>
  <title>Page Title</title>
</head>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>
```

**我们不推荐省略 `<html>` 和 `<body>` 标签。**  
`<html>` 元素是文本的根元素。它是规定页面语言的理想位置。

```html
<!DOCTYPE html>
<html lang="en-US">
```

对于可访问应用程序（屏幕阅读器）和搜索引擎，声明语言很重要。

省略 `<html>` 或 `<body>` 可令 DOM 和 XML 软件崩溃。

省略 `<body>` 会在老式浏览器（IE9）中产生错误。


## 省略 `<head>`？

在 HTML5 标准中，`<head>` 标签也能够被省略。

默认地，浏览器会把 `<body>` 之前的所有元素添加到默认的 `<head>` 元素。

通过省略 `<head>` 标签，您能够降低 HTML 的复杂性：

```html
<!DOCTYPE html>
<html>
<title>Page Title</title>

<body>
  <h1>This is a heading</h1>
  <p>This is a paragraph.</p>
</body>

</html>
```

**我们不推荐省略 `<head>` 标签。**  
>注释：对于 web 开发者，省略标签的做法是陌生的。建立规则需要时间。


## 元数据

`<title>` 元素在 HTML5 中是必需的。请尽可能制作有意义的标题。

```html
<title>HTML5 Syntax and Coding Style</title>
```

为了确保恰当的解释，以及正确的搜索引擎索引，在文档中对语言和字符编码的定义越早越好：

```html
<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <title>HTML5 Syntax and Coding Style</title>
</head>
```


## HTML 注释

短注释应该在单行中书写，并在 `<!--` 之后增加一个空格：

```html
<!-- This is a comment -->
```

长注释，跨越多行，应该通过 <!-- 和 --> 在独立的行中书写：

```html
<!--
  This is a long comment example. This is a long comment example.
  This is a long comment example. This is a long comment example.
-->
```

长注释更易观察，如果它们被缩进两个空格的话。


## 样式表

请使用简单的语法来链接样式表（type 属性不是必需的）：

```html
<link rel="stylesheet" href="styles.css">
```

短规则可以压缩为一行，就像这样：

```css
p.intro {font-family: Verdana; font-size: 16em;}
```

长规则应该分为多行：

```css
body {
  background-color: lightgrey;
  font-family: "Arial Black", Helvetica, sans-serif;
  font-size: 16em;
  color: black;
}
```

* 开括号与选择器位于同一行
* 在开括号之前用一个空格
* 使用两个字符的缩进
* 在每个属性值对（包括最后一个）之后使用分号
* 只在值包含空格时使用引号来包围值
* 把闭括号放在新的一行，之前不用空格
* 避免每行超过 80 个字符
* 在每个属性与其值之间使用冒号加一个空格


## 在 HTML 中加载 JavaScript

请使用简单的语法来加载外部脚本（type 属性不是必需的）：
```html
<script src="myscript.js">
```


## 通过 JavaScript 访问 HTML 元素

使用“不整洁”的 HTML 样式的后果，可能会导致 JavaScript 错误。

这两个 JavaScript 语句会产生不同的结果：

Example:
```javascript
var obj = getElementById("Demo")

var obj = getElementById("demo")
```

## 使用小写文件名

大多数 web 服务器（Apache、Unix）对文件名的大小写敏感：不能以 london.jpg 访问 London.jpg。

其他 web 服务器（微软，IIS）对大小写不敏感：能够以 london.jpg 或 London.jpg 访问 London.jpg。

如果使用混合大小写，那么您必须保持高度的一致性。

如果您从对大小写不敏感的服务器转到一台对大小写敏感的服务器上，这些小错误将破坏您的网站。

为了避免这些问题，请始终使用小写文件名（如果可以的话）。


## 文件扩展名

HTML 文件名应该使用扩展名 **.html**（而不是 .htm）。

CSS 文件应该使用扩展名 **.css**。

JavaScript 文件应该使用扩展名 **.js**。
