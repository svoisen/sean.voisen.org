---
layout: page
title: Writing
---

<ul class="archives">
    {% for post in site.posts %}
    <li>
        <span class="title"><a href="{{ post.url }}">{{ post.title }}</a></span>
        <span class="date">{{ post.date | date: "%b %-d, %Y" }}</span>
    </li>
    {% endfor %}
</ul>
