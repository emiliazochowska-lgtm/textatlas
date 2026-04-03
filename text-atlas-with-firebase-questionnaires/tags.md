---
layout: default
title: Tag Archive
---
<h1>All Tags</h1>
{% assign all_tags = site.texts | map: 'tags' | join: ',' | split: ',' | uniq %}
{% for tag in all_tags %}
<h2 id="{{ tag | slugify }}">{{ tag }}</h2>
<ul>
{% for text in site.texts %}
{% if text.tags contains tag %}
<li><a href="{{ text.url }}">{{ text.title }}</a></li>
{% endif %}
{% endfor %}
</ul>
{% endfor %}
