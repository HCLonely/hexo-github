> 由于[原项目](https://github.com/akfish/hexo-github)不在维护，我稍微修复了一下

# hexo-github

Display a GitHub repositoy badge with timeline in your post to keep track of version difference.

![GitHub Badge Animation](/capture.gif?raw=true)

## Motive

When referencing an on-going project in an article, some of the content might became un-true or out-of-date as the project evolves, which would certainly cause some confusions to the readers.

This plugin display a badge with timeline for a GitHub repository that will compare latest commit against the referenced one. It should keep the readers informed.

## Install

`npm install --save @hclonely/hexo-github`

## Usage

Insert `commit` tag in your article:

```markdown
{% commit user repo referenced_commit [auto_expand = true | false] [width = 100%] %}
```

Argument | Description
-------- | -----------
user     | GitHub user name
repo     | GitHub repository name of that user
commit   | Commit sha1 referenced in the article
auto_expand | (Optional, default == false) true of false. Expand the timeline once synced if set to true.
width    | (Optional, default == 100%). Widget's width. It should be a valid CSS width value.

Example:

```markdown
{% commit akfish hexo-math b82e65 %}
```
